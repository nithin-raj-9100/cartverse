import Stripe from "stripe";
import { prisma } from "../utils/prisma";
import type { CheckoutItem } from "./payment.schema";
import type { Product, CartItem } from "@prisma/client";

type CartItemWithProduct = CartItem & {
  product: Product;
};

type TempCartItem = {
  productId: string;
  quantity: number;
  product: Product;
};

type CartItemType = CartItemWithProduct | TempCartItem;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export async function createMockCheckoutSession(
  userId: string,
  items: CheckoutItem[],
  customerEmail?: string
) {
  try {
    let cartItems: CartItemType[] = await prisma.cartItem.findMany({
      where: {
        cart: {
          userId: userId,
        },
        productId: {
          in: items.map((item) => item.productId),
        },
      },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      const products = await prisma.product.findMany({
        where: {
          id: {
            in: items.map((item) => item.productId),
          },
        },
      });

      cartItems = products.map((product) => {
        const matchedItem = items.find((item) => item.productId === product.id);
        return {
          productId: product.id,
          quantity: matchedItem ? matchedItem.quantity : 1,
          product,
        };
      });
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId,
        status: "PENDING",
        totalAmount,
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    const mockSessionId = `mock_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    await prisma.order.update({
      where: { id: order.id },
      data: {
        checkoutSessionId: mockSessionId,
        status: "COMPLETED",
        paymentStatus: "PAID",
        paymentId: `mock_payment_${mockSessionId}`,
      },
    });

    const userCart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (userCart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });
    }

    return {
      sessionId: mockSessionId,
      url: `${process.env.CLIENT_URL || "http://localhost:5173"}/checkout/success?session_id=${mockSessionId}`,
    };
  } catch (error) {
    console.error("Error creating mock checkout session:", error);
    throw error;
  }
}

export async function createCheckoutSession(
  userId: string,
  items: CheckoutItem[],
  customerEmail?: string,
  customerName?: string,
  billingAddress?: Stripe.AddressParam,
  shippingAddressCollection?: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection,
  forceMock?: boolean
) {
  try {
    if (process.env.USE_MOCK_CHECKOUT === "true" || forceMock) {
      console.log("Using mock checkout", forceMock ? "(forced)" : "(from env)");
      return createMockCheckoutSession(userId, items, customerEmail);
    }

    let cartItems: CartItemType[] = await prisma.cartItem.findMany({
      where: {
        cart: { userId: userId },
        productId: { in: items.map((item) => item.productId) },
      },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      const products = await prisma.product.findMany({
        where: { id: { in: items.map((item) => item.productId) } },
      });
      cartItems = products.map((product) => {
        const matchedItem = items.find((item) => item.productId === product.id);
        return {
          productId: product.id,
          quantity: matchedItem ? matchedItem.quantity : 1,
          product,
        };
      });
    }

    if (cartItems.length === 0) {
      throw new Error("Cannot create checkout session with empty cart items.");
    }

    const lineItems = cartItems.map((item) => {
      const matchedItem = items.find((i) => i.productId === item.productId);
      const quantity = matchedItem ? matchedItem.quantity : item.quantity;
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.name,
            description: item.product.description || undefined,
            images: item.product.imageUrl ? [item.product.imageUrl] : [],
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: quantity,
      };
    });

    const order = await prisma.order.create({
      data: {
        userId,
        status: "PENDING",
        totalAmount: cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    const sessionCreateParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/checkout/failure`,
      metadata: {
        orderId: order.id,
        userId: userId,
      },
      customer_email: customerEmail,
      billing_address_collection: "required",
      customer_creation: "always" as const,
      shipping_address_collection: shippingAddressCollection || {
        allowed_countries: ["IN"],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "inr" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
    };

    const session = await stripe.checkout.sessions.create(sessionCreateParams);

    await prisma.order.update({
      where: { id: order.id },
      data: { checkoutSessionId: session.id },
    });

    return { sessionId: session.id, url: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    if (error instanceof Stripe.errors.StripeError) {
      console.error("Stripe Error Code:", error.code);
      console.error("Stripe Error Type:", error.type);
      console.error("Stripe Error Message:", error.message);
      if (error.type === "StripeInvalidRequestError") {
        console.error("Stripe Param:", error.param);
      }
    }
    throw error;
  }
}

export async function handleWebhookEvent(payload: Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    let event: Stripe.Event;

    if (!webhookSecret) {
      console.error("Stripe webhook secret is not configured.");
      throw new Error("Webhook secret is not configured");
    }

    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.orderId) {
          const paymentIntentId =
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : null;
          if (!paymentIntentId) {
            throw new Error("Payment intent ID missing or not a string");
          }
          await prisma.order.update({
            where: { id: session.metadata.orderId },
            data: {
              status: "COMPLETED",
              paymentStatus: "PAID",
              paymentId: paymentIntentId,
            },
          });

          if (session.metadata?.userId) {
            const userCart = await prisma.cart.findUnique({
              where: { userId: session.metadata.userId },
            });

            if (userCart) {
              await prisma.cartItem.deleteMany({
                where: { cartId: userCart.id },
              });
            }
          }
        } else {
          throw new Error(
            "Checkout session completed event missing orderId metadata"
          );
        }
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.orderId) {
          console.log("Attempting to cancel order:", session.metadata.orderId);
          const currentOrder = await prisma.order.findUnique({
            where: { id: session.metadata.orderId },
            select: { status: true },
          });
          if (currentOrder && currentOrder.status === "PENDING") {
            await prisma.order.update({
              where: { id: session.metadata.orderId },
              data: { status: "CANCELLED" },
            });
            console.log("Order cancelled:", session.metadata.orderId);
          } else {
            console.log(
              "Order not cancelled as it was not PENDING:",
              session.metadata.orderId,
              "Status:",
              currentOrder?.status
            );
          }
        } else {
          console.warn(
            "Checkout session expired event missing orderId metadata:",
            session.id
          );
        }
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          "PaymentIntent failed:",
          paymentIntent.id,
          "Reason:",
          paymentIntent.last_payment_error?.message
        );
        const charge = paymentIntent.latest_charge
          ? typeof paymentIntent.latest_charge === "string"
            ? await stripe.charges.retrieve(paymentIntent.latest_charge)
            : paymentIntent.latest_charge
          : null;
        const orderId =
          paymentIntent.metadata?.orderId || charge?.metadata?.orderId;

        if (orderId) {
          console.log("Updating order status to FAILED for order:", orderId);
          const currentOrder = await prisma.order.findUnique({
            where: { id: orderId },
            select: { status: true },
          });
          if (currentOrder && currentOrder.status === "PENDING") {
            await prisma.order.update({
              where: { id: orderId },
              data: { status: "FAILED", paymentStatus: "FAILED" },
            });
            console.log("Order status updated to FAILED:", orderId);
          } else {
            console.log(
              "Order status not updated to FAILED as it was not PENDING:",
              orderId,
              "Status:",
              currentOrder?.status
            );
          }
        } else {
          console.warn(
            "PaymentIntent failed event missing orderId metadata:",
            paymentIntent.id
          );
        }
        break;
      }
      default: {
        console.log(`Unhandled webhook event type: ${event.type}`);
      }
    }

    return { received: true, eventType: event.type };
  } catch (error) {
    console.error("Error handling webhook event:", error);
    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      console.error(
        "Webhook signature verification failed. Check your webhook secret and ensure you are using the raw request body."
      );
    }
    throw error;
  }
}

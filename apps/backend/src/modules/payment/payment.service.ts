import Stripe from "stripe";
import { prisma } from "../utils/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: "2023-10-16",
});

export async function createMockCheckoutSession(
  userId: string,
  items: Array<{ productId: string; quantity: number }>,
  customerEmail?: string
) {
  try {
    const cartItems = await prisma.cartItem.findMany({
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
  items: Array<{ productId: string; quantity: number }>,
  customerEmail?: string
) {
  try {
    if (process.env.USE_MOCK_CHECKOUT === "true") {
      return createMockCheckoutSession(userId, items, customerEmail);
    }

    const cartItems = await prisma.cartItem.findMany({
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

    const lineItems = cartItems.map((item) => {
      const matchedItem = items.find((i) => i.productId === item.productId);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            description: item.product.description,
            images: item.product.imageUrl ? [item.product.imageUrl] : [],
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: matchedItem?.quantity || item.quantity,
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/checkout?canceled=true`,
      metadata: {
        orderId: order.id,
        userId: userId,
      },
      customer_email: customerEmail,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { checkoutSessionId: session.id },
    });

    return { sessionId: session.id, url: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

export async function handleWebhookEvent(payload: Buffer, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    let event;

    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } else {
      throw new Error("Webhook secret is not configured");
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.orderId) {
          await prisma.order.update({
            where: { id: session.metadata.orderId },
            data: {
              status: "COMPLETED",
              paymentStatus: "PAID",
              paymentId: session.payment_intent as string,
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
        }
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.orderId) {
          await prisma.order.update({
            where: { id: session.metadata.orderId },
            data: { status: "CANCELLED" },
          });
        }
        break;
      }
    }

    return { received: true };
  } catch (error) {
    console.error("Error handling webhook event:", error);
    throw error;
  }
}

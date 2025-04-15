import { FastifyRequest, FastifyReply } from "fastify";
import { createCheckoutSession, handleWebhookEvent } from "./payment.service";
import { CheckoutSessionSchema } from "./payment.schema";

type AllowedCountry = "IN";

export async function createCheckoutSessionHandler(
  request: FastifyRequest<{
    Body: { items: Array<{ productId: string; quantity: number }> };
  }>,
  reply: FastifyReply
) {
  try {
    const userId = request.user?.id;

    if (!userId) {
      return reply.status(401).send({ message: "User not authenticated" });
    }

    const result = CheckoutSessionSchema.safeParse(request.body);
    if (!result.success) {
      return reply.status(400).send({
        message: "Invalid request data",
        errors: result.error.format(),
      });
    }

    const { items } = result.data;
    const email = request.user?.email;
    const name = request.user?.name || undefined;

    const billingAddress = {
      country: "IN",
      postal_code: "400001",
      state: "Maharashtra",
      city: "Mumbai",
      line1: "123 Test Street",
    };

    const shippingAddressCollection = {
      allowed_countries: ["IN"] as AllowedCountry[],
    };

    const { sessionId, url } = await createCheckoutSession(
      userId,
      items,
      email,
      name,
      billingAddress,
      shippingAddressCollection
    );

    return reply.status(200).send({
      sessionId,
      url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    request.log.error(error);

    if (
      error instanceof Error &&
      error.message.includes("Indian regulations")
    ) {
      try {
        const { items } = request.body;
        const email = request.user?.email;

        const { sessionId, url } = await createCheckoutSession(
          request.user?.id,
          items,
          email,
          request.user?.name,
          undefined,
          undefined,
          true
        );

        return reply.status(200).send({
          sessionId,
          url,
          message: "Using mock checkout due to regional restrictions",
        });
      } catch (mockError) {
        console.error("Mock checkout fallback failed:", mockError);
        return reply.status(400).send({
          message: "Payment processing not available in your region",
          details:
            "This application is currently using Stripe's test mode, which has limitations in India. We've provided a mock checkout experience for testing purposes.",
          solution:
            "Please set USE_MOCK_CHECKOUT=true in your .env file to enable mock checkout.",
          error: error.message,
        });
      }
    }

    return reply.status(500).send({
      message: "Failed to create checkout session",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function stripeWebhookHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const signature = request.headers["stripe-signature"] as string;

    if (!signature) {
      return reply
        .status(400)
        .send({ message: "Missing stripe-signature header" });
    }

    let payload: Buffer;
    if (request.rawBody) {
      payload = request.rawBody as Buffer;
    } else if (typeof request.body === "string") {
      payload = Buffer.from(request.body);
    } else if (request.body && typeof request.body === "object") {
      const stringBody = JSON.stringify(request.body);
      payload = Buffer.from(stringBody);
    } else {
      return reply.status(400).send({
        message: "Raw body not available for webhook verification",
      });
    }

    const result = await handleWebhookEvent(payload, signature);

    return reply.status(200).send(result);
  } catch (error) {
    request.log.error(error);
    return reply.status(400).send({
      message: "Webhook error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

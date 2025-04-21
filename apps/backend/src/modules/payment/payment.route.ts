import { FastifyInstance } from "fastify";
import { createCheckoutSessionHandler } from "./payment.controller";
import { validateSessionToken } from "../utils/auth";

export async function paymentRoutes(app: FastifyInstance) {
  app.post("/checkout", {
    onRequest: async (request, reply) => {
      try {
        const sessionToken = request.cookies.session_token;

        if (!sessionToken) {
          return reply.status(401).send({ message: "Missing session token" });
        }

        const { valid, value } = app.unsignCookie(sessionToken);

        if (!valid || !value) {
          return reply.status(401).send({ message: "Invalid session token" });
        }

        const result = await validateSessionToken(value);

        if (!result.session || !result.user) {
          reply.clearCookie("session_token");
          return reply.status(401).send({ message: "Invalid session" });
        }

        request.user = result.user;
      } catch (error) {
        console.error("Auth error:", error);
        return reply.status(401).send({
          message: "Authentication failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
    handler: createCheckoutSessionHandler,
  });
}

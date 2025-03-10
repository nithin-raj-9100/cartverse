import { FastifyInstance } from "fastify";
import { getUserOrders } from "./orders.controller";
import { validateSessionToken } from "../utils/auth";

export async function ordersRoutes(app: FastifyInstance) {
  app.get("/", {
    onRequest: async (request, reply) => {
      try {
        const sessionToken = request.cookies.session_token;
        console.log(
          "[Orders] Auth check - Session token exists:",
          sessionToken
        );

        if (!sessionToken) {
          return reply.status(401).send({ message: "Missing session token" });
        }

        const { valid, value } = app.unsignCookie(sessionToken);
        console.log("[Orders] Auth check - Cookie validation:", {
          valid,
          hasValue: value,
        });

        if (!valid || !value) {
          return reply.status(401).send({ message: "Invalid session token" });
        }

        const result = await validateSessionToken(value);
        console.log("[Orders] Auth check - Session validation:", {
          hasSession: result.session,
          hasUser: result.user,
          userId: result.user?.id,
        });

        if (!result.session || !result.user) {
          reply.clearCookie("session_token");
          return reply.status(401).send({ message: "Invalid session" });
        }

        request.user = result.user;
      } catch (error) {
        console.error("[Orders] Auth error:", error);
        return reply.status(401).send({
          message: "Authentication failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
    handler: getUserOrders,
  });
}

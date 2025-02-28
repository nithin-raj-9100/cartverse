import { FastifyInstance } from "fastify";
import {
  addToCartHandler,
  getCartHandler,
  updateCartItemHandler,
  removeCartItemHandler,
  clearCartHandler,
} from "./cart.controller";
import prisma from "../utils/prisma";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export async function cartRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request, reply) => {
    try {
      const signedSessionToken = request.cookies.session_token;

      if (!signedSessionToken) {
        return reply.status(401).send({ message: "No session found" });
      }

      const { valid, value: sessionToken } =
        app.unsignCookie(signedSessionToken);

      if (!valid || !sessionToken) {
        return reply.status(401).send({ message: "Invalid session token" });
      }

      const sessionId = encodeHexLowerCase(
        sha256(new TextEncoder().encode(sessionToken))
      );

      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { users: true },
      });

      if (!session || new Date(session.expiresAt) < new Date()) {
        return reply
          .status(401)
          .send({ message: "Invalid or expired session" });
      }

      request.user = {
        id: session.users.id,
        email: session.users.email,
        name: session.users.name,
        createdAt: session.users.createdAt,
        updatedAt: session.users.updatedAt,
      };

      console.log("Authenticated user:", session.users.id);
    } catch (error) {
      console.error("Session authentication error:", error);
      return reply.status(401).send({
        message: "Authentication failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  app.get("/", getCartHandler);
  app.post("/", addToCartHandler);
  app.put("/:productId", updateCartItemHandler);
  app.delete("/:productId", removeCartItemHandler);
  app.delete("/", clearCartHandler);
}

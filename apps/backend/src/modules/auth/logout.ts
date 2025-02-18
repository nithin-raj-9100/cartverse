import { FastifyInstance } from "fastify";
import { invalidateSession } from "../utils/auth";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export function logoutRoutes(fastify: FastifyInstance) {
  fastify.post("/", async (request, reply) => {
    const signedSessionToken = request.cookies.session_token;

    if (!signedSessionToken) {
      return reply.status(401).send({
        message: "No session token found",
      });
    }

    const { valid, value: sessionToken } =
      fastify.unsignCookie(signedSessionToken);

    if (!valid || !sessionToken) {
      return reply.status(401).send({
        message: "Invalid session token",
      });
    }

    try {
      const sessionId = encodeHexLowerCase(
        sha256(new TextEncoder().encode(sessionToken)),
      );

      await invalidateSession(sessionId);

      reply.clearCookie("session_token", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return reply.send({
        status: "success",
        message: "Logged out successfully",
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        message: "Error logging out",
      });
    }
  });
}

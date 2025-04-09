import { FastifyInstance } from "fastify";
import { invalidateSession } from "../utils/auth";
import { importCryptoUtils } from "../utils/dynamic-imports";

export function logoutRoutes(fastify: FastifyInstance) {
  fastify.post("/", async (request, reply) => {
    const { encodeHexLowerCase, sha256 } = await importCryptoUtils();

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
        sha256(new TextEncoder().encode(sessionToken))
      );

      await invalidateSession(sessionId);

      const isProduction = process.env.NODE_ENV === "production";
      reply.clearCookie("session_token", {
        path: "/",
        httpOnly: true,
        secure: isProduction,
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

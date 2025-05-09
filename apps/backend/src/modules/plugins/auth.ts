import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { validateSessionToken } from "../utils/auth";

export async function authPlugin(fastify: FastifyInstance) {
  fastify.decorate(
    "verifySession",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const sessionToken = request.cookies.session_token;

        if (!sessionToken) {
          return reply.status(401).send({ message: "Missing session token" });
        }

        const { valid, value } = fastify.unsignCookie(sessionToken);
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
        console.error("Auth verification error:", error);
        reply.clearCookie("session_token");
        return reply.status(401).send({
          message: "Authentication failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  );
}

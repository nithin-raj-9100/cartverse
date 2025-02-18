import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { validateSessionToken } from "../utils/auth";

export async function authPlugin(fastify: FastifyInstance) {
  await fastify.register(import("@fastify/auth"));

  fastify.decorate(
    "verifySession",
    async function (request: FastifyRequest, reply: FastifyReply) {
      const sessionToken = request.cookies.session_token;

      if (!sessionToken) {
        throw new Error("Missing session token");
      }

      const result = await validateSessionToken(sessionToken);

      if (!result.session || !result.user) {
        reply.clearCookie("session_token");
        throw new Error("Invalid session");
      }

      request.user = result.user;
    }
  );
}

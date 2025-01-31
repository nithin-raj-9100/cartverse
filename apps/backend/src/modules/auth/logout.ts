import { FastifyInstance } from "fastify";
import { invalidateSession } from "../utils/auth";

export function logoutRoutes(fastify: FastifyInstance) {
  return async () => {
    console.log("logout route");

    fastify.post("/", async (request, reply) => {
      const sessionToken = request.cookies.session_token;
      console.log("sessionToken is ", sessionToken);

      if (sessionToken) {
        await invalidateSession(sessionToken);
        reply.clearCookie("session_token");
      }
      reply.send({ message: "Logged out successfully" });
    });
  };
}

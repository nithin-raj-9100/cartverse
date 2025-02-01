import { FastifyInstance } from "fastify";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const sessionToken = await request.cookies.session_token;
    console.log("sessionToken is zzzzzzzzz", reply.cookies);
    console.log("sessionToken is ", sessionToken);

    if (!sessionToken) {
      return {
        status: "unauthenticated",
        message: "No session token found",
      };
    }

    return {
      status: "authenticated",
      session_token: sessionToken,
      message: "Valid session found",
    };
  });
}

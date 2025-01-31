import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function authRoutes(fastify: FastifyInstance) {
  // NOTE: Protected route to get authenticated user
  console.log("auth route");
  fastify.get(
    "/",
    (req: FastifyRequest, rep: FastifyReply) => {
      rep.send("Hello World");
      console.log("req is ", req, "reply is ", rep);
      // i should check for the user here if he is authenticated or not
    }
    // {
    //   onRequest: fastify.auth([fastify.verifySession]),
    //   handler: async (request, reply) => {
    //     return { user: request.user };
    //   },
    // }
  );
}

import "fastify";
import "@fastify/auth";

// declare module "fastify" {
//   interface FastifyInstance {
//     verifySession: (
//       request: FastifyRequest,
//       reply: FastifyReply,
//       done: (err?: Error) => void
//     ) => Promise<void>;
//   }

declare module "fastify" {
  interface FastifyInstance {
    verifySession: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

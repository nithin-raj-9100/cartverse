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

  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
      name: string | null;
      createdAt?: Date | undefined;
      updatedAt?: Date | undefined;
    };
  }
}

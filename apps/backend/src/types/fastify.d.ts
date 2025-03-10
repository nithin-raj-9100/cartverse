import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
      name: string | null;
      createdAt?: Date;
      updatedAt?: Date;
    };
    rawBody?: Buffer;
  }
}

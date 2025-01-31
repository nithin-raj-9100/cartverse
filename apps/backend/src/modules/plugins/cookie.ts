import { FastifyInstance } from "fastify";

export async function cookiePlugin(fastify: FastifyInstance) {
  await fastify.register(import("@fastify/cookie"), {
    // secret: process.env.COOKIE_SECRET,
    secret: "my-secret",
    hook: "onRequest",
  });
}

import { FastifyInstance } from "fastify";
import fastifyCookie from "@fastify/cookie";

export async function cookiePlugin(fastify: FastifyInstance) {
  await fastify.register(fastifyCookie, {
    // secret: process.env.COOKIE_SECRET,
    secret: process.env.COOKIE_SECRET,
    // hook: "onRequest",
    // parseOptions: {
    //   domain: "localhost",
    //   // httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    // },
  });
}

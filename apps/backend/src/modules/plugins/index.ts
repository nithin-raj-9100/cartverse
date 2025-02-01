import { FastifyInstance } from "fastify";
import { cookiePlugin } from "./cookie";
import { authPlugin } from "./auth";
import fastifyCors from "@fastify/cors";

export async function registerPlugins(app: FastifyInstance) {
  // await app.register(cookiePlugin);
  // await app.register(fastifyCors, {
  //   origin: "http://localhost:5173",
  //   credentials: true,
  // });
  await app.register(authPlugin);
}

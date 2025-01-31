import { FastifyInstance } from "fastify";
import { cookiePlugin } from "./cookie";
import { authPlugin } from "./auth";

export async function registerPlugins(app: FastifyInstance) {
  // await app.register(cookiePlugin);
  await app.register(authPlugin);
}

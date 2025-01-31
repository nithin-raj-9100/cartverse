import { FastifyInstance } from "fastify";
import { authPlugin } from "./auth";

import { cookiePlugin } from "./cookie";

export async function registerPlugins(app: FastifyInstance) {
  await app.register(cookiePlugin);
  await app.register(authPlugin);
}

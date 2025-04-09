import { FastifyInstance } from "fastify";
import { authPlugin } from "./auth";

export async function registerPlugins(app: FastifyInstance) {
  await app.register(authPlugin);
}

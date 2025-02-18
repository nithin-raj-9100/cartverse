import { FastifyInstance } from "fastify";
import { authPlugin } from "./auth";

export async function registerPlugins(app: FastifyInstance) {
  // await app.register(cookiePlugin);
  // await app.register(fastifyCors, {
  //   origin: "http://localhost:5173",
  //   credentials: true,
  // });
  await app.register(authPlugin);
}

// just imorting this file will into index.ts will start the server
import Fastify from "fastify";
import { registerPlugins } from "./modules/plugins";
import { registerRoutes } from "./routes";

export async function createApp() {
  const app = Fastify({ logger: true });

  await registerPlugins(app);
  await registerRoutes(app);

  return app;
}

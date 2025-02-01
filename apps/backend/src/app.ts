// just imorting this file will into index.ts will start the server
import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { registerPlugins } from "./modules/plugins";
import { registerRoutes } from "./routes";
import fastifyCors from "@fastify/cors";

export async function createApp() {
  const app = Fastify({ logger: true, ignoreTrailingSlash: true });

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    hook: "onRequest",
    parseOptions: {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax",
    },
  });

  await app.register(fastifyCors, {
    origin: "http://localhost:5173",
    credentials: true,
  });

  // first should be the cookie plugin and then the routes

  console.log("Registering plugins and routes", app.printPlugins());

  await registerPlugins(app);
  await registerRoutes(app);

  return app;
}

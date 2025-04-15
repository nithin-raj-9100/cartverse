import Fastify, { FastifyInstance } from "fastify";
import fastifyCookie from "@fastify/cookie";
import { registerPlugins } from "./modules/plugins/index.js";
import { registerRoutes } from "./routes.js";
import fastifyCors from "@fastify/cors";

export async function createApp() {
  const isProduction = process.env.NODE_ENV === "production";
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const productionDomain =
    process.env.PRODUCTION_DOMAIN || "https://cartverse.vercel.app";
  const customDomain =
    process.env.CUSTOM_DOMAIN || "https://cartverse.vercel.app";

  const app = Fastify({
    logger: true,
    ignoreTrailingSlash: true,
    disableRequestLogging: isProduction,
  }) as FastifyInstance;

  const allowedOrigins = [
    clientUrl,
    productionDomain,
    customDomain,
    /\.vercel\.app$/,
  ].filter(Boolean) as (string | RegExp)[];

  if (!isProduction) {
    allowedOrigins.push("http://localhost:5173");
  }

  await app.register(fastifyCors, {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Stripe-Signature"],
  });

  if (isProduction) {
    app.register(
      async (instance) => {
        await registerRoutes(instance);
      },
      { prefix: "/api" }
    );
  } else {
    await registerPlugins(app);
    await registerRoutes(app);
  }

  app.addContentTypeParser(
    "application/json",
    { parseAs: "buffer" },
    (req, body, done) => {
      try {
        if (
          req.url === "/payment/webhook" ||
          req.url === "/api/payment/webhook"
        ) {
          req.rawBody = body as Buffer;
        }

        const json = JSON.parse(body.toString());
        done(null, json);
      } catch (err) {
        done(err as Error, undefined);
      }
    }
  );

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || "my_secret",
    hook: "onRequest",
    parseOptions: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      domain: undefined,
    },
  });

  return app;
}

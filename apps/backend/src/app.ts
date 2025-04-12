// just imorting this file will into index.ts will start the server
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
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // app.addHook("onRequest", (req, _reply, done) => {
  //   console.log(`Request received: ${req.method} ${req.url}`);
  //   console.log(`Origin: ${req.headers.origin}`);
  //   done();
  // });

  if (isProduction) {
    app.register(
      async (instance) => {
        instance.addHook("onRequest", (req, _reply, done) => {
          console.log(`Request received: ${req.url}`);
          done();
        });

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
    { parseAs: "string" },
    (_req, body, done) => {
      try {
        const json = JSON.parse(body as string);
        done(null, json);
      } catch (err) {
        done(err as Error, undefined);
      }
    }
  );

  app.addHook("preHandler", (request, _reply, done) => {
    if (request.url === "/payment/webhook" && request.method === "POST") {
      request.rawBody = request.body as unknown as Buffer;
    }
    done();
  });

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

  app.addHook("onRequest", async (request) => {
    if (request.url.startsWith("/auth/github")) {
      request.log.info(
        {
          url: request.url,
          method: request.method,
          headers: request.headers,
          query: request.query,
        },
        "GitHub OAuth request"
      );
    }
  });
  // console.log("Fastify app created with plugins", app.printPlugins());

  return app;
}

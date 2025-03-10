// just imorting this file will into index.ts will start the server
import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { registerPlugins } from "./modules/plugins";
import { registerRoutes } from "./routes";
import fastifyCors from "@fastify/cors";
import oauthPlugin from "@fastify/oauth2";

export async function createApp() {
  const app = Fastify({
    logger: true,
    ignoreTrailingSlash: true,
    disableRequestLogging: process.env.NODE_ENV === "production",
  });

  app.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    (req, body, done) => {
      try {
        const json = JSON.parse(body as string);
        done(null, json);
      } catch (err) {
        done(err as Error, undefined);
      }
    }
  );

  app.addHook("preHandler", (request, reply, done) => {
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  });

  await app.register(fastifyCors, {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.register(oauthPlugin, {
    name: "githubOAuth2",
    credentials: {
      client: {
        id: process.env.GITHUB_CLIENT_ID!,
        secret: process.env.GITHUB_CLIENT_SECRET!,
      },
      auth: {
        authorizeHost: "https://github.com",
        authorizePath: "/login/oauth/authorize",
        tokenHost: "https://github.com",
        tokenPath: "/login/oauth/access_token",
      },
    },
    startRedirectPath: "/auth/github",
    callbackUri: "http://localhost:4000/auth/github/callback",
    scope: ["read:user", "user:email"],
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

  console.log("Registering plugins and routes", app.printPlugins());

  await registerPlugins(app);
  await registerRoutes(app);

  return app;
}

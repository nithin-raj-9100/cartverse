import { FastifyInstance } from "fastify";
import authRoutes from "./modules/auth";
import { loginRoutes } from "./modules/auth/login";
import { logoutRoutes } from "./modules/auth/logout";
import { signupRoutes } from "./modules/auth/signup";

export async function registerRoutes(app: FastifyInstance) {
  //  I think we have to await before making a call to the function
  await app.register(authRoutes, { prefix: "/auth" });
  await app.register(loginRoutes, { prefix: "/auth/login" });
  await app.register(logoutRoutes, { prefix: "/auth/logout" });
  await app.register(signupRoutes, { prefix: "/auth/signup" });

  app.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  app.get("/check", async (request, reply) => {
    return { status: "ok" };
  });

  app.get("/check-cookie", async (request, reply) => {
    const sessionToken = request.cookies.session_token;

    console.log("sessionToken is ", sessionToken);

    return {
      hasCookie: !!sessionToken,
      cookieValue: sessionToken,
    };
  });

  app.post("/set-cookie", (req, rep) => {
    rep.setCookie("key", "value");
    return { status: "ok" };
  });

  app.post("/check", async (request, reply) => {
    console.log("req is ", request, "reply is ", reply);
    return { status: "ok" };
  });
}

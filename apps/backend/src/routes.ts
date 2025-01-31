import { FastifyInstance } from "fastify";
import authRoutes from "./modules/auth";
import { loginRoutes } from "./modules/auth/login";
import { logoutRoutes } from "./modules/auth/logout";
import { signupRoutes } from "./modules/auth/signup";

export async function registerRoutes(app: FastifyInstance) {
  //  I think we have to await before making a call to the function
  await app.register(authRoutes, { prefix: "/auth" });
  await app.register(loginRoutes, { prefix: "/login" });
  await app.register(logoutRoutes, { prefix: "/logout" });
  await app.register(signupRoutes, { prefix: "/signup" });

  app.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  app.get("/check", async (request, reply) => {
    return { status: "ok" };
  });

  app.post("/check", async (request, reply) => {
    console.log("req is ", request, "reply is ", reply);
    return { status: "ok" };
  });
}

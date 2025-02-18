import { FastifyInstance } from "fastify";
import { productsRoutes } from "./modules/products/products.route";
import authRoutes from "./modules/auth";
import { loginRoutes } from "./modules/auth/login";
import { signupRoutes } from "./modules/auth/signup";
import { logoutRoutes } from "./modules/auth/logout";

export async function registerRoutes(app: FastifyInstance) {
  // Auth routes
  await app.register(authRoutes, { prefix: "/auth" });
  await app.register(loginRoutes, { prefix: "/auth/login" });
  await app.register(signupRoutes, { prefix: "/auth/signup" });
  await app.register(logoutRoutes, { prefix: "/auth/logout" });

  // Product routes
  await app.register(productsRoutes);
}

import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { productsRoutes } from "./modules/products/products.route";
import authRoutes from "./modules/auth";
import { loginRoutes } from "./modules/auth/login";
import { signupRoutes } from "./modules/auth/signup";
import { logoutRoutes } from "./modules/auth/logout";
import { oauthRoutes } from "./modules/auth/oauth";
import cartRoutes from "./modules/cart";
import paymentRoutes from "./modules/payment";
import ordersRoutes from "./modules/orders";
import { sendFeedbackHandler } from "./modules/feedback/feedback.controller";
import { $ref as feedbackRef } from "./modules/feedback/feedback.schema";

async function feedbackRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions
) {
  app.post(
    "/send",
    {
      schema: {
        body: feedbackRef("sendFeedbackSchema"),
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    sendFeedbackHandler
  );
}

export async function registerRoutes(app: FastifyInstance) {
  // Auth routes
  await app.register(authRoutes, { prefix: "/auth" });
  await app.register(loginRoutes, { prefix: "/auth/login" });
  await app.register(signupRoutes, { prefix: "/auth/signup" });
  await app.register(logoutRoutes, { prefix: "/auth/logout" });
  await app.register(oauthRoutes, { prefix: "/auth/oauth" });

  // Product routes
  await app.register(productsRoutes);

  // Cart routes
  await app.register(cartRoutes, { prefix: "/cart" });
  await app.register(paymentRoutes, { prefix: "/payment" });
  await app.register(ordersRoutes, { prefix: "/orders" });

  await app.register(feedbackRoutes, { prefix: "/feedback" });
}

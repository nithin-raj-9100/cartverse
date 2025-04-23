import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { generateSessionToken, createSession } from "../utils/auth";
import { mergeGuestCartWithUser } from "../cart/cart.service";
import { supabase } from "../utils/supabase";

interface OAuthCallbackBody {
  id: string;
  email: string;
  name: string;
  provider: string;
  providerAccountId: string;
}

export function oauthRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: OAuthCallbackBody }>(
    "/callback",
    async (request, reply) => {
      try {
        const { id, email, name, provider, providerAccountId } = request.body;

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              id,
              email,
              name,
            },
          });

          await prisma.oAuthAccount.create({
            data: {
              provider,
              providerAccountId,
              userId: user.id,
            },
          });
        } else {
          const existingOAuthAccount = await prisma.oAuthAccount.findUnique({
            where: {
              provider_providerAccountId: {
                provider,
                providerAccountId,
              },
            },
          });

          if (!existingOAuthAccount) {
            await prisma.oAuthAccount.create({
              data: {
                provider,
                providerAccountId,
                userId: user.id,
              },
            });
          }
        }

        const guestId = request.cookies.guest_id;
        if (guestId && guestId.startsWith("guest_")) {
          try {
            await mergeGuestCartWithUser(guestId, user.id);
          } catch (error) {
            fastify.log.error(
              `Failed to merge guest cart during OAuth login: ${error}`
            );
          }
        }

        const token = await generateSessionToken();
        const session = await createSession(token, user.id);

        const isProduction = process.env.NODE_ENV === "production";
        reply.setCookie("session_token", token, {
          path: "/",
          httpOnly: true,
          secure: isProduction,
          sameSite: "lax",
          expires: session.expiresAt,
          signed: true,
        });

        return {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          sessionId: session.id,
        };
      } catch (error) {
        fastify.log.error(`OAuth callback error: ${error}`);
        return reply.status(500).send({
          message: "Authentication failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  );

  fastify.post("/verify", async (request, reply) => {
    try {
      const { token } = request.body as { token: string };

      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data.user) {
        return reply.status(401).send({
          message: "Invalid token",
          error: error?.message || "User not found",
        });
      }

      return {
        user: data.user,
        valid: true,
      };
    } catch (error) {
      fastify.log.error(`Token verification error: ${error}`);
      return reply.status(500).send({
        message: "Token verification failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
}

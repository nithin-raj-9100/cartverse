import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { generateSessionToken, createSession } from "../utils/auth";

declare module "fastify" {
  interface FastifyInstance {
    githubOAuth2: any;
  }
}

export async function oauthRoutes(fastify: FastifyInstance) {
  // Callback route
  fastify.get("/github/callback", async function (request, reply) {
    try {
      fastify.log.info("Starting GitHub OAuth callback");

      // Log the request query parameters
      fastify.log.info(
        { query: request.query },
        "Callback request query parameters",
      );

      // Verify OAuth2 plugin is registered
      if (!this.githubOAuth2) {
        fastify.log.error("GitHub OAuth2 plugin is not registered");
        throw new Error("GitHub OAuth2 plugin is not registered");
      }

      // Log the OAuth2 plugin state
      fastify.log.info(
        {
          hasGithubOAuth2: !!this.githubOAuth2,
          githubOAuth2Methods: Object.keys(this.githubOAuth2),
        },
        "OAuth2 plugin state",
      );

      const token =
        await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(
          request,
        );

      fastify.log.info({ token }, "Raw token response");

      // GitHub API requires token format, not Bearer
      const authHeader = `Bearer ${token.access_token}`;

      // Fetch user data from GitHub
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: authHeader,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "CartVerse-App",
        },
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.text();
        fastify.log.error(
          {
            status: userResponse.status,
            statusText: userResponse.statusText,
            error: errorData,
            headers: userResponse.headers,
          },
          "Failed to fetch GitHub user",
        );
        throw new Error(
          `Failed to fetch GitHub user: ${userResponse.statusText}`,
        );
      }

      const githubUser = await userResponse.json();
      fastify.log.info({ githubUser }, "Successfully fetched GitHub user data");

      // Fetch email (since it might be private)
      const emailsResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: authHeader,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "CartVerse-App",
        },
      });

      if (!emailsResponse.ok) {
        const errorData = await emailsResponse.text();
        fastify.log.error(
          {
            status: emailsResponse.status,
            statusText: emailsResponse.statusText,
            error: errorData,
            headers: emailsResponse.headers,
          },
          "Failed to fetch GitHub emails",
        );
        throw new Error(
          `Failed to fetch GitHub emails: ${emailsResponse.statusText}`,
        );
      }

      const emails = await emailsResponse.json();
      fastify.log.info({ emails }, "GitHub emails response");

      if (!Array.isArray(emails)) {
        throw new Error("Invalid email response from GitHub");
      }

      const primaryEmail = emails.find(
        (email: { primary: boolean; email: string; verified: boolean }) =>
          email.primary && email.verified,
      )?.email;

      if (!primaryEmail) {
        throw new Error("No verified primary email found");
      }

      fastify.log.info({ primaryEmail }, "Found primary email");

      // Find or create user
      let user = await prisma.user.findFirst({
        where: {
          OAuthAccount: {
            some: {
              provider: "github",
              providerAccountId: githubUser.id.toString(),
            },
          },
        },
      });

      if (!user) {
        // Check if user exists with the same email
        const existingUser = await prisma.user.findUnique({
          where: { email: primaryEmail },
        });

        if (existingUser) {
          // Link GitHub account to existing user
          await prisma.oAuthAccount.create({
            data: {
              provider: "github",
              providerAccountId: githubUser.id.toString(),
              userId: existingUser.id,
            },
          });
          user = existingUser;
          fastify.log.info("Linked GitHub account to existing user");
        } else {
          // Create new user and OAuth account
          user = await prisma.user.create({
            data: {
              email: primaryEmail,
              name: githubUser.name || githubUser.login,
              OAuthAccount: {
                create: {
                  provider: "github",
                  providerAccountId: githubUser.id.toString(),
                },
              },
            },
          });
          fastify.log.info("Created new user with GitHub account");
        }
      } else {
        fastify.log.info("Found existing user with GitHub account");
      }

      // Create session
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, user.id);
      fastify.log.info("Created new session");

      // Set cookie
      reply.setCookie("session_token", sessionToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: session.expiresAt,
        signed: true,
      });

      fastify.log.info("Set session cookie, redirecting to frontend");
      // Redirect to frontend
      return reply.redirect("http://localhost:5173");
    } catch (error) {
      fastify.log.error(error, "GitHub OAuth callback failed");
      return reply.redirect(
        "http://localhost:5173/login?error=github-auth-failed",
      );
    }
  });
}

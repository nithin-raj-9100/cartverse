import { FastifyInstance } from "fastify";
import {
  extractSessionId,
  getSessionById,
} from "../../services/session.service";
import { prisma } from "../utils/prisma";

export async function sessionDebugRoutes(app: FastifyInstance) {
  if (process.env.NODE_ENV !== "production") {
    app.get("/debug/session", async (request, reply) => {
      try {
        const sessionToken = request.cookies.session_token;

        if (!sessionToken) {
          return reply
            .status(400)
            .send({ message: "No session token provided" });
        }

        const sessionId = extractSessionId(sessionToken);

        const session = await getSessionById(sessionId);

        const dbSession = sessionId
          ? await prisma.session.findUnique({
              where: { id: sessionId },
              include: { users: true },
            })
          : null;

        const dbUser = await prisma.user.findFirst({
          where: {
            Session: {
              some: {
                id: sessionId || "",
              },
            },
          },
          include: {
            Session: true,
          },
        });

        return {
          providedToken: sessionToken,
          extractedId: sessionId,
          sessionFound: !!session,
          session: session
            ? {
                id: session.id,
                expiresAt: session.expiresAt,
                userId: session.userId,
              }
            : null,
          userFound: !!dbUser,
          user: dbUser
            ? {
                id: dbUser.id,
                email: dbUser.email,
                name: dbUser.name,
                sessions: dbUser.Session.map((s) => s.id),
              }
            : null,
          dbSessionFound: !!dbSession,
          dbSession: dbSession
            ? {
                id: dbSession.id,
                userId: dbSession.userId,
                user: dbSession.users
                  ? {
                      id: dbSession.users.id,
                      email: dbSession.users.email,
                    }
                  : null,
              }
            : null,
        };
      } catch (error) {
        console.error("Session debug error:", error);
        return reply.status(500).send({
          message: "Error debugging session",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    });
  }
}

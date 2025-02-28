import { prisma } from "../modules/utils/prisma";
import type { User } from "@prisma/client";

export function extractSessionId(token?: string): string | null {
  if (!token) return null;
  return token.split(".")[0];
}

export type SessionWithUser = {
  id: string;
  userId: string;
  expiresAt?: Date;
  user: User;
};

export async function getSessionById(
  sessionId: string | null
): Promise<SessionWithUser | null> {
  if (!sessionId) return null;

  try {
    console.log("Looking up session with ID:", sessionId);

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { users: true },
    });

    console.log("Found session:", session ? "yes" : "no");

    if (!session && sessionId) {
      console.log("Trying alternative session lookup methods");
      const user = await prisma.user.findFirst({
        where: {
          Session: {
            some: {
              id: sessionId,
            },
          },
        },
      });

      if (user) {
        return {
          id: sessionId,
          userId: user.id,
          user,
        };
      }
    }

    if (session?.expiresAt && new Date(session.expiresAt) < new Date()) {
      await prisma.session.delete({ where: { id: sessionId } });
      console.log("Session expired, deleted from database");
      return null;
    }

    if (session && session.users) {
      return {
        id: session.id,
        userId: session.userId,
        expiresAt: session.expiresAt,
        user: session.users,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}

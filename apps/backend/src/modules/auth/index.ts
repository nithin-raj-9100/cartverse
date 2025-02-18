import { FastifyInstance } from "fastify";
import prisma from "../utils/prisma";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const signedSessionToken = request.cookies.session_token;

    if (!signedSessionToken) {
      return {
        status: "unauthenticated",
        message: "No session token found",
      };
    }

    const { valid, value: sessionToken } =
      fastify.unsignCookie(signedSessionToken);

    if (!valid || !sessionToken) {
      return {
        status: "unauthenticated",
        message: "Invalid session token",
      };
    }

    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(sessionToken)),
    );

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { users: true },
    });

    if (!session || new Date(session.expiresAt) < new Date()) {
      return {
        status: "unauthenticated",
        message: "Invalid session token",
      };
    }

    return {
      status: "authenticated",
      session_token: sessionToken,
      message: "Valid session found",
      user: {
        id: session.users.id,
        email: session.users.email,
        name: session.users.name,
      },
    };
  });
}

import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma";
import { generateSessionToken, createSession } from "../utils/auth";
import { mergeGuestCartWithUser } from "../cart/cart.service";

export interface LoginBody {
  email: string;
  password: string;
}

export function loginRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: LoginBody }>("/", async (request, reply) => {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }

    const guestId = request.cookies.guest_id;

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    reply.setCookie("session_token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: session.expiresAt,
      signed: true,
    });

    if (guestId && guestId.startsWith("guest_")) {
      try {
        await mergeGuestCartWithUser(guestId, user.id);
        reply.clearCookie("guest_id", { path: "/" });
      } catch (error) {
        fastify.log.error(`Failed to merge guest cart: ${error}`);
      }
    }

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  });
}

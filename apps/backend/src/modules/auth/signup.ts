import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma";
import { generateSessionToken, createSession } from "../utils/auth";
import { mergeGuestCartWithUser } from "../cart/cart.service";

export interface SignUpBody {
  email: string;
  password: string;
  name: string;
}

const SALT_ROUNDS = 10;

export function signupRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: SignUpBody }>("/", async (request, reply) => {
    try {
      const { email, password, name } = request.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return reply.status(400).send({ message: "Email already registered " });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });

      const guestId = request.cookies.guest_id;

      if (guestId && guestId.startsWith("guest_")) {
        try {
          await mergeGuestCartWithUser(guestId, user.id);
        } catch (error) {
          fastify.log.error(
            `Failed to merge guest cart during signup: ${error}`
          );
        }
      }

      return reply.status(201).send({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      fastify.log.error("Error signing up", error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  });
}

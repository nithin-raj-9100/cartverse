import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { prisma } from "../utils/prisma";
import { generateSessionToken, createSession } from "../utils/auth";

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

    // TODO: should check if user is already logged in using session token

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  });
}

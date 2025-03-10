import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../utils/prisma";

export async function getUserOrders(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = request.user?.id;

    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reply.send(orders);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      message: "Error fetching orders",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

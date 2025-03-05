import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";

export async function productsRoutes(app: FastifyInstance) {
  app.get("/products", async (request, reply) => {
    try {
      const products = await prisma.product.findMany();
      return reply.send(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.get("/products/search", async (request, reply) => {
    console.log("request.query", request.query);
    const { search } = request.query as { search: string };
    console.log("search", search);
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
    console.log("\nproductszzzzzzzzzz\n", products);
    return reply.send(products);
  });

  // app.get("/products/search", async (request, reply) => {
  //   try {
  //     console.log("request.query", request.query);
  //     console.log("request.params", request.params);
  //     console.log("request.body", request.body);
  //     console.log("request.headers", request.headers);

  //     const { search } = request.query as { search: string };
  //     const products = await prisma.product.findMany({
  //       where: {
  //         name: {
  //           contains: search,
  //           mode: "insensitive",
  //         },
  //       },
  //     });
  //     return reply.send(products);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     return reply.status(500).send({ error: "Internal Server Error" });
  //   }
  // });

  app.get("/products/featured", async (request, reply) => {
    try {
      const products = await prisma.product.findMany({
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
      });
      return reply.send(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.get("/products/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        return reply.status(404).send({ error: "Product not found" });
      }

      return reply.send(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}

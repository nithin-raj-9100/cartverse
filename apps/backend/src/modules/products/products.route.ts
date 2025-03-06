import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { Category } from "@prisma/client";

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
    try {
      const { search, sort, category } = request.query as {
        search?: string;
        sort?: string;
        category?: string;
      };

      console.log("Search query:", search);
      console.log("Sort option:", sort);
      console.log("Category filter:", category);

      const whereConditions: any = {};

      if (search) {
        whereConditions.name = {
          contains: search,
          mode: "insensitive",
        };
      }

      if (category) {
        try {
          const categoryEnum = category.toUpperCase() as Category;
          whereConditions.category = categoryEnum;
        } catch (error) {
          console.error("Invalid category:", category);
        }
      }

      let orderBy: any = {};

      switch (sort) {
        case "newest":
          orderBy = { createdAt: "desc" };
          break;
        case "price_asc":
          orderBy = { price: "asc" };
          break;
        case "price_desc":
          orderBy = { price: "desc" };
          break;
        default:
          orderBy = { createdAt: "desc" };
      }

      const products = await prisma.product.findMany({
        where: whereConditions,
        orderBy: orderBy,
      });

      console.log(`Found ${products.length} products matching criteria`);
      return reply.send(products);
    } catch (error) {
      console.error("Error in product search:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

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

  app.get("/products/category/:category", async (request, reply) => {
    try {
      const { category } = request.params as { category: string };

      const categoryEnum = category.toUpperCase() as Category;

      const products = await prisma.product.findMany({
        where: {
          category: categoryEnum,
        },
      });

      return reply.send(products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}

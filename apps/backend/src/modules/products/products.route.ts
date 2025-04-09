import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { Category } from "@prisma/client";

const searchRequestCache = new Map<
  string,
  { timestamp: number; result: any }
>();
const CACHE_TTL_MS = 1000;

export async function productsRoutes(app: FastifyInstance) {
  app.get("/products", async (request, reply) => {
    try {
      const {
        limit = "12",
        offset = "0",
        sort = "newest",
      } = request.query as {
        limit?: string;
        offset?: string;
        sort?: string;
      };

      const limitNum = parseInt(limit, 10);
      const offsetNum = parseInt(offset, 10);

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
        case "name_asc":
          orderBy = { name: "asc" };
          break;
        case "name_desc":
          orderBy = { name: "desc" };
          break;
        case "rating_desc":
          orderBy = { rating: "desc" };
          break;
        case "popular":
          orderBy = { rating: "desc" };
          break;
        default:
          orderBy = { createdAt: "desc" };
      }

      const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
          take: limitNum,
          skip: offsetNum,
          orderBy: orderBy,
        }),
        prisma.product.count(),
      ]);

      return reply.send({
        products,
        pagination: {
          total: totalCount,
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + limitNum < totalCount,
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.get("/products/search", async (request, reply) => {
    try {
      const {
        search,
        sort,
        category,
        minPrice,
        maxPrice,
        minRating,
        colors,
        sizes,
      } = request.query as {
        search?: string;
        sort?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
        minRating?: string;
        colors?: string;
        sizes?: string;
      };

      const cacheKey = JSON.stringify({
        search,
        sort,
        category,
        minPrice,
        maxPrice,
        minRating,
        colors,
        sizes,
      });

      const cachedResponse = searchRequestCache.get(cacheKey);
      const now = Date.now();

      if (cachedResponse && now - cachedResponse.timestamp < CACHE_TTL_MS) {
        console.log("Returning cached search results");
        return reply.send(cachedResponse.result);
      }

      console.log("Search query:", search);
      console.log("Sort option:", sort);
      console.log("Category filter:", category);
      console.log("Price range:", minPrice, "-", maxPrice);
      console.log("Min rating:", minRating);
      console.log("Colors:", colors);
      console.log("Sizes:", sizes);

      const whereConditions: any = {};

      if (search) {
        whereConditions.OR = [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ];
      }

      if (category) {
        try {
          const categoryEnum = category.toUpperCase() as Category;
          whereConditions.category = categoryEnum;
        } catch (error) {
          console.error("Invalid category:", category);
        }
      }

      if (minPrice || maxPrice) {
        whereConditions.price = {};

        if (minPrice) {
          whereConditions.price.gte = parseFloat(minPrice) * 100;
        }

        if (maxPrice) {
          whereConditions.price.lte = parseFloat(maxPrice) * 100;
        }
      }

      if (minRating) {
        whereConditions.rating = {
          gte: parseFloat(minRating),
        };
      }

      if (colors) {
        const colorArray = colors.split(",");
        whereConditions.colors = {
          hasSome: colorArray,
        };
      }

      if (sizes) {
        const sizeArray = sizes.split(",");
        whereConditions.sizes = {
          hasSome: sizeArray,
        };
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
        case "name_asc":
          orderBy = { name: "asc" };
          break;
        case "name_desc":
          orderBy = { name: "desc" };
          break;
        case "rating_desc":
          orderBy = { rating: "desc" };
          break;
        case "popular":
          orderBy = { rating: "desc" };
          break;
        default:
          orderBy = { createdAt: "desc" };
      }

      const products = await prisma.product.findMany({
        where: whereConditions,
        orderBy: orderBy,
      });

      const facets = await getFacets(whereConditions);

      console.log(`Found ${products.length} products matching criteria`);

      const result = {
        products,
        facets,
      };

      searchRequestCache.set(cacheKey, {
        timestamp: now,
        result,
      });

      if (searchRequestCache.size > 100) {
        const keysToDelete = [];
        for (const [key, value] of searchRequestCache.entries()) {
          if (now - value.timestamp > CACHE_TTL_MS * 5) {
            keysToDelete.push(key);
          }
        }
        keysToDelete.forEach((key) => searchRequestCache.delete(key));
      }

      return reply.send(result);
    } catch (error) {
      console.error("Error in product search:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.get("/products/suggestions", async (request, reply) => {
    try {
      const { query } = request.query as { query: string };

      if (!query || query.trim() === "") {
        return reply.send([]);
      }

      const suggestions = await prisma.product.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          imageUrl: true,
          category: true,
        },
        take: 5,
      });

      return reply.send(suggestions);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.get("/products/stats", async (request, reply) => {
    try {
      const { category } = request.query as { category?: string };

      const whereCondition: any = {};
      if (category) {
        try {
          const categoryEnum = category.toUpperCase() as Category;
          whereCondition.category = categoryEnum;
        } catch (error) {
          console.error("Invalid category:", category);
        }
      }

      const minPriceResult = await prisma.product.findFirst({
        where: whereCondition,
        orderBy: { price: "asc" },
        select: { price: true },
      });

      const maxPriceResult = await prisma.product.findFirst({
        where: whereCondition,
        orderBy: { price: "desc" },
        select: { price: true },
      });

      const categoryCounts = await prisma.$transaction(
        Object.values(Category).map((cat) =>
          prisma.product.count({ where: { category: cat } })
        )
      );

      const categoryStats = Object.values(Category).reduce(
        (acc, cat, i) => {
          acc[cat] = categoryCounts[i];
          return acc;
        },
        {} as Record<string, number>
      );

      return reply.send({
        priceRange: {
          min: minPriceResult?.price || 0,
          max: maxPriceResult?.price || 100,
        },
        categoryCounts: categoryStats,
      });
    } catch (error) {
      console.error("Error fetching product stats:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.get("/products/featured", async (request, reply) => {
    try {
      const featuredProducts = await prisma.product.findMany({
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
      });

      return reply.send(featuredProducts);
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
    const { category } = request.params as { category: string };

    try {
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

  app.post("/products/recently-viewed", async (request, reply) => {
    try {
      const { userId, productId } = request.body as {
        userId: string;
        productId: string;
      };

      if (!userId || !productId) {
        return reply.status(400).send({ error: "Missing required fields" });
      }

      const existingView = await prisma.recentlyViewed.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      if (existingView) {
        await prisma.recentlyViewed.update({
          where: {
            id: existingView.id,
          },
          data: {
            viewedAt: new Date(),
          },
        });
      } else {
        await prisma.recentlyViewed.create({
          data: {
            userId,
            productId,
          },
        });

        const allViews = await prisma.recentlyViewed.findMany({
          where: {
            userId,
          },
          orderBy: {
            viewedAt: "desc",
          },
        });

        if (allViews.length > 10) {
          const viewsToDelete = allViews.slice(10);
          await Promise.all(
            viewsToDelete.map((view) =>
              prisma.recentlyViewed.delete({
                where: {
                  id: view.id,
                },
              })
            )
          );
        }
      }

      return reply.status(200).send({ success: true });
    } catch (error) {
      console.error("Error tracking recently viewed product:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.get("/products/recently-viewed/:userId", async (request, reply) => {
    try {
      const { userId } = request.params as { userId: string };

      const recentlyViewed = await prisma.recentlyViewed.findMany({
        where: {
          userId,
        },
        orderBy: {
          viewedAt: "desc",
        },
        include: {
          product: true,
        },
        take: 10,
      });

      const products = recentlyViewed.map((item) => item.product);
      return reply.send(products);
    } catch (error) {
      console.error("Error fetching recently viewed products:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}

async function getFacets(baseWhereConditions: any) {
  const categoryFacets = await prisma.product.groupBy({
    by: ["category"],
    where: baseWhereConditions,
    _count: {
      category: true,
    },
  });

  const priceStats = await prisma.product.aggregate({
    where: baseWhereConditions,
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  });

  const colorProducts = await prisma.product.findMany({
    where: baseWhereConditions,
    select: {
      colors: true,
    },
  });

  const colorCounts: Record<string, number> = {};
  colorProducts.forEach((product) => {
    product.colors.forEach((color) => {
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    });
  });

  const sizeProducts = await prisma.product.findMany({
    where: baseWhereConditions,
    select: {
      sizes: true,
    },
  });

  const sizeCounts: Record<string, number> = {};
  sizeProducts.forEach((product) => {
    product.sizes.forEach((size) => {
      sizeCounts[size] = (sizeCounts[size] || 0) + 1;
    });
  });

  const ratingFacets = await prisma.product.groupBy({
    by: ["rating"],
    where: baseWhereConditions,
    _count: {
      rating: true,
    },
  });

  return {
    categories: categoryFacets,
    priceRange: {
      min: priceStats._min.price,
      max: priceStats._max.price,
    },
    colors: Object.entries(colorCounts).map(([color, count]) => ({
      name: color,
      count,
    })),
    sizes: Object.entries(sizeCounts).map(([size, count]) => ({
      name: size,
      count,
    })),
    ratings: ratingFacets,
  };
}

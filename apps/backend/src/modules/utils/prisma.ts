import { PrismaClient, User } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

export default prisma;

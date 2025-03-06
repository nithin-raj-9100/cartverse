import prisma from "../src/modules/utils/prisma";
import { faker } from "@faker-js/faker";
import { Category } from "@prisma/client";

const randomSubset = (arr: string[]): string[] => {
  const count = faker.number.int({ min: 1, max: arr.length });
  return arr.sort(() => 0.5 - Math.random()).slice(0, count);
};

const categories = Object.values(Category);

const getRandomCategory = (): Category => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
};

const seedProducts = async () => {
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["red", "blue", "green", "yellow", "black", "white"];

  await prisma.product.deleteMany();

  const products = Array.from({ length: 40 }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    imageUrl: faker.image.url(),
    sizes: randomSubset(sizes),
    colors: randomSubset(colors),
    category: getRandomCategory(),
  }));

  await prisma.product.createMany({
    data: products,
  });

  console.log(`Seeded ${products.length} products successfully`);
};

const main = async () => {
  try {
    await seedProducts();
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main();

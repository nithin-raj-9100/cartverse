import prisma from "../src/modules/utils/prisma";
import { faker } from "@faker-js/faker";

const randomSubset = (arr: string[]): string[] => {
  const count = faker.number.int({ min: 1, max: arr.length });
  return arr.sort(() => 0.5 - Math.random()).slice(0, count);
};

const seedProducts = async () => {
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["red", "blue", "green", "yellow"];

  await prisma.product.deleteMany();

  const products = Array.from({ length: 20 }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    imageUrl: faker.image.url(),
    sizes: randomSubset(sizes),
    colors: randomSubset(colors),
  }));

  await prisma.product.createMany({
    data: products,
  });

  console.log("Products seeded successfully");
};

seedProducts();

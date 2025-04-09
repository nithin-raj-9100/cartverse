import prisma from "../src/modules/utils/prisma";
import { Category } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import {
  productDescriptions,
  getProductDetailsByFilename,
  extractColorFromFilename,
  getSizesByCategory,
  mapToPrismaCategory,
} from "./data";

// Initialize Supabase client
const supabaseUrl = "https://ccqcamfmjefdacrdjhxj.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "your-anon-key"; // Replace with your actual key
const supabase = createClient(supabaseUrl, supabaseKey);

// Define categories as array
const categories = [
  "accessories",
  "body_and_hair",
  "clothing",
  "electronics",
  "footwear",
  "home_and_interior",
  "kids",
  "tshirts",
];

const randomSubset = (arr: string[]): string[] => {
  const count = Math.floor(Math.random() * arr.length) + 1;
  return arr.sort(() => 0.5 - Math.random()).slice(0, count);
};

// Function to get URLs from a specific subfolder
async function getUrlsFromSubfolder(bucketName: string, subfolderPath: string) {
  console.log(`Listing files in ${subfolderPath}...`);

  const { data: files, error } = await supabase.storage
    .from(bucketName)
    .list(subfolderPath, { sortBy: { column: "name", order: "asc" } });

  if (error) {
    console.error(`Error fetching files from ${subfolderPath}:`, error);
    return [];
  }

  if (!files || files.length === 0) {
    console.log(`No files found in ${subfolderPath} folder`);
    return [];
  }

  console.log(`Found ${files.length} files in ${subfolderPath} folder`);

  // Create array of objects with file information
  const fileObjects = files
    .filter((file) => !file.name.startsWith(".") && file.name) // Filter out hidden files
    .map((file) => {
      const filePath = `${subfolderPath}/${file.name}`;
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      return {
        name: file.name,
        path: filePath,
        publicUrl: data.publicUrl,
      };
    });

  return fileObjects;
}

// Method to get all URLs from all subfolders
async function getAllFilesFromBucket(bucketName: string, subfolders: string[]) {
  const allFiles = [];

  for (const subfolder of subfolders) {
    const files = await getUrlsFromSubfolder(bucketName, subfolder);
    allFiles.push(
      ...files.map((file) => ({
        ...file,
        category: subfolder,
      }))
    );
  }

  return allFiles;
}

const seedProducts = async () => {
  const bucketName = "testing-bucket";

  console.log("Clearing existing products...");
  await prisma.product.deleteMany();

  // Define known example products to ensure we have at least one good example from each category
  const exampleProducts = [
    {
      name: "Insulated Black Travel Mug",
      description:
        "Double-walled insulated travel mug that keeps beverages hot for up to 6 hours. Sleek black design with non-slip base and leak-proof lid.",
      price: 1999,
      imageUrl:
        "https://ccqcamfmjefdacrdjhxj.supabase.co/storage/v1/object/public/testing-bucket/accessories/cup-black.avif",
      sizes: ["One Size"],
      colors: ["black"],
      category: Category.DRINKWARE,
      rating: 4.7,
    },
    {
      name: "Kérastase Specifique Treatment",
      description:
        "Professional-grade hair treatment that nourishes from root to tip. This 250ml bottle revitalizes damaged hair and prevents breakage.",
      price: 5999,
      imageUrl:
        "https://ccqcamfmjefdacrdjhxj.supabase.co/storage/v1/object/public/testing-bucket/body_and_hair/15_kerastase-specifique-250-ml.jpg",
      sizes: ["250ml"],
      colors: ["N/A"],
      category: Category.BAGS, // Mapped temporarily since there's no HAIR category
      rating: 4.9,
    },
  ];

  const productData = [...exampleProducts];

  console.log("Fetching all files from Supabase storage...");
  const allFiles = await getAllFilesFromBucket(bucketName, categories);

  console.log(`Retrieved ${allFiles.length} files from all subfolders`);

  // Create products from files
  if (allFiles.length > 0) {
    // Process files from each category to create products
    for (const category of categories) {
      const categoryFiles = allFiles.filter(
        (file) => file.category === category
      );

      for (const file of categoryFiles) {
        // Skip if we already created a product with this image
        if (productData.some((p) => p.imageUrl === file.publicUrl)) {
          continue;
        }

        // Get the filename without extension
        const filename = file.name.split(".")[0];

        // Get product details from our data.ts file
        const productDetails = getProductDetailsByFilename(file.name, category);

        // Extract colors from filename if not provided in product details
        const colors =
          productDetails.colors || extractColorFromFilename(file.name);

        // Get appropriate sizes for this category if not provided in product details
        const sizes = productDetails.sizes || getSizesByCategory(category);

        // Generate product data
        productData.push({
          name: productDetails.name,
          description: productDetails.description,
          price: productDetails.price,
          imageUrl: file.publicUrl,
          sizes: sizes,
          colors: colors,
          category: mapToPrismaCategory(category),
          rating: productDetails.rating,
        });
      }
    }
  }

  // Ensure we have at least some products if API calls fail
  if (productData.length <= exampleProducts.length) {
    console.log(
      "Not enough products fetched from Supabase, adding fallback products"
    );
    // Add fallback products
    const fallbackProducts = [
      {
        name: "Essential Black T-Shirt",
        description:
          "Premium combed cotton t-shirt with reinforced stitching and pre-shrunk fabric. Classic fit with ribbed crew neck and double-needle hem.",
        price: 2499,
        imageUrl: `https://ccqcamfmjefdacrdjhxj.supabase.co/storage/v1/object/public/testing-bucket/tshirts/tshirt-black.png`,
        sizes: ["S", "M", "L", "XL"],
        colors: ["black"],
        category: Category.SHIRTS,
        rating: 4.5,
      },
      {
        name: "Leather Tote Bag",
        description:
          "Elegantly crafted genuine leather tote bag with spacious compartments and durable metal fixtures. Perfect for everyday use or professional settings.",
        price: 8999,
        imageUrl: `https://ccqcamfmjefdacrdjhxj.supabase.co/storage/v1/object/public/testing-bucket/accessories/bag-1-dark.avif`,
        sizes: ["One Size"],
        colors: ["brown"],
        category: Category.BAGS,
        rating: 4.8,
      },
    ];

    productData.push(...fallbackProducts);
  }

  // Insert products into the database
  console.log(`Inserting ${productData.length} products into database...`);
  await prisma.product.createMany({
    data: productData,
  });

  console.log(`Seeded ${productData.length} products successfully`);
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

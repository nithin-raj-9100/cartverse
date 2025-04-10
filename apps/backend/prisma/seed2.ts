import { PrismaClient, Category, ProductCategory } from '@prisma/client';
import { faker } from '@faker-js/faker'; 
import prisma from '../src/modules/utils/prisma';


const SUPABASE_PROJECT_ID = 'ccqcamfmjefdacrdjhxj'; 
const BUCKET_NAME = 'testing-bucket';
const SUPABASE_STORAGE_BASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET_NAME}`;


const folderToCategoryMap: Record<string, ProductCategory> = {
    accessories: ProductCategory.ACCESSORIES,
    body_and_hair: ProductCategory.BODY_AND_HAIR,
    clothing: ProductCategory.CLOTHING,
    electronics: ProductCategory.ELECTRONICS,
    footwear: ProductCategory.FOOTWEAR,
    home_and_interior: ProductCategory.HOME_AND_INTERIOR,
    kids: ProductCategory.KIDS,
    tshirts: ProductCategory.TSHIRTS,
};

const getImageUrl = (filePath: string): string => `${SUPABASE_STORAGE_BASE_URL}/${filePath}`;

const generateDescription = (name: string, category: ProductCategory): string => {
    const base = `High-quality ${name.toLowerCase()}.`;
    switch (category) {
        case ProductCategory.CLOTHING:
        case ProductCategory.TSHIRTS:
            return `${base} Perfect for casual wear or layering. Made from comfortable, durable materials.`;
        case ProductCategory.ELECTRONICS:
            return `${base} Enhance your digital life with the latest technology. Sleek design and powerful performance.`;
        case ProductCategory.FOOTWEAR:
            return `${base} Step out in style and comfort. Designed for durability and fashion.`;
        case ProductCategory.ACCESSORIES:
            return `${base} Carry your essentials in style. Features multiple compartments and durable construction.`;
        case ProductCategory.KIDS:
             return `${base} Comfortable and fun design, perfect for kids. Made with soft, safe materials.`;
        case ProductCategory.BODY_AND_HAIR:
            return `${base} Pamper yourself with our premium body and hair care products.`;
        case ProductCategory.HOME_AND_INTERIOR:
            return `${base} Elevate your living space with stylish and functional home decor.`;
        default:
            return `${base} A versatile item suitable for various occasions.`;
    }
};

const getSizes = (category: ProductCategory): string[] => {
    switch (category) {
        case ProductCategory.CLOTHING:
        case ProductCategory.TSHIRTS:
        case ProductCategory.KIDS:
            return ['S', 'M', 'L', 'XL'];
        case ProductCategory.FOOTWEAR:
            return ['7', '8', '9', '10', '11', '12'];
        case ProductCategory.BODY_AND_HAIR:
            return ['Standard'];
        default:
            return [];
    }
};

const extractColor = (name: string): string[] => {
    const lowerName = name.toLowerCase();
    const commonColors = ['black', 'gray', 'blue', 'red', 'green'];
    for (const color of commonColors) {
        if (lowerName.includes(color)) {
            return [color.charAt(0).toUpperCase() + color.slice(1)];
        }
    }
    return ['Default'];
};


const productDataRaw = [
  { filePath: 'clothing/sweater-crew-white.avif', folder: 'clothing' },
  { filePath: 'clothing/shirt-button-striped.avif', folder: 'clothing' },
  { filePath: 'clothing/shirt-denim-light.avif', folder: 'clothing' },
  { filePath: 'clothing/vest-puffer-gray.avif', folder: 'clothing' },
  { filePath: 'clothing/vest-puffer-black.avif', folder: 'clothing' },
  { filePath: 'clothing/tank-top-floral.avif', folder: 'clothing' },
  { filePath: 'clothing/jacket-denim-light.avif', folder: 'clothing' },
  { filePath: 'clothing/blouse-flowing-white.avif', folder: 'clothing' },
  { filePath: 'clothing/cardigan-cream.avif', folder: 'clothing' },
  { filePath: 'clothing/hoodie-black.avif', folder: 'clothing' },
  { filePath: 'clothing/t-shirt-basic-gray.avif', folder: 'clothing' },
  { filePath: 'clothing/polo-shirt-navy.avif', folder: 'clothing' },
  { filePath: 'clothing/puffer-jacket-black.avif', folder: 'clothing' },
  { filePath: 'clothing/dress-black-formal.avif', folder: 'clothing' },
  { filePath: 'clothing/sweater-relaxed-beige.avif', folder: 'clothing' },
  { filePath: 'clothing/jacket-winter-dark.avif', folder: 'clothing' },
  { filePath: 'clothing/sweater-knit-gray.avif', folder: 'clothing' },
  { filePath: 'clothing/jacket-lightweight-black.avif', folder: 'clothing' },
  { filePath: 'clothing/blazer-formal-black.avif', folder: 'clothing' },
  { filePath: 'clothing/turtleneck-ribbed-beige.avif', folder: 'clothing' },

  { filePath: 'home_and_interior/dining-table-round.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/serving-bowl-ceramic.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/vase-ceramic-tall.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/throw-blanket-gray.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/coffee-table-wood.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/armchair-modern-gray.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/table-lamp-ceramic.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/sofa-minimalist-beige.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/dining-chair-wooden.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/shelf-unit-wood.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/vase-ceramic-white.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/plant-pot-natural.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/candle-holder-brass.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/pillow-cover-gray.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/wall-art-abstract.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/table-lamp-minimal.avif', folder: 'home_and_interior' },
  { filePath: 'home_and_interior/table-lamp-black.avif', folder: 'home_and_interior' },

  { filePath: 'electronics/asus-laptop-gaming.avif', folder: 'electronics' },
  { filePath: 'electronics/asus-laptop-slim.avif', folder: 'electronics' },
  { filePath: 'accessories/umbrella-black.avif', folder: 'accessories' },
  { filePath: 'accessories/umbrella-checked.avif', folder: 'accessories' },
  { filePath: 'electronics/gaming-keyboard-rgb.avif', folder: 'electronics' },
  { filePath: 'footwear/leather-pumps-black.jpg', folder: 'footwear' },
  { filePath: 'body_and_hair/maria-nila-hair-heal-shampoo-1000-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/10_moroccanoil-hydration-bond-1000-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/11_moroccanoil-hydration-bond-500-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/12_moroccanoil-hydration-bond-300-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/13_redken-arctic-bonding-400-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/14_kerastase-genesis-300-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/15_kerastase-specifique-250-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/17_grazette-neccin-anti-300-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/18_maria-nila-head--hair-heal-shampoo-350-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/19_rebecca-stella-body-lotion-300-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/1_lancome-lush-one.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/20_intensive-moisture-100-ml.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/2_max-factor-power-lush.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/3_clinique-lash-power.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/4_loreal-paris-telescopic-mascara.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/5_lumene-cc-colour-correcting-cream.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/6_laura-mercier-real-flawless-skin.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/7_lumene-glow-fluid-foundation.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/8_it-cosmetics-cc-cream-spf50.jpg', folder: 'body_and_hair' },
  { filePath: 'body_and_hair/9_waterclouds-moist-conditioner-1000-ml.jpg', folder: 'body_and_hair' },

  { filePath: 'electronics/meta-quest-2-128gb.avif', folder: 'electronics' },
  { filePath: 'electronics/meta-quest-3-128gb.avif', folder: 'electronics' },
  { filePath: 'electronics/meta-quest-3-256gb.avif', folder: 'electronics' },

  { filePath: 'tshirts/t-shirt-circles-black.png', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-circles-blue.png', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-color-black.png', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-color-white.png', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-spiral-3.png', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-spiral-4.png', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-women-black-1.jpg', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-women-black-2.jpg', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-women-black-3.jpg', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-women-yellow-1.jpg', folder: 'tshirts' },
  { filePath: 'tshirts/t-shirt-women-yellow-2.jpg', folder: 'tshirts' },

  { filePath: 'kids/baby-cap-black.png', folder: 'kids' },
  { filePath: 'kids/baby-onesie-beige-1.png', folder: 'kids' },
  { filePath: 'kids/baby-onesie-black-1-rename.png', folder: 'kids' },

  { filePath: 'accessories/bag-1-dark.avif', folder: 'accessories' },
  { filePath: 'accessories/carl-dagg-classic-blue.avif', folder: 'accessories' },
  { filePath: 'accessories/carl-dagg-classic-red.avif', folder: 'accessories' },
  { filePath: 'accessories/cowboy-hat-black-1.png', folder: 'accessories' },
  { filePath: 'accessories/cup-black.avif', folder: 'accessories' },
  { filePath: 'accessories/handbag-1.webp', folder: 'accessories' },
  { filePath: 'accessories/mug-1.avif', folder: 'accessories' },
  { filePath: 'clothing/bomber-jacket-black.png', folder: 'clothing' },
  { filePath: 'clothing/hoodie-1.png', folder: 'clothing' },
  { filePath: 'electronics/bowers--wilkins-px-7-blue.avif', folder: 'electronics' },
  { filePath: 'electronics/bowers--wilkins-px-7-green.avif', folder: 'electronics' },
  { filePath: 'electronics/creative-blaster-x.avif', folder: 'electronics' },
  { filePath: 'electronics/htc-vive-xr-elite.avif', folder: 'electronics' },
  { filePath: 'electronics/jabra-elite-active-black.avif', folder: 'electronics' },
  { filePath: 'electronics/jabra-elite-active-pink.avif', folder: 'electronics' },
  { filePath: 'electronics/logitech-gaming-headset-01.avif', folder: 'electronics' },
  { filePath: 'electronics/logitech-smooth-buttons.avif', folder: 'electronics' },
  { filePath: 'electronics/msi-katana.avif', folder: 'electronics' },
  { filePath: 'electronics/razer-death-adder.avif', folder: 'electronics' },
  { filePath: 'electronics/samsung-hw-s66b-soundbar-black.avif', folder: 'electronics' },
  { filePath: 'electronics/samsung-hw-s66b-soundbar-white.avif', folder: 'electronics' },
  { filePath: 'electronics/sonos-beam-3.avif', folder: 'electronics' },
  { filePath: 'electronics/steel-series-g18.avif', folder: 'electronics' },
  { filePath: 'electronics/xtrfy-kerfy-board.avif', folder: 'electronics' },
  { filePath: 'footwear/10_atp-atelier-centola-black-leather.jpg', folder: 'footwear' },
  { filePath: 'footwear/11_atp-atelier-alassio-black-nappa.jpg', folder: 'footwear' },
  { filePath: 'footwear/12_atp-atelier-alassio-brown-nappa.jpg', folder: 'footwear' },
  { filePath: 'footwear/14_nike-air-flight.jpg', folder: 'footwear' },
  { filePath: 'footwear/15_nike-dunk-1_4.jpg', folder: 'footwear' },
  { filePath: 'footwear/16_adidas-gazelle-brown.jpg', folder: 'footwear' },
  { filePath: 'footwear/17_adidas-gazelle-blue.jpg', folder: 'footwear' },
  { filePath: 'footwear/18_morjas-the-chukka.jpg', folder: 'footwear' },
  { filePath: 'footwear/19_morjas-the-chelsea-brown-calf.jpg', folder: 'footwear' },
  { filePath: 'footwear/1_atp-atelier-caserta.jpg', folder: 'footwear' },
  { filePath: 'footwear/20_morjas-the-chelsea-brown-grain.jpg', folder: 'footwear' },
  { filePath: 'footwear/2_atp-atelier-cirella.jpg', folder: 'footwear' },
  { filePath: 'footwear/3_atp-atelier-capena-hazel.jpg', folder: 'footwear' },
  { filePath: 'footwear/4_atp-atelier-capena-black.jpg', folder: 'footwear' },
  { filePath: 'footwear/5_atp-atelier-petina-linen.jpg', folder: 'footwear' },
  { filePath: 'footwear/6_atp-atelier-petina-pastel-blue.jpg', folder: 'footwear' },
  { filePath: 'footwear/7_atp-atelier-airola-brandy-loafer.jpg', folder: 'footwear' },
  { filePath: 'footwear/8_atp-atelier-airola-limestone-loafer.jpg', folder: 'footwear' },
  { filePath: 'footwear/9_atp-atelier-centola-brown-leather.jpg', folder: 'footwear' },

];

async function main() {
  console.log('Deleting existing products...');
  await prisma.product.deleteMany({});
  console.log('Existing products deleted.');

  let createdCount = 0;
  let skippedCount = 0;

  console.log('Seeding new products...');
  for (const item of productDataRaw) {
    const category = folderToCategoryMap[item.folder];

    if (!category) {
        console.warn(`  Skipping ${item.filePath}: No matching category found for folder '${item.folder}'.`);
        skippedCount++;
        continue;
    }

    const filename = item.filePath.split('/').pop() || 'unknown';
    const nameParts = filename.split('.')[0].replace(/[-_]/g, ' ').split(' ');
    const productName = nameParts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
      .replace(/\b(Avif|Png|Jpg|Jpeg|Webp)\b/gi, '')
      .trim();


    const productData = {
      name: productName,
      description: generateDescription(productName, category),
      price: faker.number.int({ min: 1000, max: 20000 }),
      category: category,
      imageUrl: getImageUrl(item.filePath),
      sizes: getSizes(category),
      colors: extractColor(productName),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }).toFixed(1)),
    };

    try {
        await prisma.product.create({
            data: productData,
        });
        createdCount++;
        console.log(`  Created product: ${productData.name}`);
    } catch (error) {
        console.error(`  Error creating product ${productData.name}:`, error);
        skippedCount++;
    }
  }

  console.log(`\nSeeding finished.`);
  console.log(`  Successfully created: ${createdCount} products.`);
  console.log(`  Skipped: ${skippedCount} products.`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Prisma client disconnected.');
  });

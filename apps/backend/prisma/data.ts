import { Category } from "@prisma/client";

export const productDescriptions = {
  accessories: {
    "bag-1-dark": {
      name: "Leather Tote Bag",
      description:
        "Elegantly crafted genuine leather tote bag with spacious compartments and durable metal fixtures. Perfect for everyday use or professional settings.",
      price: 8999,
      rating: 4.8,
    },
    "bag-2": {
      name: "Canvas Shoulder Bag",
      description:
        "Lightweight canvas shoulder bag with adjustable straps and multiple pockets. Ideal for casual outings and everyday errands.",
      price: 5999,
      rating: 4.6,
    },
    "cup-black": {
      name: "Insulated Black Travel Mug",
      description:
        "Double-walled insulated travel mug that keeps beverages hot for up to 6 hours. Sleek black design with non-slip base and leak-proof lid.",
      price: 1999,
      rating: 4.7,
    },
    "cup-white": {
      name: "Ceramic Designer Mug",
      description:
        "Minimalist ceramic mug with ergonomic handle. Microwave and dishwasher safe with an elegant matte finish.",
      price: 1599,
      rating: 4.5,
    },
    "wallet-brown": {
      name: "Classic Leather Wallet",
      description:
        "Handcrafted genuine leather wallet with multiple card slots, bill compartment, and RFID protection technology.",
      price: 3499,
      rating: 4.6,
    },
  },

  body_and_hair: {
    "15_kerastase-specifique-250-ml": {
      name: "Kérastase Specifique Treatment",
      description:
        "Professional-grade hair treatment that nourishes from root to tip. This 250ml bottle revitalizes damaged hair and prevents breakage.",
      price: 5999,
      rating: 4.9,
    },
    "body-lotion": {
      name: "Hydrating Body Lotion",
      description:
        "Rich, non-greasy formula that provides 24-hour hydration with natural extracts and vitamins E and B5.",
      price: 1899,
      rating: 4.7,
    },
    "facial-cleanser": {
      name: "Gentle Facial Cleanser",
      description:
        "pH-balanced facial cleanser that removes impurities without stripping natural oils. Suitable for all skin types.",
      price: 2499,
      rating: 4.8,
    },
    "hair-spray": {
      name: "Flexible Hold Hair Spray",
      description:
        "Medium-hold hair spray that provides all-day control without stiffness. Humidity resistant and quick-drying formula.",
      price: 1699,
      rating: 4.5,
    },
  },

  clothing: {
    "blazer-black": {
      name: "Tailored Black Blazer",
      description:
        "Slim-fit blazer with premium fabric and classic design. Features notched lapels, two-button closure, and interior pockets.",
      price: 9999,
      rating: 4.7,
    },
    "dress-casual": {
      name: "Casual Summer Dress",
      description:
        "Breezy summer dress made from lightweight cotton blend. Features adjustable straps and side pockets with a relaxed fit.",
      price: 4999,
      rating: 4.6,
    },
    "jeans-blue": {
      name: "Classic Denim Jeans",
      description:
        "Straight-leg jeans with medium wash and subtle fading. Made from durable denim with slight stretch for comfort.",
      price: 5999,
      rating: 4.8,
    },
    "jacket-leather": {
      name: "Vintage Leather Jacket",
      description:
        "Genuine leather jacket with distressed finish and quilted lining. Features asymmetrical zipper and adjustable waist tabs.",
      price: 14999,
      rating: 4.9,
    },
  },

  electronics: {
    "bowers-wilkins-px7-blue": {
      name: "Bowers & Wilkins PX7 Headphones - Blue",
      description:
        "Premium wireless noise-cancelling headphones with adaptive audio technology. Features 30-hour battery life, intuitive controls, and premium materials for superior sound quality.",
      price: 34999,
      rating: 4.8,
      colors: ["blue"],
    },
    "bowers-wilkins-px7-green": {
      name: "Bowers & Wilkins PX7 Headphones - Green",
      description:
        "Premium wireless noise-cancelling headphones with adaptive audio technology. Features 30-hour battery life, intuitive controls, and premium materials for superior sound quality.",
      price: 34999,
      rating: 4.8,
      colors: ["green"],
    },
    "earbuds-wireless": {
      name: "True Wireless Earbuds",
      description:
        "Bluetooth 5.2 earbuds with active noise cancellation and transparency mode. Up to 8 hours of playback and additional 24 hours with charging case.",
      price: 12999,
      rating: 4.7,
    },
    "smart-watch": {
      name: "Fitness Smart Watch",
      description:
        'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking. Features 1.3" AMOLED display and 7-day battery life.',
      price: 19999,
      rating: 4.6,
    },
    "bluetooth-speaker": {
      name: "Portable Bluetooth Speaker",
      description:
        "Waterproof speaker with 360° sound and deep bass. Features 20-hour battery life, built-in microphone, and durable design for outdoor use.",
      price: 7999,
      rating: 4.5,
    },
  },

  footwear: {
    "sneakers-white": {
      name: "Classic White Sneakers",
      description:
        "Minimalist white leather sneakers with cushioned insoles and rubber outsoles. Versatile design for everyday wear and casual outfits.",
      price: 6999,
      rating: 4.7,
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
    },
    "boots-leather": {
      name: "Waterproof Leather Boots",
      description:
        "Full-grain leather boots with waterproof membrane and insulated lining. Features Vibram outsoles for superior traction on all surfaces.",
      price: 12999,
      rating: 4.8,
      sizes: ["39", "40", "41", "42", "43", "44", "45"],
    },
    "sandals-summer": {
      name: "Anatomic Summer Sandals",
      description:
        "Ergonomic sandals with contoured footbed and adjustable straps. Made from sustainable materials with non-slip outsoles.",
      price: 4999,
      rating: 4.5,
      sizes: ["36", "37", "38", "39", "40", "41", "42"],
    },
    "running-shoes": {
      name: "Performance Running Shoes",
      description:
        "Lightweight running shoes with responsive cushioning and breathable mesh upper. Features specialized outsole pattern for optimal traction on various surfaces.",
      price: 9999,
      rating: 4.9,
      sizes: ["39", "40", "41", "42", "43", "44", "45"],
    },
  },

  home_and_interior: {
    "lamp-modern": {
      name: "Modern Table Lamp",
      description:
        "Contemporary table lamp with adjustable arm and dimmable LED light. Features USB charging port and sleek metal finish.",
      price: 7999,
      rating: 4.6,
    },
    "vase-ceramic": {
      name: "Handcrafted Ceramic Vase",
      description:
        "Artisanal ceramic vase with unique glazed finish. Each piece is slightly different due to the handmade process, making it a one-of-a-kind addition to your decor.",
      price: 3999,
      rating: 4.7,
    },
    "throw-pillow": {
      name: "Decorative Throw Pillow",
      description:
        "Soft, textured throw pillow with hidden zipper and hypoallergenic insert. Made from premium fabric that resists fading and staining.",
      price: 2499,
      rating: 4.5,
    },
    "wall-art": {
      name: "Abstract Canvas Wall Art",
      description:
        "Museum-quality canvas print with vibrant colors and gallery wrapping. Arrives ready to hang with pre-installed hardware.",
      price: 8999,
      rating: 4.8,
    },
  },

  kids: {
    "baby-cap-black": {
      name: "Infant Cotton Cap",
      description:
        "Soft, breathable cotton cap for babies with adjustable fit. Provides UPF 50+ sun protection and is machine washable.",
      price: 1499,
      rating: 4.7,
      sizes: ["0-3M", "3-6M", "6-12M"],
    },
    "baby-onesie-black-1": {
      name: "Organic Cotton Black Onesie",
      description:
        "GOTS certified organic cotton onesie with snap closures for easy diaper changes. Features flat seams to prevent irritation on sensitive skin.",
      price: 1999,
      rating: 4.9,
      sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    },
    "baby-onesie-beige-1": {
      name: "Organic Cotton Beige Onesie",
      description:
        "GOTS certified organic cotton onesie with snap closures for easy diaper changes. Features flat seams to prevent irritation on sensitive skin.",
      price: 1999,
      rating: 4.9,
      sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    },
    "toddler-shoes": {
      name: "First Steps Toddler Shoes",
      description:
        "Supportive shoes designed for early walkers with flexible soles and ankle support. Made from non-toxic materials with easy-on design.",
      price: 2999,
      rating: 4.8,
      sizes: ["3", "4", "5", "6", "7"],
    },
  },

  tshirts: {
    "t-shirt-color-black": {
      name: "Essential Black T-Shirt",
      description:
        "Premium combed cotton t-shirt with reinforced stitching and pre-shrunk fabric. Classic fit with ribbed crew neck and double-needle hem.",
      price: 2499,
      rating: 4.5,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["black"],
    },
    "t-shirt-color-white": {
      name: "Essential White T-Shirt",
      description:
        "Premium combed cotton t-shirt with reinforced stitching and pre-shrunk fabric. Classic fit with ribbed crew neck and double-needle hem.",
      price: 2499,
      rating: 4.5,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["white"],
    },
    "t-shirt-circles-blue": {
      name: "Blue Circles Graphic T-Shirt",
      description:
        "Unique circular pattern printed using eco-friendly dyes on premium cotton. Modern fit with slightly longer back hem.",
      price: 2999,
      rating: 4.3,
      sizes: ["S", "M", "L", "XL"],
      colors: ["blue"],
    },
    "t-shirt-circles-black": {
      name: "Black Circles Graphic T-Shirt",
      description:
        "Unique circular pattern printed using eco-friendly dyes on premium cotton. Modern fit with slightly longer back hem.",
      price: 2999,
      rating: 4.3,
      sizes: ["S", "M", "L", "XL"],
      colors: ["black"],
    },
    "t-shirt-spiral-3": {
      name: "Spiral Design T-Shirt - Pattern 1",
      description:
        "Eye-catching spiral design printed on high-quality cotton blend. Relaxed fit with pre-washed fabric for added softness.",
      price: 3499,
      rating: 4.6,
      sizes: ["S", "M", "L", "XL"],
      colors: ["multi"],
    },
    "t-shirt-spiral-4": {
      name: "Spiral Design T-Shirt - Pattern 2",
      description:
        "Bold spiral design on premium cotton fabric. Features reinforced shoulder seams and tagless neck label for comfort.",
      price: 3499,
      rating: 4.7,
      sizes: ["S", "M", "L", "XL"],
      colors: ["multi"],
    },
    "t-shirt-women-black-1-resized": {
      name: "Women's Fitted Black T-Shirt",
      description:
        "Tailored fit women's t-shirt made from soft cotton with a touch of elastane for stretch. Features a slightly scooped neckline and side slits.",
      price: 2699,
      rating: 4.8,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["black"],
    },
    "t-shirt-women-black-2": {
      name: "Women's Premium Black T-Shirt",
      description:
        "Luxury pima cotton t-shirt with a silky finish and exceptional durability. Designed with a flattering slim fit and longer length.",
      price: 2999,
      rating: 4.9,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["black"],
    },
    "t-shirt-women-yellow-1": {
      name: "Women's Sunshine Yellow T-Shirt",
      description:
        "Vibrant yellow tee made from soft, breathable fabric that's perfect for warm weather. Features a relaxed fit with slightly rolled sleeves.",
      price: 2699,
      rating: 4.3,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["yellow"],
    },
  },
};

export const getProductDetailsByFilename = (
  filename: string,
  category: string
) => {
  const fileBaseName = filename.split(".")[0];

  const categoryProducts =
    productDescriptions[category as keyof typeof productDescriptions];
  if (
    categoryProducts &&
    categoryProducts[fileBaseName as keyof typeof categoryProducts]
  ) {
    return categoryProducts[fileBaseName as keyof typeof categoryProducts];
  }

  const name = fileBaseName
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    name,
    description: `Quality ${category.replace(/_/g, " ")} product designed for everyday use.`,
    price: Math.floor(Math.random() * 8000) + 1500,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
  };
};

export const isProductVariant = (filename1: string, filename2: string) => {
  const baseName1 = filename1.replace(
    /(-\d+|-black|-blue|-white|-green|-yellow|-beige|-red)/,
    ""
  );
  const baseName2 = filename2.replace(
    /(-\d+|-black|-blue|-white|-green|-yellow|-beige|-red)/,
    ""
  );

  return baseName1 === baseName2;
};

export const getSizesByCategory = (category: string) => {
  switch (category) {
    case "footwear":
      return ["38", "39", "40", "41", "42", "43", "44"];
    case "kids":
      return ["0-3M", "3-6M", "6-12M", "12-18M"];
    case "accessories":
    case "body_and_hair":
    case "home_and_interior":
      return ["One Size"];
    default:
      return ["S", "M", "L", "XL", "XXL"];
  }
};

export const mapToPrismaCategory = (folderCategory: string): Category => {
  const categoryMap: Record<string, Category> = {
    accessories: Category.BAGS,
    body_and_hair: Category.BAGS,
    clothing: Category.SHIRTS,
    electronics: Category.ELECTRONICS,
    footwear: Category.FOOTWEAR,
    home_and_interior: Category.BAGS,
    kids: Category.KIDS,
    tshirts: Category.SHIRTS,
  };

  return categoryMap[folderCategory] || Category.SHIRTS;
};

export const extractColorFromFilename = (filename: string) => {
  const colorPatterns = [
    { regex: /black/i, color: "black" },
    { regex: /white/i, color: "white" },
    { regex: /blue/i, color: "blue" },
    { regex: /green/i, color: "green" },
    { regex: /yellow/i, color: "yellow" },
    { regex: /red/i, color: "red" },
    { regex: /beige/i, color: "beige" },
    { regex: /brown/i, color: "brown" },
    { regex: /gray|grey/i, color: "grey" },
    { regex: /purple/i, color: "purple" },
    { regex: /pink/i, color: "pink" },
    { regex: /spiral|circles|multi/i, color: "multi" },
  ];

  for (const pattern of colorPatterns) {
    if (pattern.regex.test(filename)) {
      return [pattern.color];
    }
  }

  return ["black"];
};

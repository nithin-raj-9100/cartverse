export const navigation = {
  categories: [
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "T-Shirts",
          href: "/search/tshirts",
          imageSrc: "/images/t-shirt-color-black.png",
          imageAlt: "Spiral patterned t-shirt in multiple colors",
        },
        {
          name: "Hoodies",
          href: "/search/hoodies",
          imageSrc: "/images/hoodie-1.png",
          imageAlt: "Hoodie with dark blue and light gray stripes",
        },
      ],
      sections: [
        {
          id: "men-clothing",
          name: "Clothing",
          items: [
            { name: "T-Shirts", href: "/search/tshirts" },
            { name: "Hoodies", href: "/search/hoodies" },
            { name: "Jackets", href: "/search/jackets" },
            { name: "Shoes", href: "/search/shoes" },
          ],
        },
      ],
    },
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "Dresses",
          href: "/search/dresses",
          imageSrc: "/images/t-shirt-women-black-3-resized.jpg",
          imageAlt: "Elegant women's dress",
        },
        {
          name: "Handbags",
          href: "/search/bags",
          imageSrc: "/images/handbag-1.webp",
          imageAlt: "Stylish handbag",
        },
      ],
      sections: [
        {
          id: "women-clothing",
          name: "Clothing",
          items: [
            { name: "Dresses", href: "/search/dresses" },
            { name: "T-Shirts", href: "/search/tshirts" },
            { name: "Hoodies", href: "/search/hoodies" },
            { name: "Jackets", href: "/search/jackets" },
            { name: "Shoes", href: "/search/shoes" },
          ],
        },
      ],
    },
    {
      id: "baby",
      name: "Baby & Kids",
      featured: [
        {
          name: "Adorable Onesies",
          href: "/search/onesies",
          imageSrc: "/images/baby-onesie-beige-1.png",
          imageAlt: "Cute beige baby onesie",
        },
        {
          name: "Stylish Baby Caps",
          href: "/search/caps",
          imageSrc: "/images/baby-cap-black.png",
          imageAlt: "Black baby cap",
        },
      ],
      sections: [
        {
          id: "baby-clothing",
          name: "Clothing",
          items: [
            { name: "Onesies", href: "/search/onesies" },
            { name: "Caps", href: "/search/caps" },
          ],
        },
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      featured: [
        {
          name: "Fashionable Hats",
          href: "/search/hats",
          imageSrc: "/images/cowboy-hat-black-1.png",
          imageAlt: "Stylish cowboy hat",
        },
        {
          name: "Hand Bags",
          href: "/search/bags",
          imageSrc: "/images/handbag-1.webp",
          imageAlt: "Sleek black bag",
        },
      ],
      sections: [
        {
          id: "headwear",
          name: "Headwear",
          items: [
            { name: "Cowboy Hats", href: "/search/hats" },
            { name: "Caps", href: "/search/caps" },
          ],
        },
        {
          id: "bags-accessories",
          name: "Bags & More",
          items: [{ name: "Bags", href: "/search/bags" }],
        },
      ],
    },
  ],
};

export const categories = [
  { key: 0, name: "All" },
  { key: 1, name: "Bags" },
  { key: 2, name: "Drinkware" },
  { key: 3, name: "Electronics" },
  { key: 4, name: "Footwear" },
  { key: 5, name: "Headwear" },
  { key: 6, name: "Hoodies" },
  { key: 7, name: "Jackets" },
  { key: 8, name: "Kids" },
  { key: 9, name: "Pets" },
  { key: 10, name: "Shirts" },
  { key: 11, name: "Stickers" },
];

export const categoryToEnum: Record<string, string> = {
  All: "",
  Bags: "BAGS",
  Drinkware: "DRINKWARE",
  Electronics: "ELECTRONICS",
  Footwear: "FOOTWEAR",
  Headwear: "HEADWEAR",
  Hoodies: "HOODIES",
  Jackets: "JACKETS",
  Kids: "KIDS",
  Pets: "PETS",
  Shirts: "SHIRTS",
  Stickers: "STICKERS",
};

// export const categoryToEnum: Record<string, string> = {
//   All: "",
//   Bags: "BAGS",
//   Drinkware: "DRINKWARE",
//   Electronics: "ELECTRONICS",
//   Footwear: "FOOTWEAR",
//   Headwear: "HEADWEAR",
//   Hoodies: "HOODIES",
//   Jackets: "JACKETS",
//   Kids: "KIDS",
//   Pets: "PETS",
//   Shirts: "SHIRTS",
//   Stickers: "STICKERS",
// };

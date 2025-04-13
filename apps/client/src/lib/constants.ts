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
  { key: 1, name: "Accessories" },
  { key: 2, name: "Body & Hair" },
  { key: 3, name: "Clothing" },
  { key: 4, name: "Electronics" },
  { key: 5, name: "Footwear" },
  { key: 6, name: "Home & Interior" },
  { key: 7, name: "Kids" },
  { key: 8, name: "T-Shirts" },
];

export const categoryToEnum: Record<string, string> = {
  Accessories: "ACCESSORIES",
  "Body & Hair": "BODY_AND_HAIR",
  Clothing: "CLOTHING",
  Electronics: "ELECTRONICS",
  Footwear: "FOOTWEAR",
  "Home & Interior": "HOME_AND_INTERIOR",
  Kids: "KIDS",
  "T-Shirts": "TSHIRTS",
};

export const navigation = {
  categories: [
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "T-Shirts",
          href: "#",
          imageSrc: "/images/t-shirt-color-black.png",
          imageAlt: "Spiral patterned t-shirt in multiple colors",
        },
        {
          name: "Hoodies",
          href: "#",
          imageSrc: "/images/hoodie-1.png",
          imageAlt: "Hoodie with dark blue and light gray stripes",
        },
      ],
      sections: [
        {
          id: "men-clothing",
          name: "Clothing",
          items: [
            { name: "T-Shirts", href: "tshirts" },
            { name: "Hoodies", href: "hoodies" },
            { name: "Jackets", href: "jackets" },
            { name: "Shoes", href: "shoes" },
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
          href: "#",
          imageSrc: "/images/t-shirt-women-black-3-resized.jpg",
          imageAlt: "Elegant women's dress",
        },
        {
          name: "Handbags",
          href: "#",
          imageSrc: "/images/handbag-1.webp",
          imageAlt: "Stylish handbag",
        },
      ],
      sections: [
        {
          id: "women-clothing",
          name: "Clothing",
          items: [
            { name: "Dresses", href: "dresses" },
            { name: "T-Shirts", href: "tshirts" },
            { name: "Hoodies", href: "hoodies" },
            { name: "Jackets", href: "jackets" },
            { name: "Shoes", href: "shoes" },
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
          href: "#",
          imageSrc: "/images/baby-onesie-beige-1.png",
          imageAlt: "Cute beige baby onesie",
        },
        {
          name: "Stylish Baby Caps",
          href: "#",
          imageSrc: "/images/baby-cap-black.png",
          imageAlt: "Black baby cap",
        },
      ],
      sections: [
        {
          id: "baby-clothing",
          name: "Clothing",
          items: [
            { name: "Onesies", href: "onesies" },
            { name: "Caps", href: "caps" },
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
          href: "#",
          imageSrc: "/images/cowboy-hat-black-1.png",
          imageAlt: "Stylish cowboy hat",
        },
        {
          name: "Hand Bags",
          href: "#",
          imageSrc: "/images/handbag-1.webp",
          imageAlt: "Sleek black bag",
        },
      ],
      sections: [
        {
          id: "headwear",
          name: "Headwear",
          items: [
            { name: "Cowboy Hats", href: "hats" },
            { name: "Caps", href: "caps" },
          ],
        },
        {
          id: "bags-accessories",
          name: "Bags & More",
          items: [{ name: "Bags", href: "bags" }],
        },
      ],
    },
  ],
};

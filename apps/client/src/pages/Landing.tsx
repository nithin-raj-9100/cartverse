import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  RefreshCw,
  Shield,
  CheckCircle,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { RecentlyViewedScroll } from "@/components/Product/RecentlyViewedScroll";
import { formatCurrency } from "@/lib/utils";
import { apiRequest } from "@/lib/api-config";

const features = [
  {
    name: "Free Shipping",
    description: "Free shipping on orders over $100",
    icon: Truck,
  },
  {
    name: "30-Day Returns",
    description: "Easy returns within 30 days",
    icon: RefreshCw,
  },
  {
    name: "Secure Payments",
    description: "SSL secured checkout process",
    icon: Shield,
  },
  {
    name: "Quality Guaranteed",
    description: "Every product is thoroughly tested",
    icon: CheckCircle,
  },
];

const testimonials = [
  {
    content:
      "The quality of the products exceeded my expectations. Great service!",
    author: "Sarah Johnson",
    role: "Verified Buyer",
  },
  {
    content:
      "Fast shipping and excellent customer support. Will shop here again!",
    author: "Mike Thompson",
    role: "Verified Buyer",
  },
  {
    content: "Love the variety of products. Everything I need in one place.",
    author: "Emily Davis",
    role: "Verified Buyer",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Landing() {
  const {
    data: featuredProducts,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const response = await apiRequest("/products/featured");
      if (!response.ok) {
        throw new Error("Failed to fetch featured products");
      }
      const data = await response.json();
      return (Array.isArray(data) ? data : []).map((product) => ({
        ...product,
        rating: product.rating || Math.random() * (5 - 3.5) + 3.5,
      }));
    },
  });

  const trustLogos = [
    { src: "/logo/visa.svg", alt: "Visa Accepted" },
    { src: "/logo/stripe.svg", alt: "Stripe Secure Payments" },
    { src: "/logo/paypal.svg", alt: "PayPal Accepted" },
    { src: "/logo/google-pay.svg", alt: "Google Pay Accepted" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-black/50" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <img
            src="/hero-bg.jpg"
            alt="Shopping experience"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 flex h-full items-center">
          <div className="mx-auto max-w-4xl px-6 py-12 md:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl font-bold leading-tight text-white md:text-7xl"
              >
                Discover The <span className="text-primary">Universe</span> of
                Shopping
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="max-w-2xl text-xl text-white/90 md:text-2xl"
              >
                Premium products, unbeatable prices, and an experience you'll
                love. Join thousands of satisfied customers.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary px-8 py-6 text-lg hover:bg-primary/90"
                >
                  <Link
                    to="/products"
                    className="flex items-center justify-center"
                  >
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white bg-transparent px-8 py-6 text-lg text-white hover:bg-white/10"
                >
                  <Link
                    to="/categories"
                    className="flex items-center justify-center"
                  >
                    Browse Categories
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0.8 }}
          animate={{ y: -20, opacity: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-[20%] right-[15%] z-10 hidden lg:block"
        >
          <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0.8 }}
          animate={{ y: 20, opacity: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[30%] left-[15%] z-10 hidden lg:block"
        >
          <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
            <Heart className="h-8 w-8 text-rose-500" />
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Why Choose CartVerse
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We're committed to providing the best shopping experience with
              these guarantees.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50 p-8 text-center transition-all duration-300"
              >
                <div className="mb-6 rounded-full bg-primary/10 p-4">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-3xl font-bold md:text-4xl"
            >
              Featured Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-2xl text-gray-600"
            >
              Handpicked products that our customers love the most
            </motion.p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="mb-4 aspect-square rounded-lg bg-gray-200" />
                  <div className="mb-2 h-4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-lg border border-red-100 bg-red-50 p-10 text-center text-red-500">
              <p className="mb-2 text-lg font-medium">
                Failed to load featured products
              </p>
              <p>
                Please try again later or check our categories for more options
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {(featuredProducts || []).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="group block h-full"
                  >
                    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-primary/80">
                          {product.category}
                        </div>
                        <h3 className="mb-2 flex-grow text-lg font-semibold transition-colors group-hover:text-primary">
                          {product.name}
                        </h3>
                        <p className="mb-3 text-lg font-bold">
                          {formatCurrency(product.price)}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center text-sm text-amber-500">
                            {"★".repeat(
                              Math.min(5, Math.round(product.rating || 4)),
                            )}
                            <span className="ml-1 text-gray-500">
                              {(product.rating || 4.5).toFixed(1)}
                            </span>
                          </div>
                          <div className="rounded-lg bg-gray-50 p-2 transition-colors group-hover:bg-primary/10">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-center"
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg"
            >
              <Link to="/products" className="flex items-center">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <div className="mt-24">
            <RecentlyViewedScroll />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0 overflow-hidden opacity-50">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/5" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-3xl font-bold md:text-4xl"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-2xl text-gray-600"
            >
              Thousands of happy customers trust CartVerse for their shopping
              needs
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative rounded-xl bg-gray-50 p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="absolute -right-4 -top-4 rounded-full bg-primary/10 p-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M10 11L7 16H9.5C10.3284 16 11 16.6716 11 17.5V19.5C11 20.3284 10.3284 21 9.5 21H6.5C5.67157 21 5 20.3284 5 19.5V17.5L8 11H5.5C4.67157 11 4 10.3284 4 9.5V5.5C4 4.67157 4.67157 4 5.5 4H9.5C10.3284 4 11 4.67157 11 5.5V9.5C11 10.3284 10.3284 11 9.5 11H10ZM20 11L17 16H19.5C20.3284 16 21 16.6716 21 17.5V19.5C21 20.3284 20.3284 21 19.5 21H16.5C15.6716 21 15 20.3284 15 19.5V17.5L18 11H15.5C14.6716 11 14 10.3284 14 9.5V5.5C14 4.67157 14.6716 4 15.5 4H19.5C20.3284 4 21 4.67157 21 5.5V9.5C21 10.3284 20.3284 11 19.5 11H20Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div className="mb-6 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-semibold text-gray-600">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-bold">{testimonial.author}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                <p className="mb-4 italic text-gray-700">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="mt-4 flex items-center justify-end text-amber-500">
                  {"★".repeat(5)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="to-primary-dark bg-gradient-to-r from-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
            <div className="max-w-xl">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-4 text-3xl font-bold md:text-4xl"
              >
                Join Our Community
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 text-lg text-white/90"
              >
                Subscribe to our newsletter and be the first to know about new
                products, exclusive offers, and shopping tips.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
                className="mb-8 space-y-3"
              >
                {[
                  "Weekly exclusive offers and discounts",
                  "New product announcements",
                  "Seasonal shopping guides and tips",
                  "Early access to sales and events",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-white/80" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-lg backdrop-blur-sm"
            >
              <h3 className="mb-6 text-center text-xl font-semibold">
                Subscribe to Our Newsletter
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Full Name for Newsletter"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email address"
                    className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                    aria-label="Email Address for Newsletter"
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-6 w-full bg-white py-6 text-lg font-medium text-primary hover:bg-white/90"
                >
                  Subscribe Now
                </Button>
                <p className="mt-4 text-center text-xs text-white/70">
                  By subscribing, you agree to our Privacy Policy and Terms of
                  Service.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Trusted By Leading Brands and Payment Providers
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-10 md:gap-16"
          >
            {trustLogos.map((logo, index) => (
              <motion.div
                key={logo.alt}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 w-auto lg:h-12"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-6 rounded-full bg-gray-50 px-6 py-3 shadow-sm">
              <div className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Secure Payments</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5 text-primary" />
                <span className="text-sm font-medium">30-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  RefreshCw,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

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

export default function Landing() {
  const {
    data: featuredProducts,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/products/featured");
      if (!response.ok) {
        throw new Error("Failed to fetch featured products");
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative flex h-[80vh] items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black/50" />
          <img
            src="/hero-bg.jpg"
            alt="Shopping experience"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-20 mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-5xl font-bold md:text-6xl"
          >
            Welcome to CartVerse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-xl md:text-2xl"
          >
            Discover a universe of amazing products at unbeatable prices
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Shop with Us
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex flex-col items-center rounded-lg p-6 text-center transition-shadow hover:shadow-lg"
              >
                <feature.icon className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Featured Products
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-lg bg-white p-4 shadow-md"
                >
                  <div className="mb-4 aspect-square bg-gray-200" />
                  <div className="mb-2 h-4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center text-red-500">
              Failed to load featured products. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {(featuredProducts || []).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-semibold">
                        {product.name}
                      </h3>
                      <p className="mb-2 text-gray-600">${product.price}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {product.category}
                        </span>
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="mb-4 text-gray-600">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-8">
            Get updates about new products and special offers
          </p>
          <form className="mx-auto flex max-w-md gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg px-4 py-2 text-gray-900"
            />
            <Button variant="secondary">Subscribe</Button>
          </form>
        </div>
      </section>

      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <img
              src="/trust-badge-1.jpg"
              alt="Trust Badge"
              className="h-12 w-auto"
            />
            <img
              src="/trust-badge-1.jpg"
              alt="Trust Badge"
              className="h-12 w-auto"
            />
            <img
              src="/trust-badge-1.jpg"
              alt="Trust Badge"
              className="h-12 w-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

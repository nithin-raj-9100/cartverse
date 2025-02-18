import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import ProductGrid from "@/components/Product/ProductGrid";
import { getProducts } from "@/api/products";
import { Loader2 } from "lucide-react";

const Home = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Featured Products
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Check out our latest collection
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            View all products
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </div>
    </div>
  );
};

export default Home;

import { useQuery } from "@tanstack/react-query";
import ProductGrid from "@/components/Product/ProductGrid";
import { getProducts } from "@/api/products";
import { Loader2 } from "lucide-react";

const ProductListPage = () => {
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

  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-6 text-2xl font-bold">All Products</h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductListPage;

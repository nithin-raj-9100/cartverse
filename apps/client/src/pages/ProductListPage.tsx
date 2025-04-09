import { useState } from "react";
import ProductGrid from "@/components/Product/ProductGrid";
import { Loader2 } from "lucide-react";
import { getProducts, GetProductsParams } from "@/api/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Product } from "@/types";

const ProductListPage = () => {
  const [sortOption, setSortOption] = useState<string>("newest");
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["products", "infinite", sortOption],
    queryFn: async ({ pageParam = 0 }) => {
      const params: GetProductsParams = {
        offset: pageParam,
        limit: 12,
        sort: sortOption,
      };
      return getProducts(params);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination.hasMore) {
        return undefined;
      }
      return lastPage.pagination.offset + lastPage.pagination.limit;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("Loading more products...");
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const products: Product[] =
    data?.pages.flatMap((page) => page.products) || [];
  const totalProducts = data?.pages[0]?.pagination.total || 0;

  if (isLoading && products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort By:</span>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="rounded border p-1 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
              <option value="rating_desc">Highest Rated</option>
            </select>
          </div>
        </div>

        {products.length > 0 && (
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              Showing {products.length} of {totalProducts} products
            </span>
          </div>
        )}

        <ProductGrid products={products} />

        <div ref={loadMoreRef} className="mt-8 flex justify-center py-4">
          {isFetchingNextPage && (
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;

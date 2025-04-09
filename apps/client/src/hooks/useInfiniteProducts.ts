import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback } from "react";
import { getProducts, GetProductsParams } from "@/api/products";
import { Product } from "@/types";

export function useInfiniteProducts(
  initialParams?: Omit<GetProductsParams, "offset">,
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", "infinite", initialParams],
    queryFn: async ({ pageParam = 0 }) => {
      const params: GetProductsParams = {
        ...initialParams,
        offset: pageParam,
        limit: initialParams?.limit || 12,
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
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pagination.offset === 0) {
        return undefined;
      }
      return Math.max(
        0,
        firstPage.pagination.offset - firstPage.pagination.limit,
      );
    },
  });

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (
              entries[0].isIntersecting &&
              hasNextPage &&
              !isFetchingNextPage
            ) {
              console.log("Loading more products...");
              fetchNextPage();
            }
          },
          { threshold: 0.01, rootMargin: "100px" },
        );

        observerRef.current.observe(node);
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  const products: Product[] =
    data?.pages.flatMap((page) => page.products) || [];
  const totalProducts = data?.pages[0]?.pagination.total || 0;

  return {
    products,
    totalProducts,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
  };
}

import { useQuery } from "@tanstack/react-query";
import { categoryToEnum } from "@/lib/constants";
import { useDebounce } from "use-debounce";
import { apiRequest } from "@/lib/api-config";

export interface ProductSearchParams {
  searchTerm: string | null;
  collection?: string | null;
  sortBy?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  minRating?: string | null;
  colors?: string[] | null;
  sizes?: string[] | null;
}

export const useProductsSearchQuery = ({
  searchTerm,
  collection,
  sortBy,
  minPrice,
  maxPrice,
  minRating,
  colors,
  sizes,
}: ProductSearchParams) => {
  const [debouncedMinPrice] = useDebounce(minPrice, 800);
  const [debouncedMaxPrice] = useDebounce(maxPrice, 800);

  return useQuery({
    queryKey: [
      "products",
      "search",
      searchTerm,
      collection,
      sortBy,
      debouncedMinPrice,
      debouncedMaxPrice,
      minRating,
      colors,
      sizes,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);

      if (collection && collection !== "All") {
        const categoryValue = categoryToEnum[collection] || collection;
        params.append("category", categoryValue);
      }

      if (sortBy) params.append("sort", sortBy);

      if (debouncedMinPrice) params.append("minPrice", debouncedMinPrice);

      if (debouncedMaxPrice) params.append("maxPrice", debouncedMaxPrice);

      if (minRating) params.append("minRating", minRating);

      if (colors && colors.length > 0) {
        params.append("colors", colors.join(","));
      }

      if (sizes && sizes.length > 0) {
        params.append("sizes", sizes.join(","));
      }

      const res = await apiRequest(`/products/search?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return data;
    },
    enabled: true,
    staleTime: 30000,
  });
};

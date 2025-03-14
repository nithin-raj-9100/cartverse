import { useQuery } from "@tanstack/react-query";
import { categoryToEnum } from "@/lib/constants";

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
  return useQuery({
    queryKey: [
      "products",
      "search",
      searchTerm,
      collection,
      sortBy,
      minPrice,
      maxPrice,
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

      if (minPrice) params.append("minPrice", minPrice);

      if (maxPrice) params.append("maxPrice", maxPrice);

      if (minRating) params.append("minRating", minRating);

      if (colors && colors.length > 0) {
        params.append("colors", colors.join(","));
      }

      if (sizes && sizes.length > 0) {
        params.append("sizes", sizes.join(","));
      }

      const url = `http://localhost:4000/products/search?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return data;
    },
    enabled: true,
  });
};

import { useQuery } from "@tanstack/react-query";
import { categoryToEnum } from "@/lib/constants";

export interface ProductSearchParams {
  searchTerm: string | null;
  collection?: string | null;
  sortBy?: string | null;
}

export const useProductsSearchQuery = ({
  searchTerm,
  collection,
  sortBy,
}: ProductSearchParams) => {
  return useQuery({
    queryKey: ["products", "search", searchTerm, collection, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);

      if (collection && collection !== "All") {
        const categoryValue = categoryToEnum[collection] || collection;
        params.append("category", categoryValue);
      }

      if (sortBy) params.append("sort", sortBy);

      const url = `http://localhost:4000/products/search?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
    enabled: !!searchTerm,
  });
};

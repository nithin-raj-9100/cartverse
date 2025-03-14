import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/slices/auth";
import { useMemo } from "react";

export const useRecentlyViewedProducts = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const userId = useMemo(() => user?.id, [user?.id]);

  const addToRecentlyViewed = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) return null;

      const response = await fetch(
        "http://localhost:4000/products/recently-viewed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            productId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add to recently viewed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentlyViewed", userId] });
    },
  });

  const recentlyViewedQuery = useQuery({
    queryKey: ["recentlyViewed", user?.id, user],

    queryFn: async () => {
      if (!user) return [];

      const response = await fetch(
        `http://localhost:4000/products/recently-viewed/${user.id}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recently viewed products");
      }

      return response.json();
    },
    enabled: !!user,
  });

  return {
    addToRecentlyViewed,
    recentlyViewedProducts: recentlyViewedQuery.data || [],
    isLoading: recentlyViewedQuery.isLoading,
    error: recentlyViewedQuery.error,
  };
};

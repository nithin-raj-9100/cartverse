import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedState {
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      recentlyViewed: [],

      addToRecentlyViewed: (productId) => {
        set((state) => {
          const filteredItems = state.recentlyViewed.filter(
            (id) => id !== productId,
          );

          return {
            recentlyViewed: [productId, ...filteredItems].slice(0, 10),
          };
        });
      },

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] });
      },
    }),
    {
      name: "cartverse-recently-viewed",
    },
  ),
);

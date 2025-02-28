import { create } from "zustand";

interface CartState {
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

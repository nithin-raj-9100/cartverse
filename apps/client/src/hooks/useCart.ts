import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "@/store/useCartStore";

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface CartResponse {
  cartItems: CartItem[];
  itemCount: number;
  totalQuantity: number;
  totalAmount: number;
}

const API_URL = "http://localhost:4000";

export function useCartQuery() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async (): Promise<CartResponse> => {
      const response = await fetch(`${API_URL}/cart`, {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          return {
            cartItems: [],
            itemCount: 0,
            totalQuantity: 0,
            totalAmount: 0,
          };
        }
        throw new Error("Failed to fetch cart");
      }

      return response.json();
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { setCartOpen } = useCartStore();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setCartOpen(true);
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to remove cart item");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/cart`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

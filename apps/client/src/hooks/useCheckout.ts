import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useCartStore } from "@/store/useCartStore";

const API_URL = "http://localhost:4000";

export interface CheckoutData {
  email: string;
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  company?: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  sameAsBilling: boolean;
  billingCompany?: string;
  billingAddress?: string;
  billingApartment?: string;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
}

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setCartOpen } = useCartStore();

  return useMutation({
    mutationFn: async (data: CheckoutData) => {
      const response = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to process checkout");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setCartOpen(false);
      navigate("/checkout/success");
    },
  });
}

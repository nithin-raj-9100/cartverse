import { useMutation } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const API_URL = "http://localhost:4000";

export function useStripeCheckout() {
  return useMutation({
    mutationFn: async (
      cartItems: Array<{ productId: string; quantity: number }>,
    ) => {
      const response = await fetch(`${API_URL}/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ items: cartItems }),
      });

      console.log(`Checkout response status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Checkout error:", errorData);

        if (response.status === 401) {
          toast.error("Authentication required. Please sign in again.");
          throw new Error("Authentication required");
        }

        if (errorData.details && errorData.solution) {
          toast.error(errorData.message);
          console.warn(errorData.solution);
          throw new Error(errorData.message);
        }

        throw new Error(
          errorData.message || "Failed to create checkout session",
        );
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error("No checkout URL returned");
      }

      // if (url.includes("/checkout/success?session_id=mock_")) {
      //   toast.success("Using mock checkout for development", {
      //     duration: 3000,
      //     icon: "🧪",
      //   });
      // }

      window.location.href = url;
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Checkout failed");
    },
  });
}

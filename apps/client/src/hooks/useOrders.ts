import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types/index";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { apiRequest } from "@/lib/api-config";

export function useOrdersQuery() {
  const navigate = useNavigate();

  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const response = await apiRequest("/orders");

        if (response.status === 401) {
          toast.error("Please login to view your orders");
          navigate("/login");
          throw new Error("Authentication required");
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Orders API error:", errorData);
          throw new Error(errorData.message || "Failed to fetch orders");
        }

        return response.json();
      } catch (error) {
        console.error("Orders fetch error:", error);
        throw error;
      }
    },
    retry: (failureCount, error) => {
      if (error.message === "Authentication required") {
        return false;
      }
      return failureCount < 3;
    },
  });
}

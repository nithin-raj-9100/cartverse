import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-config";

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await apiRequest("/auth");
      return response.json();
    },
  });
}

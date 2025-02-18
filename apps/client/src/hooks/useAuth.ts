import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/auth", {
        credentials: "include",
      });
      return response.json();
    },
  });
}

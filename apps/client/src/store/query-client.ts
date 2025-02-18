import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      staleTime: (query) => {
        if (query.queryKey[0] === "product") {
          return 1000 * 60 * 5;
        }
        return 0;
      },
    },
    mutations: {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message, {
            duration: 3000,
            position: "top-center",
          });
        }
      },
    },
  },
});

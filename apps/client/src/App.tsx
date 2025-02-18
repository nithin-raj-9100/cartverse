import "./index.css";
import { Outlet, ScrollRestoration } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./store/query-client";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname.startsWith("/product/")
            ? location.pathname
            : location.key;
        }}
      />
      <Outlet />
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4aed88",
              secondary: "#fff",
            },
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

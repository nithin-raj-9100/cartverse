import { Outlet } from "react-router";
import Header from "@/components/Header";
import Footer from "@/pages/Footer";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { apiRequest } from "@/lib/api-config";

const Layout = () => {
  const { data, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await apiRequest("/auth");
      return response.json();
    },
  });

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <Header data={data || { status: "unauthenticated", user: null }} />
        <main className="container mx-auto flex-1 px-4">
          <Outlet />
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </SidebarProvider>
  );
};

export default Layout;

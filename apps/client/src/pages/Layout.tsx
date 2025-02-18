import { Outlet } from "react-router";
import Header from "@/components/Header";
import Footer from "@/pages/Footer";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Layout = () => {
  const { data, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/auth", {
        credentials: "include",
      });
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
    <div className="flex min-h-screen flex-col">
      <Header data={data || { status: "unauthenticated", user: null }} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

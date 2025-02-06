import { Outlet } from "react-router";
import Header from "@/components/Header";
import Footer from "@/pages/Footer";
import { useQuery } from "@tanstack/react-query";

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

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header data={data || { status: "unauthenticated", user: null }} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

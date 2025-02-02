import Header from "@/components/Header";
import { Navbar } from "@/components/Navigation";
import ProductGrid from "@/components/ProductGrid";
import { SkeletonCard } from "@/components/Skeleton";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  // the below query should be in another file but for simplicity I have added it here
  const { data, error, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/auth", {
        credentials: "include",
      });
      const data = await response.json();
      console.log("data is ", data);

      return data;
    },
  });

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* <Navbar /> */}
      <Header />
      {/* <ProductGrid /> */}

      {data && data.status === "authenticated" ? (
        <p>User is authenticated</p>
      ) : (
        <p>User is not authenticated</p>
      )}
    </div>
  );
};
export default Home;

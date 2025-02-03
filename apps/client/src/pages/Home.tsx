import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";

const Home = () => {
  const { data, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/auth", {
        credentials: "include",
      });
      return response.json();
    },
  });

  console.log("data", data);

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <Header data={data || { status: "unauthenticated", user: null }} />
    </div>
  );
};

export default Home;

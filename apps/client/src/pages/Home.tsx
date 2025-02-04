import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";

const Home = () => {
  // this is be extracted in to a custom hook of useAuth
  // Also should add types for the data object

  // const { data, isPending } = useQuery({
  //   queryKey: ["auth"],
  //   queryFn: async () => {
  //     const response = await fetch("http://localhost:4000/auth", {
  //       credentials: "include",
  //     });
  //     return response.json();
  //   },
  // });

  // console.log("data", data);

  // if (isPending) return <div>Loading...</div>;

  const jsonData = [
    {
      id: 1,
      path: "/images/t-shirt-circles-black.png",
    },
    {
      id: 2,
      path: "/images/t-shirt-circles-blue.png",
    },
    {
      id: 3,
      path: "/images/t-shirt-color-black.png",
    },
    {
      id: 4,
      path: "/images/t-shirt-color-white.png",
    },
    {
      id: 6,
      path: "/images/t-shirt-spiral-3.png",
    },
    {
      id: 7,
      path: "/images/t-shirt-spiral-4.png",
    },
  ];

  return (
    <div>
      <div className="container mx-auto">
        <div className="grid px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {jsonData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.path}
                alt="t-shirt"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

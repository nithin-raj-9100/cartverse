import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

// Protected Route Component
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/auth", {
        credentials: "include",
      });
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (data?.status === "authenticated") {
    navigate("/");
    return null;
  }

  return <>{children}</>;
};

export default AuthRoute;

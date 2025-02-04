import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

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

  console.log("data is", data);

  if (isLoading) return <div>Loading...</div>;

  useEffect(() => {
    if (data?.status === "authenticated") {
      navigate("/", { replace: true });
    }
  }, [data, navigate]);

  useEffect(() => {
    if (data?.status === "unauthenticated") {
      navigate("/login");
    }
  }, [data, navigate]);

  if (data?.status === "authenticated") {
    return null;
  }

  return <>{children}</>;
};

export default AuthRoute;

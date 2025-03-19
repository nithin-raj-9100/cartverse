import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useEffect } from "react";

interface AuthRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthRoute = ({ children, requireAuth = false }: AuthRouteProps) => {
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

  const isAuthenticated = data?.status === "authenticated";

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        navigate("/login", { replace: true });
      }
      if (!requireAuth && isAuthenticated) {
        navigate("/", { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, navigate, requireAuth]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthRoute;

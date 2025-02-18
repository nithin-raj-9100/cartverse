import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

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

  if (isLoading) return <div>Loading...</div>;

  const isAuthenticated = data?.status === "authenticated";

  if (requireAuth && !isAuthenticated) {
    navigate("/login", { replace: true });
  }

  if (!requireAuth && isAuthenticated) {
    navigate("/", { replace: true });
  }

  // useEffect(() => {
  //   if (data?.status === "authenticated") {
  //     navigate("/", { replace: true });
  //   }
  // }, [data, navigate]);

  // useEffect(() => {
  //   if (data?.status === "unauthenticated") {
  //     navigate("/login");
  //   }
  // }, [data, navigate]);

  // if (data?.status === "authenticated") {
  //   return null;
  // }

  return <>{children}</>;
};

export default AuthRoute;

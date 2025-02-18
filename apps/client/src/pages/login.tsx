import { LoginForm } from "@/components/login-form";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
// import { SkeletonCard } from "@/components/Skeleton";

export default function Login() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  // const { data: authData, isLoading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/auth", {
        credentials: "include",
      });
      const data = await response.json();
      if (data?.status === "authenticated") {
        navigate("/");
      }
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (data?.status !== "authenticated") {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <img
              alt="CartVerse Logo"
              src="/logo/logo.png"
              className="h-12 w-auto"
            />
          </Link>
          {error === "github-auth-failed" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                GitHub authentication failed. Please try again.
              </AlertDescription>
            </Alert>
          )}
          <LoginForm />
        </div>
      </div>
    );
  }

  return null;
}

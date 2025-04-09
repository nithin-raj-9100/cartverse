import { SignupForm } from "@/components/signup-form";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { SkeletonCard } from "@/components/Skeleton";
import { apiRequest } from "@/lib/api-config";

export default function Signup() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await apiRequest("/auth");
      const data = await response.json();
      if (data?.status === "authenticated") {
        navigate("/");
      }
      return data;
    },
  });

  if (isLoading) {
    return <SkeletonCard />;
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
              src="logo1.webp"
              className="h-12 w-auto"
            />
          </Link>
          <SignupForm />
        </div>
      </div>
    );
  }

  return null;
}

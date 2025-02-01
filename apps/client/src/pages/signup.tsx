import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "@/components/signup-form";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { SkeletonCard } from "@/components/Skeleton";

export default function Signup() {
  const navigate = useNavigate();

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
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            CartVerse
          </Link>
          <SignupForm />
        </div>
      </div>
    );
  }

  return null;
}

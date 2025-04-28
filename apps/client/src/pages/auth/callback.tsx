import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/slices/auth";
import { apiRequest } from "@/lib/api-config";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) {
      return;
    }
    processed.current = true;

    const handleCallback = async () => {
      try {
        let user;

        if (location.hash && location.hash.includes("access_token")) {
          const { data: sessionData, error: sessionError } =
            await supabase.auth.getSession();

          if (sessionError) {
            throw sessionError;
          }

          if (!sessionData.session || !sessionData.session.user) {
            throw new Error(
              "No session or user found after hash authentication",
            );
          }

          user = sessionData.session.user;
        } else {
          const code = searchParams.get("code");

          if (!code) {
            setError("No authentication code or token found in URL");
            return;
          }

          const { data, error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            throw exchangeError;
          }

          if (!data.session || !data.user) {
            throw new Error("No session or user found after code exchange");
          }

          user = data.user;
        }

        const { id, email, user_metadata } = user;
        const name =
          user_metadata?.full_name ||
          user_metadata?.name ||
          email?.split("@")[0] ||
          "User";

        const response = await apiRequest("/auth/oauth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            email,
            name,
            provider: user.app_metadata.provider,
            providerAccountId:
              user.identities?.[0]?.identity_data?.sub || user.id,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to register user in backend",
          );
        }

        const userData = await response.json();

        login(userData.user, userData.sessionId);

        queryClient.invalidateQueries({ queryKey: ["auth"] });

        navigate("/", { replace: true });
      } catch (err) {
        console.error("Error during OAuth callback:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
        toast.error("Authentication failed. Please try again.");
      }
    };

    handleCallback();
  }, [location.hash, login, navigate, queryClient, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 text-red-500">Error: {error}</div>
        <button
          onClick={() => navigate("/login")}
          className="rounded-md bg-primary px-4 py-2 text-white"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader2 className="mb-4 h-8 w-8 animate-spin" />
      <p>Completing authentication, please wait...</p>
    </div>
  );
}

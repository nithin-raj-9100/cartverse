import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/api";
import { login } from "@/lib/api";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/slices/auth";
import { useAddToCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { OAuthButtons } from "./oauth-buttons";
import { Separator } from "./ui/separator";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login: loginStore } = useAuthStore();
  const { mutate: addToCart } = useAddToCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      login({
        email: form.email,
        password: form.password,
      })
        .then((loginData) => {
          loginStore(loginData.user, loginData.user.id);
          queryClient.invalidateQueries({ queryKey: ["auth"] });

          const pendingCart = localStorage.getItem("pendingCart");
          if (pendingCart) {
            try {
              const cartItems = JSON.parse(pendingCart);
              if (Array.isArray(cartItems) && cartItems.length > 0) {
                toast.success("Adding your items to cart...", {
                  duration: 3000,
                });

                cartItems.forEach((item) => {
                  addToCart({
                    productId: item.productId,
                    quantity: item.quantity,
                  });
                });

                localStorage.removeItem("pendingCart");
              }
            } catch (error) {
              console.error("Error processing pending cart:", error);
            }
          }

          const buyNowProduct = localStorage.getItem("buyNowProduct");
          if (buyNowProduct) {
            try {
              const product = JSON.parse(buyNowProduct);
              if (product && product.productId) {
                toast.success("Taking you to checkout...", { duration: 3000 });

                setTimeout(() => {
                  navigate(
                    `/checkout?product=${product.productId}&quantity=${product.quantity || 1}`,
                  );
                }, 500);

                localStorage.removeItem("buyNowProduct");
                return;
              }
            } catch (error) {
              console.error("Error processing buy now product:", error);
            }
          }

          if (pendingCart) {
            navigate("/checkout");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Auto login after signup failed:", error);
          toast.success("Account created! Please log in to continue.");
          navigate("/login");
        });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create account");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutation.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    onChange={handleChange}
                    value={form.name}
                    name="name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={handleChange}
                    value={form.email}
                    disabled={mutation.isPending}
                    name="email"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={handleChange}
                    value={form.password}
                    disabled={mutation.isPending}
                    name="password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    onChange={handleChange}
                    value={form.confirmPassword}
                    disabled={mutation.isPending}
                    name="confirmPassword"
                  />
                </div>

                {mutation.isError && (
                  <div className="text-sm text-red-500">
                    {mutation.error.message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full"
                >
                  {mutation.isPending ? "Signing up..." : "Sign up"}
                </Button>
              </div>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <OAuthButtons />

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

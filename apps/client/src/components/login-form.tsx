import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/lib/api";
import { useAuthStore } from "@/store/slices/auth";
import { useAddToCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { OAuthButtons } from "./oauth-buttons";
import { Separator } from "./ui/separator";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login: loginStore } = useAuthStore();
  const queryClient = useQueryClient();
  const { mutate: addToCart } = useAddToCart();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginStore(data.user, data.user.id);
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      const pendingCart = localStorage.getItem("pendingCart");
      if (pendingCart) {
        try {
          const cartItems = JSON.parse(pendingCart);
          if (Array.isArray(cartItems) && cartItems.length > 0) {
            toast.success("Restoring your cart items...", { duration: 3000 });

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

      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to login");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      email: form.email,
      password: form.password,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={handleChange}
                    value={form.email}
                    name="email"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={handleChange}
                    value={form.password}
                    name="password"
                    disabled={mutation.isPending}
                  />
                </div>

                {mutation.isError && (
                  <div className="text-sm text-red-500">
                    {mutation.error.message}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Logging in..." : "Login"}
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
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

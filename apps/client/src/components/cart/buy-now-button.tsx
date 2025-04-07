import { Button, ButtonProps } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface BuyNowButtonProps extends Omit<ButtonProps, "onClick"> {
  productId: string;
  quantity?: number;
}

export function BuyNowButton({
  productId,
  quantity = 1,
  children = "Buy Now",
  ...props
}: BuyNowButtonProps) {
  const navigate = useNavigate();
  const { data: authData } = useAuth();
  const isAuthenticated = authData?.status === "authenticated";
  const [isPending, setIsPending] = useState(false);

  const handleBuyNow = () => {
    setIsPending(true);

    if (!isAuthenticated) {
      localStorage.setItem(
        "buyNowProduct",
        JSON.stringify({
          productId,
          quantity,
        }),
      );

      toast.error("Please sign up or log in to complete your purchase", {
        duration: 5000,
        icon: "🔐",
      });

      navigate("/signup");
      setIsPending(false);
      return;
    }

    navigate(`/checkout?product=${productId}&quantity=${quantity}`);
    setIsPending(false);
  };

  return (
    <Button
      onClick={handleBuyNow}
      className="bg-gray-900 text-white hover:bg-gray-800"
      disabled={isPending}
      {...props}
    >
      {isPending ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" /> {children}
        </>
      )}
    </Button>
  );
}

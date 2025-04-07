import { Button, ButtonProps } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

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
  const handleBuyNow = () => {
    window.location.href = `/checkout?product=${productId}&quantity=${quantity}`;
  };

  return (
    <Button
      onClick={handleBuyNow}
      className="bg-gray-900 text-white hover:bg-gray-800"
      {...props}
    >
      <CreditCard className="mr-2 h-4 w-4" /> {children}
    </Button>
  );
}

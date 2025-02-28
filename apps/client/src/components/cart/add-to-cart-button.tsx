import { useState } from "react";
import { useAddToCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/useCartStore";
import { Button, ButtonProps } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  productId: string;
  quantity?: number;
}

export function AddToCartButton({
  productId,
  quantity = 1,
  children = "Add to Cart",
  ...props
}: AddToCartButtonProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: addToCart, isPending } = useAddToCart();
  const { setCartOpen } = useCartStore();

  const handleAddToCart = () => {
    addToCart(
      { productId, quantity },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setCartOpen(true);
          setTimeout(() => setShowSuccess(false), 2000);
        },
      },
    );
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isPending || showSuccess}
      {...props}
    >
      {showSuccess ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Added
        </>
      ) : isPending ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> {children}
        </>
      )}
    </Button>
  );
}

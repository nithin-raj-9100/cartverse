import { useCartStore } from "@/store/useCartStore";
import { useCartQuery } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function CartIcon() {
  const { setCartOpen } = useCartStore();
  const { data: cart } = useCartQuery();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setCartOpen(true)}
      className="relative"
      aria-label="Open cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {cart?.totalQuantity ? (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          {cart.totalQuantity > 99 ? "99+" : cart.totalQuantity}
        </span>
      ) : null}
    </Button>
  );
}

import { useCartStore } from "@/store/useCartStore";
import { useCartQuery, useClearCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartItem } from "./cart-item";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetPortal,
} from "@/components/ui/sheet";

export function CartSidebar() {
  const isMobile = useIsMobile();
  const { isCartOpen, setCartOpen } = useCartStore();
  const { data: cart, isLoading, isError } = useCartQuery();
  const { mutate: clearCart, isPending: isClearing } = useClearCart();

  const safeCart = cart || {
    cartItems: [],
    itemCount: 0,
    totalQuantity: 0,
    totalAmount: 0,
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetPortal>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className="fixed inset-y-0 right-0 flex w-full flex-col border-l bg-background p-0 shadow-lg sm:max-w-md"
        >
          <SheetHeader className="flex flex-row items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <SheetTitle>Your Cart</SheetTitle>
              {safeCart.totalQuantity > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  {safeCart.totalQuantity}
                </span>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="space-y-4 p-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-20 w-20 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-1/3" />
                      <div className="flex justify-between">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                <p className="text-muted-foreground">
                  Something went wrong. Please try again.
                </p>
              </div>
            ) : safeCart.cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                <ShoppingCart className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4 divide-y p-4">
                {safeCart.cartItems.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            )}
          </div>

          {safeCart.cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(safeCart.totalAmount)}</span>
                </div>

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(safeCart.totalAmount)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearCart()}
                    disabled={isClearing}
                    className="flex items-center gap-1"
                  >
                    {isClearing ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Clear Cart
                  </Button>
                  <Button size="sm">Checkout</Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}

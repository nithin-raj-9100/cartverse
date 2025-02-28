import { Minus, Plus, Trash } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  useUpdateCartItem,
  useRemoveCartItem,
  type CartItem as CartItemType,
} from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { mutate: updateItem, isPending: isUpdating } = useUpdateCartItem();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.productId);
    } else {
      updateItem({ productId: item.productId, quantity: newQuantity });
    }
  };

  return (
    <div className="flex gap-3 py-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
        <img src={item.image} alt={item.name} className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="line-clamp-1 font-medium">{item.name}</h3>
              </TooltipTrigger>
              <TooltipContent side="top">{item.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.productId)}
            disabled={isRemoving}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          {formatCurrency(item.price)}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-r-none"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={isUpdating || isRemoving}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>

            <span className="flex w-8 items-center justify-center text-sm font-medium">
              {isUpdating ? "..." : item.quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-l-none"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={isUpdating || isRemoving}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <div className="font-medium">
            {formatCurrency(item.price * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}

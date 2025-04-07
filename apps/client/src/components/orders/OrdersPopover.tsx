import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOrdersQuery } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/slices/auth";
import { formatCurrency } from "@/lib/utils";

export function OrdersPopover() {
  const { isAuthenticated } = useAuthStore();
  const { data: orders, isLoading, error } = useOrdersQuery();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Package className="h-5 w-5" />
          {orders && orders.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {orders.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-4">
          <h4 className="font-semibold">Your Orders</h4>
          <Link to="/orders" className="text-xs hover:text-foreground">
            View all
          </Link>
        </div>
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="space-y-4 p-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-12 w-12" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
            </div>
          ) : error ? (
            <div className="p-4 text-center">
              <p className="text-sm text-destructive">Error loading orders</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => (window.location.href = "/login")}
              >
                Sign in again
              </Button>
            </div>
          ) : !orders?.length ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No orders yet
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {orders.map((order) => (
                <div key={order.id} className="rounded-lg p-2 hover:bg-accent">
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-background">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">
                        Order #{order.id.substring(0, 8)}...
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(order.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                      <p className="mt-1 text-xs">
                        {order.orderItems.length} items •
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex -space-x-2 overflow-hidden pl-12">
                    {order.orderItems.slice(0, 4).map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.productId}`}
                        className="inline-block h-6 w-6 rounded-full border border-white ring-2 ring-white hover:z-10 hover:ring-primary/50"
                      >
                        {item.product?.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-[8px]">
                            {item.product?.name?.charAt(0) || "P"}
                          </div>
                        )}
                      </Link>
                    ))}
                    {order.orderItems.length > 4 && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-[8px] font-medium ring-2 ring-white">
                        +{order.orderItems.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

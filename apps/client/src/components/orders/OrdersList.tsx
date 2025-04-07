import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Package,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

// [ ] Internal Imports
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOrdersQuery } from "@/hooks/useOrders";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

export function OrdersList() {
  const { data: orders, isLoading, error } = useOrdersQuery();
  const navigate = useNavigate();
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {},
  );

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "CANCELLED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    const isAuthError = (error as Error)?.message?.includes("Authentication");

    return (
      <div className="py-4">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading orders</AlertTitle>
          <AlertDescription>
            {isAuthError
              ? "You need to be logged in to view your orders."
              : "We couldn't load your orders. Please try again later."}
          </AlertDescription>
        </Alert>

        <div className="flex justify-center">
          {isAuthError ? (
            <Button onClick={() => navigate("/login")}>Sign In</Button>
          ) : (
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          )}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="mb-4 text-muted-foreground">
          You haven't placed any orders yet
        </p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-6">
        {orders.map((order) => (
          <Collapsible
            key={order.id}
            open={expandedOrders[order.id]}
            onOpenChange={() => toggleOrderExpansion(order.id)}
            className="w-full"
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    Order #{order.id.substring(0, 8)}...
                  </CardTitle>
                  <Badge variant={getBadgeVariant(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(order.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      {order.orderItems.length} item(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex w-full items-center justify-center"
                  >
                    {expandedOrders[order.id] ? (
                      <>
                        Hide details <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        View items <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </CardFooter>

              <CollapsibleContent>
                <div className="px-6 pb-4">
                  <div className="rounded-md border bg-card">
                    <div className="border-b bg-muted/50 px-4 py-2 text-sm font-medium">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Total</div>
                      </div>
                    </div>

                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="border-b px-4 py-3 text-sm last:border-0"
                      >
                        <div className="grid grid-cols-12 items-center gap-4">
                          <div className="col-span-6">
                            <Link
                              to={`/product/${item.productId}`}
                              className="group flex items-center hover:underline"
                            >
                              <div className="mr-2 h-10 w-10 flex-shrink-0 overflow-hidden rounded border">
                                {item.product?.imageUrl ? (
                                  <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                    <span className="text-xs text-gray-500">
                                      No image
                                    </span>
                                  </div>
                                )}
                              </div>
                              <span className="truncate font-medium transition-colors group-hover:text-primary">
                                {item.product.name}
                              </span>
                            </Link>
                          </div>
                          <div className="col-span-2 text-center">
                            {formatCurrency(item.price)}
                          </div>
                          <div className="col-span-2 text-center">
                            {item.quantity}
                          </div>
                          <div className="col-span-2 text-right font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between border-t bg-muted/30 px-4 py-3">
                      <span className="font-medium">Total</span>
                      <span className="font-semibold">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </ScrollArea>
  );
}

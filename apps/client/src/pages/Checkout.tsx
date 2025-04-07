import { useCartQuery } from "@/hooks/useCart";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useSearchParams, Link, useNavigate } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { wait, formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/products";

interface DirectCheckoutItem {
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
}

const CheckoutPage = () => {
  const {
    data: cart,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useCartQuery();
  const { mutate: initiateCheckout, isPending } = useStripeCheckout();
  const [searchParams] = useSearchParams();
  const canceled = searchParams.get("canceled") === "true";
  const navigate = useNavigate();
  const { data: authData } = useAuth();
  const isAuthenticated = authData?.status === "authenticated";

  const productId = searchParams.get("product");
  const quantity = searchParams.get("quantity")
    ? parseInt(searchParams.get("quantity") || "1")
    : 1;

  const [directCheckoutItem, setDirectCheckoutItem] =
    useState<DirectCheckoutItem | null>(null);

  const { data: productData, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId!),
    enabled: !!productId && isAuthenticated,
  });

  useEffect(() => {
    if (productId && productData) {
      setDirectCheckoutItem({
        productId,
        quantity,
        name: productData.name,
        price: productData.price,
        image: productData.imageUrl,
      });
    }
  }, [productId, productData, quantity]);

  const isDirectCheckout = !!directCheckoutItem;

  const directCheckoutAmount = directCheckoutItem?.price
    ? directCheckoutItem.price * directCheckoutItem.quantity
    : 0;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      if (isDirectCheckout) {
        localStorage.setItem(
          "buyNowProduct",
          JSON.stringify({
            productId: directCheckoutItem?.productId,
            quantity: directCheckoutItem?.quantity,
          }),
        );
      } else if (cart?.cartItems.length) {
        localStorage.setItem("pendingCart", JSON.stringify(cart.cartItems));
      }

      toast.error("Please sign up or log in to complete your purchase", {
        duration: 5000,
        icon: "🔐",
      });
      navigate("/signup");
      return;
    }

    toast.loading("Processing your payment...", { id: "payment-processing" });
    await wait(1500);
    toast.dismiss("payment-processing");

    if (isDirectCheckout && directCheckoutItem) {
      initiateCheckout([
        {
          productId: directCheckoutItem.productId,
          quantity: directCheckoutItem.quantity,
        },
      ]);
    } else if (cart?.cartItems.length) {
      const checkoutItems = cart.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      initiateCheckout(checkoutItems);
    }
  };

  const isLoading = isCartLoading || (productId && isProductLoading);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isCartError && !isDirectCheckout) {
    return (
      <div className="container my-8 max-w-3xl">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading your cart. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const hasItems = isDirectCheckout || (cart && cart.cartItems.length > 0);

  return (
    <div className="container my-8 max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      {canceled && (
        <Alert className="mb-6" variant="destructive">
          <AlertTitle>Payment canceled</AlertTitle>
          <AlertDescription>
            Your payment was canceled. You can try again when you're ready.
          </AlertDescription>
        </Alert>
      )}

      {!isAuthenticated && (
        <Alert className="mb-6">
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please{" "}
            <Link to="/signup" className="font-medium underline">
              sign up
            </Link>{" "}
            or{" "}
            <Link to="/login" className="font-medium underline">
              log in
            </Link>{" "}
            to complete your purchase.
          </AlertDescription>
        </Alert>
      )}

      {!hasItems ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="mb-4 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-gray-500">
            Add some products to your cart before checking out.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
              Order Summary
            </h2>
            <div className="space-y-4">
              {isDirectCheckout && directCheckoutItem && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {directCheckoutItem.image && (
                      <div className="h-12 w-12 overflow-hidden rounded-md">
                        <img
                          src={directCheckoutItem.image}
                          alt={directCheckoutItem.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{directCheckoutItem.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {directCheckoutItem.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {formatCurrency(directCheckoutAmount)}
                  </p>
                </div>
              )}

              {!isDirectCheckout &&
                cart?.cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <div className="h-12 w-12 overflow-hidden rounded-md">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">
                    {isDirectCheckout
                      ? formatCurrency(directCheckoutAmount)
                      : formatCurrency(cart?.totalAmount || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full py-6 text-lg"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${formatCurrency(
                isDirectCheckout
                  ? directCheckoutAmount
                  : cart?.totalAmount || 0,
              )}`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

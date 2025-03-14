import { useCartQuery } from "@/hooks/useCart";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useSearchParams, Link } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { wait } from "@/lib/utils";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { data: cart, isLoading, isError } = useCartQuery();
  const { mutate: initiateCheckout, isPending } = useStripeCheckout();
  const [searchParams] = useSearchParams();
  const canceled = searchParams.get("canceled") === "true";

  const handleCheckout = async () => {
    if (cart?.cartItems.length) {
      const checkoutItems = cart.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      toast.loading("Processing your payment...", { id: "payment-processing" });
      await wait(1500);
      toast.dismiss("payment-processing");

      initiateCheckout(checkoutItems);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
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

      {!cart?.cartItems.length ? (
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
              {cart.cartItems.map((item) => (
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
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">
                    ${cart.totalAmount.toFixed(2)}
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
              `Pay $${cart.totalAmount.toFixed(2)}`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

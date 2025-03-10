import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isMockSession = sessionId?.startsWith("mock_");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (sessionId) {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  }, [sessionId, queryClient]);

  return (
    <div className="container mx-auto my-16 max-w-2xl text-center">
      <div className="rounded-lg border border-green-100 bg-green-50 p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-green-800">
          Order Successful!
        </h1>

        <p className="mb-6 text-gray-600">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>

        {sessionId && (
          <p className="mb-6 text-sm text-gray-500">
            Order reference: <span className="font-mono">{sessionId}</span>
          </p>
        )}

        {isMockSession && (
          <div className="mb-6 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            <p className="font-semibold">Mock Payment Mode</p>
            <p className="mt-1">
              This is a simulated checkout experience for development purposes.
              In a production environment, real payment processing would take
              place.
            </p>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/orders">View Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

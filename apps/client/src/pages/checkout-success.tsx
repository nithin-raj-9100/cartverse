import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { wait } from "@/lib/utils";
import toast from "react-hot-toast";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isMockSession = sessionId?.startsWith("mock_");
  const queryClient = useQueryClient();

  useEffect(() => {
    toast.success("Payment Completed Successfully!", {
      duration: 4000,
      icon: "🎉",
    });

    if (sessionId) {
      wait(1500).then(() => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      });
    }
  }, [sessionId, queryClient]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 py-12 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-16 text-center">
          <CheckCircle className="mx-auto h-20 w-20 animate-bounce text-emerald-600" />
          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your purchase! Your transaction is complete.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                What happens next?
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
                  Your order is being processed
                </p>
                <p className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
                  Check your order any time in your account
                </p>
                <p className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
                  Recieve your products at your doorstep
                </p>
              </div>
            </div>
          </div>
        </div>

        {sessionId && (
          <p className="mt-6 text-center text-sm text-gray-500">
            Order reference: <span className="font-mono">{sessionId}</span>
          </p>
        )}

        {isMockSession && (
          <div className="mt-6 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            <p className="font-semibold">Mock Payment Mode</p>
            <p className="mt-1">
              This is a simulated checkout experience for development purposes.
              In a production environment, real payment processing would take
              place.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center space-x-4">
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

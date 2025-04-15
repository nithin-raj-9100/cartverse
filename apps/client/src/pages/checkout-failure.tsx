import { XCircleIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const CheckoutFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-24 mt-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <XCircleIcon className="h-20 w-20 text-red-600 mx-auto animate-pulse" />
          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Payment Failed
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We couldn't process your payment. Please try again.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                What to do next?
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  Check your payment information
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  Try using a different payment method
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  Contact support if the problem persists
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center space-y-4">
          <Button
            className="bg-red-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
            onClick={() => navigate("/checkout")}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFailure;

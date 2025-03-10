import { useState } from "react";
import { useCartQuery } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

export function OrderSummaryOverlay() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: cart } = useCartQuery();

  const safeCart = cart || {
    cartItems: [],
    itemCount: 0,
    totalQuantity: 0,
    totalAmount: 0,
  };

  const subtotal = safeCart.totalAmount;
  const shipping = 15;
  const tax = subtotal * 0.01;
  const total = subtotal + shipping + tax;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="border-t bg-white shadow-lg">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between p-4 text-sm font-medium"
        >
          <span>Total: {formatCurrency(total)}</span>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>

        {isExpanded && (
          <div className="border-t px-4 py-6">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {safeCart.cartItems.map((item) => (
                  <li key={item.productId} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>{item.name}</h3>
                          <p className="ml-4">{formatCurrency(item.price)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <p>Subtotal</p>
                <p>{formatCurrency(subtotal)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Shipping</p>
                <p>{formatCurrency(shipping)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Taxes</p>
                <p>{formatCurrency(tax)}</p>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-medium">
                <p>Total</p>
                <p>{formatCurrency(total)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { OrdersList } from "@/components/orders/OrdersList";
import { useAuthStore } from "@/store/slices/auth";
import { Navigate } from "react-router";

export default function OrdersPage() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Your Orders</h1>
        <OrdersList />
      </div>
    </div>
  );
}

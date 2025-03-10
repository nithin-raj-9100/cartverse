import { OrdersList } from "@/components/orders/OrdersList";

export default function OrdersPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Your Orders</h1>
        <OrdersList />
      </div>
    </div>
  );
}

import { useRecentlyViewedProducts } from "@/hooks/useRecentlyViewedProducts";
import { Product } from "@/types";
import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function RecentlyViewedScroll() {
  const { recentlyViewedProducts, isLoading } = useRecentlyViewedProducts();

  if (!recentlyViewedProducts?.length) return null;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h2 className="mb-12 text-center text-3xl font-bold">Recently Viewed</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-6">
          {recentlyViewedProducts.map((product: Product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group w-[280px] shrink-0 first:ml-0"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
                  <p className="mb-2 text-gray-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}

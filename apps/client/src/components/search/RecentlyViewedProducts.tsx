import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useRecentlyViewedStore } from "@/store/useRecentlyViewedStore";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function RecentlyViewedProducts() {
  const { recentlyViewed } = useRecentlyViewedStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productPromises = recentlyViewed.map(async (id) => {
          const res = await fetch(`http://localhost:4000/products/${id}`);
          if (!res.ok) return null;
          return res.json();
        });
        const loadedProducts = (await Promise.all(productPromises)).filter(
          Boolean,
        );
        setProducts(loadedProducts);
      } catch (error) {
        console.error("Failed to load recently viewed products", error);
      }
    };

    if (recentlyViewed.length > 0) {
      loadProducts();
    }
  }, [recentlyViewed]);

  if (products.length === 0) return null;

  return (
    <div className="mt-6 rounded-lg border p-4">
      <h2 className="mb-3 font-semibold">Recently Viewed</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex-shrink-0"
          >
            <div className="w-24 rounded-md border hover:border-blue-500">
              <div className="aspect-square overflow-hidden rounded-t-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="truncate text-xs">{product.name}</p>
                <p className="text-xs font-semibold">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

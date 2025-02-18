import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/products";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/slices/cart";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error loading product. Please try again later.
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="mt-10 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">
                Available Sizes
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div key={size} className="group cursor-pointer">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 text-sm font-medium hover:border-gray-300">
                      {size}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">
                Available Colors
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <div key={color} className="group cursor-pointer">
                    <div
                      className="h-8 w-8 rounded-full border-2 border-gray-200 hover:border-gray-300"
                      style={{ backgroundColor: color }}
                    >
                      <span className="sr-only">{color}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <Button
                onClick={handleAddToCart}
                className="w-full hover:bg-gray-200"
                size="lg"
                variant="secondary"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

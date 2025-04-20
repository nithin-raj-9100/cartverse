import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/products";
import { Loader2, Star, ShieldCheck, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { BuyNowButton } from "@/components/cart/buy-now-button";
import { useEffect, useRef } from "react";
import { useRecentlyViewedProducts } from "@/hooks/useRecentlyViewedProducts";
import { useAuthStore } from "@/store/slices/auth";
import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router";
import { Lens } from "@/components/magicui/lens";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { addToRecentlyViewed } = useRecentlyViewedProducts();
  const hasTrackedView = useRef(false);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (id && user && !hasTrackedView.current) {
      hasTrackedView.current = true;
      addToRecentlyViewed.mutate(id);
    }
  }, [id, user]);

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />,
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return <div className="flex">{stars}</div>;
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
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            {product.comparePrice && product.comparePrice > product.price && (
              <div className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-3 py-1.5 text-sm font-bold text-white shadow-md">
                SALE
              </div>
            )}
            <Lens
              zoomFactor={2}
              lensSize={150}
              isStatic={false}
              ariaLabel="Zoom Area"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </Lens>
          </div>

          <div className="mt-10 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center">
              {renderRatingStars(product.rating)}
              <span className="ml-2 text-sm text-gray-500">
                {product.rating.toFixed(1)} rating
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.comparePrice &&
                  product.comparePrice > product.price && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        {formatCurrency(product.comparePrice)}
                      </span>
                      <span className="rounded-md bg-red-100 px-2 py-0.5 text-sm font-medium text-red-700">
                        {Math.round(
                          (1 - product.price / product.comparePrice) * 100,
                        )}
                        % OFF
                      </span>
                    </>
                  )}
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Fast shipping available</span>
                </div>
              </div>
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
              <div className="flex flex-col gap-4 sm:flex-row">
                <AddToCartButton
                  productId={product.id}
                  size="lg"
                  className="w-full"
                  variant="secondary"
                >
                  Add to Cart
                </AddToCartButton>
                <BuyNowButton
                  productId={product.id}
                  size="lg"
                  className="w-full"
                >
                  Buy Now
                </BuyNowButton>
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                Secure checkout · Fast shipping · Easy returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

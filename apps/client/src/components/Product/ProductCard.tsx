import { Product } from "@/types";
import { Link } from "react-router";
import { useAddToCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate: addToCart, isPending } = useAddToCart();
  const { setCartOpen } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Adding to cart:", product.id);

    addToCart(
      {
        productId: product.id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          console.log("Successfully added to cart");
          setShowSuccess(true);
          setCartOpen(true);
          setTimeout(() => setShowSuccess(false), 2000);
        },
        onError: (error) => {
          console.error("Error adding to cart:", error);
        },
      },
    );
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />,
        );
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
      }
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="group h-full rounded-lg border bg-card p-3">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center">
                {renderRatingStars(product.rating)}
                <span className="ml-1 text-xs text-muted-foreground">
                  ({product.rating.toFixed(1)})
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
            <p className="text-sm font-medium text-foreground">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>
      <div className="mt-4 border-t border-border pt-3">
        <Button
          onClick={handleAddToCart}
          className="w-full hover:bg-gray-200"
          variant="secondary"
          disabled={isPending || showSuccess}
        >
          {showSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Added
            </>
          ) : isPending ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

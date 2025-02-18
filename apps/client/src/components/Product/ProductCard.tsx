import { Product } from "@/types";
import { Link } from "react-router";
import { useCartStore } from "@/store/slices/cart";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
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
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

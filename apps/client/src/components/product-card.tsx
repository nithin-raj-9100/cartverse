import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  comparePrice?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-medium">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-medium">
              {formatCurrency(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.comparePrice)}
                </span>
                <span className="text-xs font-medium text-red-500">
                  {Math.round((1 - product.price / product.comparePrice) * 100)}
                  % off
                </span>
              </div>
            )}
          </div>
          <AddToCartButton
            productId={product.id}
            variant="secondary"
            size="sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}

import { Product } from "@/types";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductGrid;

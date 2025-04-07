import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { categories, categoryToEnum } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  onRatingChange: (rating: number) => void;
  selectedRating: number;
  minPrice: number;
  maxPrice: number;
}

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  onPriceRangeChange,
  onRatingChange,
  selectedRating,
  minPrice,
  maxPrice,
}: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [debouncedPriceRange] = useDebounce(priceRange, 1500);

  const { data: productStats } = useQuery({
    queryKey: ["productStats"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/products/stats");
      if (!res.ok) {
        throw new Error("Failed to fetch product stats");
      }
      return res.json();
    },
  });

  useEffect(() => {
    if (productStats?.priceRange) {
      setPriceRange([
        minPrice || productStats.priceRange.min,
        maxPrice || productStats.priceRange.max,
      ]);
    }
  }, [productStats, minPrice, maxPrice]);

  // Apply debounced price range changes
  useEffect(() => {
    onPriceRangeChange(debouncedPriceRange[0], debouncedPriceRange[1]);
  }, [debouncedPriceRange, onPriceRangeChange]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <div className="flex flex-col space-y-3">
          {categories.map((category) => (
            <div key={category.key} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.key}`}
                checked={selectedCategory === category.name}
                onCheckedChange={() => onCategoryChange(category.name)}
              />
              <Label
                htmlFor={`category-${category.key}`}
                className="cursor-pointer text-sm font-medium"
              >
                {category.name}
                {productStats?.categoryCounts && category.name !== "All" && (
                  <span className="ml-1 text-gray-500">
                    (
                    {productStats.categoryCounts[
                      categoryToEnum[category.name]
                    ] || 0}
                    )
                  </span>
                )}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            value={[priceRange[0], priceRange[1]]}
            min={productStats?.priceRange?.min || 0}
            max={productStats?.priceRange?.max || 1000}
            step={1}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">{formatCurrency(priceRange[0])}</span>
            <span className="text-sm">{formatCurrency(priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Customer Ratings</h3>
        <div className="flex flex-col space-y-3">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={() => onRatingChange(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex cursor-pointer items-center space-x-1 text-sm font-medium"
              >
                <span>{rating}★</span>
                <span>& Above</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

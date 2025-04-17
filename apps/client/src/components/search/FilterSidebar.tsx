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
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
      <div>
        <h3 className="mb-1.5 text-sm font-semibold sm:mb-2 sm:text-base lg:text-lg">
          Categories
        </h3>
        <div className="flex flex-col space-y-1.5 sm:space-y-2">
          {categories.map((category) => (
            <div
              key={category.key}
              className="flex items-center space-x-1.5 sm:space-x-2"
            >
              <Checkbox
                id={`category-${category.key}`}
                checked={selectedCategory === category.name}
                onCheckedChange={() => onCategoryChange(category.name)}
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4"
              />
              <Label
                htmlFor={`category-${category.key}`}
                className="cursor-pointer text-xs font-medium sm:text-sm"
              >
                {category.name}
                {productStats?.categoryCounts && category.name !== "All" && (
                  <span className="ml-1 text-xs text-gray-500">
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
        <h3 className="mb-1.5 text-sm font-semibold sm:mb-2 sm:text-base lg:text-lg">
          Price Range
        </h3>
        <div className="px-0.5 sm:px-1 md:px-2">
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            value={[priceRange[0], priceRange[1]]}
            min={productStats?.priceRange?.min || 0}
            max={productStats?.priceRange?.max || 1000}
            step={1}
            onValueChange={handlePriceChange}
            className="mb-2 sm:mb-3 lg:mb-4"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm">
              {formatCurrency(priceRange[0])}
            </span>
            <span className="text-xs sm:text-sm">
              {formatCurrency(priceRange[1])}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-1.5 text-sm font-semibold sm:mb-2 sm:text-base lg:text-lg">
          Customer Ratings
        </h3>
        <div className="flex flex-col space-y-1.5 sm:space-y-2">
          {ratings.map((rating) => (
            <div
              key={rating}
              className="flex items-center space-x-1.5 sm:space-x-2"
            >
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={() => onRatingChange(rating)}
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4"
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex cursor-pointer items-center space-x-0.5 text-xs font-medium sm:space-x-1 sm:text-sm"
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

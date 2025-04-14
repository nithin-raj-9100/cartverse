import { useState, useEffect, useMemo, useCallback } from "react";
import { Loader2, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useNavigate, useSearchParams, useParams } from "react-router";
import { useDebounce } from "use-debounce";
// [ ] Internal imports
import ProductGrid from "@/components/Product/ProductGrid";
import { useProductsSearchQuery } from "@/hooks/useProductsSearchQuery";
import { useRecentlyViewedProducts } from "@/hooks/useRecentlyViewedProducts";
import { categories, categoryToEnum } from "@/lib/constants";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatCurrency } from "@/lib/utils";

interface FiltersState {
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  rating: number;
  collection: string;
  sort: string;
}

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { category: urlCategory } = useParams();
  const searchTerm = searchParams.get("q");

  const getSortNameFromParam = useCallback((param: string | null) => {
    switch (param) {
      case "newest":
        return "Newest";
      case "price_asc":
        return "Price: Low to High";
      case "price_desc":
        return "Price: High to Low";
      case "rating_desc":
        return "Highest Rated";
      case "popular":
        return "Popular";
      default:
        return "Relevance";
    }
  }, []);

  const getCategoryNameFromParam = useCallback((param: string | null) => {
    if (!param) return "All";
    const category = Object.entries(categoryToEnum).find(
      ([_, enumValue]) => enumValue === param.toUpperCase(),
    );
    return category ? category[0] : "All";
  }, []);

  const getSortValue = useCallback((sortName: string) => {
    const sort = sortBy.find((s) => s.name === sortName);
    return sort?.value || "";
  }, []);

  const initialState = useMemo<FiltersState>(() => {
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const colorsParam = searchParams.get("colors")?.split(",") || [];
    const sizesParam = searchParams.get("sizes")?.split(",") || [];
    const minRatingParam = searchParams.get("minRating");
    const categoryParam = searchParams.get("category");
    const sortParam = searchParams.get("sort");

    return {
      priceRange: [
        minPriceParam ? parseFloat(minPriceParam) * 100 : 0,
        maxPriceParam ? parseFloat(maxPriceParam) * 100 : 20000,
      ],
      colors: colorsParam,
      sizes: sizesParam,
      rating: minRatingParam ? parseInt(minRatingParam) : 0,
      collection: getCategoryNameFromParam(
        categoryParam || (urlCategory ? urlCategory.toUpperCase() : null),
      ),
      sort: getSortNameFromParam(sortParam),
    };
  }, [
    searchParams,
    urlCategory,
    getCategoryNameFromParam,
    getSortNameFromParam,
  ]);

  const [filters, setFilters] = useState<FiltersState>(initialState);
  const [debouncedPriceRange] = useDebounce(filters.priceRange, 1000);

  const [filterExpanded, setFilterExpanded] = useState(true);
  const { recentlyViewedProducts, isLoading: isLoadingRecent } =
    useRecentlyViewedProducts();

  const sortBy = useMemo(
    () => [
      { name: "Relevance", key: 1, value: "" },
      { name: "Newest", key: 2, value: "newest" },
      { name: "Price: Low to High", key: 3, value: "price_asc" },
      { name: "Price: High to Low", key: 4, value: "price_desc" },
      { name: "Highest Rated", key: 5, value: "rating_desc" },
      { name: "Popular", key: 6, value: "popular" },
    ],
    [],
  );

  const colorOptions = useMemo(
    () => [
      { name: "Red", value: "red" },
      { name: "Blue", value: "blue" },
      { name: "Green", value: "green" },
      { name: "Yellow", value: "yellow" },
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
    ],
    [],
  );

  const sizeOptions = useMemo(
    () => [
      { name: "S", value: "S" },
      { name: "M", value: "M" },
      { name: "L", value: "L" },
      { name: "XL", value: "XL" },
    ],
    [],
  );

  const updateUrl = useCallback(
    (newFilters: FiltersState, replace = false) => {
      const params = new URLSearchParams(searchParams);

      if (searchTerm) {
        params.set("q", searchTerm);
      } else {
        params.delete("q");
      }

      let path = "/search";
      params.delete("category");
      if (newFilters.collection !== "All") {
        const categoryValue = categoryToEnum[newFilters.collection];
        if (categoryValue) {
          params.set("category", categoryValue);
          const categoryPath = Object.keys(categoryToEnum)
            .find((key) => categoryToEnum[key] === categoryValue)
            ?.toLowerCase();
          if (categoryPath) {
            path = `/search/${categoryPath}`;
          }
        }
      }

      const sortValue = getSortValue(newFilters.sort);
      if (sortValue) {
        params.set("sort", sortValue);
      } else {
        params.delete("sort");
      }

      if (newFilters.priceRange[0] > 0) {
        const minPriceDollars = Math.round(newFilters.priceRange[0] / 100);
        params.set("minPrice", minPriceDollars.toString());
      } else {
        params.delete("minPrice");
      }

      const defaultMaxPrice = 20000; // $200.00 in cents
      if (newFilters.priceRange[1] < defaultMaxPrice) {
        const maxPriceDollars = Math.round(newFilters.priceRange[1] / 100);
        params.set("maxPrice", maxPriceDollars.toString());
      } else {
        params.delete("maxPrice");
      }

      if (newFilters.colors.length > 0) {
        params.set("colors", newFilters.colors.join(","));
      } else {
        params.delete("colors");
      }

      if (newFilters.sizes.length > 0) {
        params.set("sizes", newFilters.sizes.join(","));
      } else {
        params.delete("sizes");
      }

      if (newFilters.rating > 0) {
        params.set("minRating", newFilters.rating.toString());
      } else {
        params.delete("minRating");
      }

      navigate(`${path}?${params.toString()}`, { replace });
    },
    [navigate, searchParams, searchTerm, getSortValue],
  );

  useEffect(() => {
    const currentMin = searchParams.get("minPrice");
    const currentMax = searchParams.get("maxPrice");
    const debouncedMin =
      debouncedPriceRange[0] > 0 ? debouncedPriceRange[0].toString() : null;
    const debouncedMax =
      debouncedPriceRange[1] < 20000 ? debouncedPriceRange[1].toString() : null;

    if (currentMin !== debouncedMin || currentMax !== debouncedMax) {
      updateUrl(
        {
          ...filters,
          priceRange: debouncedPriceRange,
        },
        true,
      );
    }
  }, [debouncedPriceRange, filters, searchParams, updateUrl]);

  useEffect(() => {
    setFilters(initialState);
  }, [initialState]);

  const { data, isLoading, error } = useProductsSearchQuery({
    searchTerm,
    collection: filters.collection !== "All" ? filters.collection : null,
    sortBy: getSortValue(filters.sort),
    minPrice:
      debouncedPriceRange[0] > 0 ? debouncedPriceRange[0].toString() : null,
    maxPrice:
      debouncedPriceRange[1] < 20000 ? debouncedPriceRange[1].toString() : null,
    minRating: filters.rating > 0 ? filters.rating.toString() : null,
    colors: filters.colors.length > 0 ? filters.colors : null,
    sizes: filters.sizes.length > 0 ? filters.sizes : null,
  });

  const handleCollectionChange = (collection: string) => {
    const newFilters = { ...filters, collection };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const handleSortChange = (sortName: string) => {
    const newFilters = { ...filters, sort: sortName };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: [values[0], values[1]] }));
  };

  const handleColorToggle = (color: string) => {
    setFilters((prev) => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color];
      const newFilters = { ...prev, colors: newColors };
      updateUrl(newFilters, true);
      return newFilters;
    });
  };

  const handleSizeToggle = (size: string) => {
    setFilters((prev) => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      const newFilters = { ...prev, sizes: newSizes };
      updateUrl(newFilters, true);
      return newFilters;
    });
  };

  const handleRatingChange = (rating: number) => {
    setFilters((prev) => {
      const newRating = rating === prev.rating ? 0 : rating;
      const newFilters = { ...prev, rating: newRating };
      updateUrl(newFilters, true);
      return newFilters;
    });
  };

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

  const toggleFilters = () => {
    setFilterExpanded(!filterExpanded);
  };

  const products = data?.products || [];
  const facets = data?.facets || {
    categories: [],
    priceRange: { min: 0, max: 100000 },
    colors: [],
    sizes: [],
    ratings: [],
  };
  return (
    <div className="min-h-[60vh]">
      <div className="py-4 text-lg">
        Search Results for{" "}
        <span className="font-bold">{searchTerm || "All Products"}</span>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-64 lg:w-72">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button
              onClick={toggleFilters}
              className="text-sm text-blue-600 md:hidden"
            >
              {filterExpanded ? "Hide Filters" : "Show Filters"}
              {filterExpanded ? (
                <ChevronUp className="ml-1 inline h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 inline h-4 w-4" />
              )}
            </button>
          </div>

          <div
            className={`${filterExpanded ? "block" : "hidden md:block"} space-y-4`}
          >
            <Accordion
              type="multiple"
              defaultValue={[
                "categories",
                "price",
                "rating",
                "colors",
                "sizes",
              ]}
            >
              <AccordionItem value="categories">
                <AccordionTrigger>Collections</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    <li>
                      <button
                        onClick={() => handleCollectionChange("All")}
                        className={`w-full text-left text-sm ${
                          filters.collection === "All"
                            ? "font-semibold text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        All
                      </button>
                    </li>
                    {categories.map((category) => {
                      const categoryEnum = categoryToEnum[category.name];
                      const count =
                        facets.categories.find(
                          (f) => f.category === categoryEnum,
                        )?._count?.category || 0;

                      return (
                        <li key={category.key}>
                          <button
                            onClick={() =>
                              handleCollectionChange(category.name)
                            }
                            className={`flex w-full items-center justify-between text-left text-sm ${
                              filters.collection === category.name
                                ? "font-semibold text-blue-600"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            <span>{category.name}</span>
                            {count > 0 && (
                              <span className="text-xs text-gray-400">
                                ({count})
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      min={0}
                      max={20000}
                      step={100}
                      onValueChange={handlePriceRangeChange}
                      className="mt-6"
                    />
                    <div className="flex items-center justify-between py-2 text-xs font-medium">
                      <div>{formatCurrency(filters.priceRange[0])}</div>
                      <div>{formatCurrency(filters.priceRange[1])}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rating">
                <AccordionTrigger>Rating</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div
                        key={rating}
                        className={`flex cursor-pointer items-center gap-2 ${filters.rating === rating ? "font-semibold" : ""}`}
                        onClick={() => handleRatingChange(rating)}
                      >
                        <div className="flex">{renderRatingStars(rating)}</div>
                        <span>& Up</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="colors">
                <AccordionTrigger>Colors</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {colorOptions.map((color) => {
                      const facetCount = facets.colors.find(
                        (c) => c.name === color.value,
                      )?.count;
                      const isSelected = filters.colors.includes(color.value);
                      const isDisabled = !isSelected && !facetCount;

                      return (
                        <div
                          key={color.value}
                          className={`flex items-center gap-2 ${isDisabled ? "opacity-50" : ""}`}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() =>
                              !isDisabled && handleColorToggle(color.value)
                            }
                            id={`color-${color.value}`}
                            disabled={isDisabled}
                          />
                          <label
                            htmlFor={`color-${color.value}`}
                            className={`flex cursor-pointer items-center gap-2 ${isDisabled ? "cursor-not-allowed" : ""}`}
                          >
                            <div
                              className="h-4 w-4 rounded-full border"
                              style={{ backgroundColor: color.value }}
                            />
                            {color.name}
                            {facetCount && (
                              <span className="text-xs text-gray-400">
                                ({facetCount})
                              </span>
                            )}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sizes">
                <AccordionTrigger>Sizes</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => {
                      const facetCount = facets.sizes.find(
                        (s: { name: string; count: number }) =>
                          s.name === size.value,
                      )?.count;
                      const isSelected = filters.sizes.includes(size.value);
                      const isDisabled = !isSelected && !facetCount;

                      return (
                        <div
                          key={size.value}
                          className={`cursor-pointer rounded border px-3 py-1 ${
                            isSelected
                              ? "border-blue-600 bg-blue-50 text-blue-600"
                              : isDisabled
                                ? "cursor-not-allowed border-gray-200 text-gray-400"
                                : "border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() =>
                            !isDisabled && handleSizeToggle(size.value)
                          }
                        >
                          {size.name}
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="flex-1">
          {isLoading && products.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center text-center text-xl font-semibold">
              Error loading products
              <div className="text-base text-red-500">
                {(error as Error).message}
              </div>
              <div className="mt-4 flex gap-2">
                <Link to="/" className="text-blue-500">
                  Go to Home
                </Link>
              </div>
            </div>
          ) : products?.length === 0 ? (
            <div className="flex flex-col items-center text-center text-xl font-semibold">
              No products found matching your criteria
              <div className="mt-4 flex gap-2">
                <Link to="/" className="text-blue-500">
                  Go to Home
                </Link>
                <div> or </div>
                <Link to="/products" className="text-blue-500">
                  Browse All Products
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="font-medium">{products.length}</span>{" "}
                  products found
                  {isLoading && (
                    <Loader2 className="ml-2 inline h-4 w-4 animate-spin" />
                  )}{" "}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sort By:</span>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="rounded border p-1 text-sm"
                  >
                    {sortBy.map((sort) => (
                      <option key={sort.key} value={sort.name}>
                        {sort.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <ProductGrid products={products} />
            </div>
          )}

          {recentlyViewedProducts && recentlyViewedProducts.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold">Recently Viewed</h3>
              {isLoadingRecent ? (
                <div className="flex h-24 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {recentlyViewedProducts.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group"
                    >
                      <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-2">
                        <div className="truncate font-medium">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          {renderRatingStars(product.rating)}
                        </div>
                        <div className="mt-2 font-medium text-gray-900">
                          {formatCurrency(product.price)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

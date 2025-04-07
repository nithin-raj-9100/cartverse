import { useState, useEffect, useMemo } from "react";
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

interface CategoryFacet {
  category: string;
  _count: {
    category: number;
  };
}

interface ColorFacet {
  name: string;
  count: number;
}

interface FacetData {
  categories: CategoryFacet[];
  priceRange: { min: number; max: number };
  colors: ColorFacet[];
  sizes: { name: string; count: number }[];
  ratings: Array<{ rating: number; count: number }>;
}

interface RecentlyViewedProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
  [key: string]: string | number | boolean | null;
}

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { category: urlCategory } = useParams();
  const searchTerm = searchParams.get("q");
  const sortParam = searchParams.get("sort") || "";
  const categoryParam =
    searchParams.get("category") ||
    (urlCategory ? urlCategory.toUpperCase() : "All");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const minRatingParam = searchParams.get("minRating");

  const colorsParam = useMemo(
    () => searchParams.get("colors")?.split(",") || [],
    [searchParams],
  );

  const sizesParam = useMemo(
    () => searchParams.get("sizes")?.split(",") || [],
    [searchParams],
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [debouncedPriceRange] = useDebounce(priceRange, 1000);
  const [selectedColors, setSelectedColors] = useState<string[]>(colorsParam);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(sizesParam);
  const [selectedRating, setSelectedRating] = useState<number>(
    minRatingParam ? parseInt(minRatingParam) : 0,
  );
  const [filterExpanded, setFilterExpanded] = useState(true);
  const [autoApplyFilters, setAutoApplyFilters] = useState(false);

  const { recentlyViewedProducts, isLoading: isLoadingRecent } =
    useRecentlyViewedProducts();

  const getSortNameFromParam = (param: string) => {
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
  };

  const getCategoryNameFromParam = (param: string): string => {
    if (!param) return "All";

    const category = Object.entries(categoryToEnum).find(
      ([_, enumValue]) => enumValue === param.toUpperCase(),
    );

    return category ? category[0] : "All";
  };

  const [selectedCollection, setSelectedCollection] = useState<string>(
    getCategoryNameFromParam(categoryParam),
  );
  const [selectedSort, setSelectedSort] = useState<string>(
    getSortNameFromParam(sortParam),
  );

  const sortBy = [
    { name: "Relevance", key: 1, value: "" },
    { name: "Newest", key: 2, value: "newest" },
    { name: "Price: Low to High", key: 3, value: "price_asc" },
    { name: "Price: High to Low", key: 4, value: "price_desc" },
    { name: "Highest Rated", key: 5, value: "rating_desc" },
    { name: "Popular", key: 6, value: "popular" },
  ];

  const colorOptions = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Yellow", value: "yellow" },
    { name: "Black", value: "black" },
    { name: "White", value: "white" },
  ];

  const sizeOptions = [
    { name: "S", value: "S" },
    { name: "M", value: "M" },
    { name: "L", value: "L" },
    { name: "XL", value: "XL" },
  ];

  useEffect(() => {
    setSelectedSort(getSortNameFromParam(sortParam));
  }, [sortParam]);

  useEffect(() => {
    if (urlCategory) {
      const categoryEnum = urlCategory.toUpperCase();
      const category = Object.entries(categoryToEnum).find(
        ([_, enumValue]) => enumValue === categoryEnum,
      );

      if (category) {
        setSelectedCollection(category[0]);
        const newParams = new URLSearchParams(searchParams);
        if (!newParams.has("category")) {
          newParams.set("category", categoryEnum);
          navigate(`/search/${urlCategory}?${newParams.toString()}`, {
            replace: true,
          });
        }
      }
    }
  }, [urlCategory, navigate, searchParams]);

  useEffect(() => {
    if (minPriceParam && maxPriceParam) {
      setPriceRange([parseInt(minPriceParam), parseInt(maxPriceParam)]);
    }

    if (colorsParam.length > 0) {
      setSelectedColors(colorsParam);
    }

    if (sizesParam.length > 0) {
      setSelectedSizes(sizesParam);
    }

    if (minRatingParam) {
      setSelectedRating(parseInt(minRatingParam));
    }
  }, [minPriceParam, maxPriceParam, colorsParam, sizesParam, minRatingParam]);

  useEffect(() => {
    if (autoApplyFilters) {
      const newParams = new URLSearchParams(searchParams);
      if (debouncedPriceRange[0] > 0) {
        newParams.set("minPrice", debouncedPriceRange[0].toString());
      } else {
        newParams.delete("minPrice");
      }
      if (debouncedPriceRange[1] < 1000) {
        newParams.set("maxPrice", debouncedPriceRange[1].toString());
      } else {
        newParams.delete("maxPrice");
      }
      navigate(`/search?${newParams.toString()}`);
    }
  }, [debouncedPriceRange, autoApplyFilters, searchParams, navigate]);

  const getSortValue = (sortName: string) => {
    const sort = sortBy.find((s) => s.name === sortName);
    return sort?.value || "";
  };

  const { data, isLoading, error } = useProductsSearchQuery({
    searchTerm,
    collection: selectedCollection !== "All" ? selectedCollection : null,
    sortBy: getSortValue(selectedSort),
    minPrice: priceRange[0].toString(),
    maxPrice: priceRange[1].toString(),
    minRating: selectedRating > 0 ? selectedRating.toString() : null,
    colors: selectedColors.length > 0 ? selectedColors : null,
    sizes: selectedSizes.length > 0 ? selectedSizes : null,
  });

  const handleCollectionChange = (collection: string) => {
    setSelectedCollection(collection);
    const categoryValue =
      collection !== "All" ? categoryToEnum[collection] : null;

    if (collection !== "All") {
      const categoryPath = Object.keys(categoryToEnum)
        .find((key) => categoryToEnum[key] === categoryValue)
        ?.toLowerCase();

      if (categoryPath) {
        const newParams = new URLSearchParams(searchParams);
        if (categoryValue) {
          newParams.set("category", categoryValue);
        }
        navigate(`/search/${categoryPath}?${newParams.toString()}`);
      } else {
        updateSearchParams("category", categoryValue);
      }
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("category");
      navigate(`/search?${newParams.toString()}`);
    }
  };

  const handleSortChange = (sortName: string) => {
    const sortValue = getSortValue(sortName);
    setSelectedSort(sortName);
    updateSearchParams("sort", sortValue);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    setAutoApplyFilters(true);
  };

  const handleApplyFilters = () => {
    const newParams = new URLSearchParams(searchParams);

    if (priceRange[0] > 0) {
      newParams.set("minPrice", priceRange[0].toString());
    } else {
      newParams.delete("minPrice");
    }

    if (priceRange[1] < 1000) {
      newParams.set("maxPrice", priceRange[1].toString());
    } else {
      newParams.delete("maxPrice");
    }

    if (selectedColors.length > 0) {
      newParams.set("colors", selectedColors.join(","));
    } else {
      newParams.delete("colors");
    }

    if (selectedSizes.length > 0) {
      newParams.set("sizes", selectedSizes.join(","));
    } else {
      newParams.delete("sizes");
    }

    if (selectedRating > 0) {
      newParams.set("minRating", selectedRating.toString());
    } else {
      newParams.delete("minRating");
    }

    navigate(`/search?${newParams.toString()}`);
  };

  const updateSearchParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    navigate(`/search?${newParams.toString()}`);
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating === selectedRating ? 0 : rating);
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
  const facets: FacetData = data?.facets || {
    categories: [],
    priceRange: { min: 0, max: 1000 },
    colors: [],
    sizes: [],
    ratings: [],
  };

  return (
    <div className="min-h-[60vh]">
      <div className="py-4 text-lg">
        Search Results for <span className="font-bold">{searchTerm}</span>
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
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <div
                        key={category.key}
                        className={`cursor-pointer hover:text-blue-600 ${selectedCollection === category.name ? "font-semibold text-blue-600" : ""}`}
                        onClick={() => handleCollectionChange(category.name)}
                      >
                        {category.name}
                        {facets.categories.find(
                          (c: CategoryFacet) =>
                            c.category === categoryToEnum[category.name],
                        )?.["_count"]?.category && (
                          <span className="ml-2 text-sm text-gray-500">
                            (
                            {
                              facets.categories.find(
                                (c: CategoryFacet) =>
                                  c.category === categoryToEnum[category.name],
                              )?.["_count"]?.category
                            }
                            )
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      value={priceRange}
                      min={0}
                      max={1000}
                      step={10}
                      onValueChange={handlePriceRangeChange}
                      className="mt-6"
                    />
                    <div className="flex items-center justify-between py-2 text-xs font-medium">
                      <div>{formatCurrency(priceRange[0])}</div>
                      <div>{formatCurrency(priceRange[1])}</div>
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
                        className={`flex cursor-pointer items-center gap-2 ${selectedRating === rating ? "font-semibold" : ""}`}
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
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={selectedColors.includes(color.value)}
                          onCheckedChange={() => handleColorToggle(color.value)}
                          id={`color-${color.value}`}
                        />
                        <label
                          htmlFor={`color-${color.value}`}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: color.value }}
                          />
                          {color.name}
                          {facets.colors.find(
                            (c: ColorFacet) => c.name === color.value,
                          )?.count && (
                            <span className="text-sm text-gray-500">
                              (
                              {
                                facets.colors.find(
                                  (c: ColorFacet) => c.name === color.value,
                                )?.count
                              }
                              )
                            </span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sizes">
                <AccordionTrigger>Sizes</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                      <div
                        key={size.value}
                        className={`cursor-pointer rounded border px-3 py-1 ${
                          selectedSizes.includes(size.value)
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSizeToggle(size.value)}
                      >
                        {size.name}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button onClick={handleApplyFilters} className="w-full">
              Apply All Filters
            </Button>
          </div>
        </div>

        <div className="flex-1">
          {isLoading ? (
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
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sort By:</span>
                  <select
                    value={selectedSort}
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
                  {recentlyViewedProducts
                    .slice(0, 5)
                    .map((product: RecentlyViewedProduct) => (
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

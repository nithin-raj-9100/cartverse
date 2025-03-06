import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";

// [ ] Internal imports
import ProductGrid from "@/components/Product/ProductGrid";
import { useProductsSearchQuery } from "@/hooks/useProductsSearchQuery";
import { categories, categoryToEnum } from "@/lib/constants";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const sortParam = searchParams.get("sort") || "";
  const categoryParam = searchParams.get("category") || "All";

  const getSortNameFromParam = (param: string) => {
    switch (param) {
      case "newest":
        return "Newest";
      case "price_asc":
        return "Price: Low to High";
      case "price_desc":
        return "Price: High to Low";
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
  ];

  useEffect(() => {
    setSelectedSort(getSortNameFromParam(sortParam));
  }, [sortParam]);

  useEffect(() => {
    const category = searchParams.get("category") || "All";
    setSelectedCollection(getCategoryNameFromParam(category));
  }, [searchParams]);

  const getSortValue = (sortName: string) => {
    const sort = sortBy.find((s) => s.name === sortName);
    return sort?.value || "";
  };

  const { data, isLoading, error } = useProductsSearchQuery({
    searchTerm,
    collection: selectedCollection !== "All" ? selectedCollection : null,
    sortBy: getSortValue(selectedSort),
  });

  const handleCollectionChange = (collection: string) => {
    setSelectedCollection(collection);

    const newParams = new URLSearchParams(searchParams);
    if (collection !== "All") {
      newParams.set("category", categoryToEnum[collection]);
    } else {
      newParams.delete("category");
    }

    navigate(`/search?${newParams.toString()}`);
  };

  const handleSortChange = (sortName: string) => {
    const sortValue = getSortValue(sortName);
    setSelectedSort(sortName);

    const newParams = new URLSearchParams(searchParams);
    if (sortValue) {
      newParams.set("sort", sortValue);
    } else {
      newParams.delete("sort");
    }

    navigate(`/search?${newParams.toString()}`);
  };

  return (
    <div className="min-h-[60vh]">
      <div className="py-4 text-lg">
        Search Results for <span className="font-bold">{searchTerm}</span>
      </div>

      <div className="flex gap-4">
        <div className="flex min-w-[150px] flex-col gap-2 pr-6">
          <div className="text-xl font-semibold">Collections</div>
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <div
                key={category.key}
                className={`cursor-pointer hover:text-blue-600 ${selectedCollection === category.name ? "font-semibold text-blue-600" : ""}`}
                onClick={() => handleCollectionChange(category.name)}
              >
                {category.name}
              </div>
            ))}
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
          ) : data?.length === 0 ? (
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
            <ProductGrid products={data} />
          )}
        </div>

        <div className="flex min-w-[170px] flex-col gap-2 pl-6">
          <div className="text-xl font-semibold">Sort By</div>
          <div className="flex flex-col gap-2">
            {sortBy.map((sort) => (
              <div
                key={sort.key}
                className={`cursor-pointer hover:text-blue-600 ${selectedSort === sort.name ? "font-semibold text-blue-600" : ""}`}
                onClick={() => handleSortChange(sort.name)}
              >
                {sort.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

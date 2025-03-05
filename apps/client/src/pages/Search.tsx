import { useState } from "react";
import ProductGrid from "@/components/Product/ProductGrid";
import { Link, useSearchParams } from "react-router";
import { useProductsSearchQuery } from "@/hooks/useProductsSearchQuery";
import { Loader2 } from "lucide-react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const [selectedCollection, setSelectedCollection] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("Relevance");

  const collections = [
    { name: "All", key: 1 },
    { name: "Shirts", key: 2 },
    { name: "Pants", key: 3 },
    { name: "Electronics", key: 4 },
  ];

  const sortBy = [
    { name: "Relevance", key: 1, value: "" },
    { name: "Newest", key: 2, value: "newest" },
    { name: "Price: Low to High", key: 3, value: "price_asc" },
    { name: "Price: High to Low", key: 4, value: "price_desc" },
  ];

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
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
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
            {collections.map((collection) => (
              <div
                key={collection.key}
                className={`cursor-pointer hover:text-blue-600 ${selectedCollection === collection.name ? "font-semibold text-blue-600" : ""}`}
                onClick={() => handleCollectionChange(collection.name)}
              >
                {collection.name}
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

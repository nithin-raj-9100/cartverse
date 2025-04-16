import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Search, X, Loader2 } from "lucide-react";

// [ ] Internal Imports
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/api-config";

interface SearchSuggestion {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

interface GroupedSuggestions {
  [category: string]: SearchSuggestion[];
}

export function SearchComponent() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [flattenedSuggestions, setFlattenedSuggestions] = useState<
    SearchSuggestion[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const currentQ = searchParams.get("q");
    if (currentQ !== null) {
      setSearchTerm(currentQ);
    }
  }, [searchParams]);

  useEffect(() => {
    setSelectedIndex(-1);
    setFlattenedSuggestions(suggestions);
    suggestionRefs.current = Array(suggestions.length + 1).fill(null);
  }, [suggestions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        inputRef.current?.blur();
        setShowSuggestions(false);
      }

      if (showSuggestions && flattenedSuggestions.length > 0) {
        const totalOptions = flattenedSuggestions.length + 1;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => {
            const nextIndex = prev < totalOptions - 1 ? prev + 1 : 0;
            suggestionRefs.current[nextIndex]?.scrollIntoView({
              block: "nearest",
            });
            return nextIndex;
          });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => {
            const nextIndex = prev > 0 ? prev - 1 : totalOptions - 1;
            suggestionRefs.current[nextIndex]?.scrollIntoView({
              block: "nearest",
            });
            return nextIndex;
          });
        } else if (e.key === "Enter" && selectedIndex >= 0) {
          e.preventDefault();
          if (selectedIndex < flattenedSuggestions.length) {
            const selectedSuggestion = flattenedSuggestions[selectedIndex];
            if (selectedSuggestion) {
              handleSuggestionClick(selectedSuggestion);
            }
          } else {
            handleSubmit(e as unknown as React.FormEvent);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSuggestions, flattenedSuggestions, selectedIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiRequest(
        `/products/suggestions?query=${encodeURIComponent(query)}`,
      );
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data);
        if (data.length > 0) {
          setShowSuggestions(true);
        }
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!searchTerm.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    if (searchTerm.trim().length === 1) {
      fetchSuggestions(searchTerm);
      return;
    }

    if (searchTerm.trim().length > 1) {
      debounceTimerRef.current = setTimeout(() => {
        fetchSuggestions(searchTerm);
      }, 500);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm]);

  const handleFocus = () => {
    setIsFocused(true);
    setShowClearIcon(true);

    if (searchTerm.trim()) {
      setShowSuggestions(true);
      fetchSuggestions(searchTerm);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    setIsFocused(false);
    setShowClearIcon(false);

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.relatedTarget as Node)
    ) {
      setTimeout(() => {
        setShowSuggestions(false);
      }, 200);
    }
  };

  const clearInput = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    setIsLoading(false);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    navigate(`/product/${suggestion.id}`);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedIndex >= 0 && selectedIndex < flattenedSuggestions.length) {
      handleSuggestionClick(flattenedSuggestions[selectedIndex]);
      return;
    }

    if (searchTerm.trim()) {
      const sortParam = searchParams.get("sort");
      const queryParams = new URLSearchParams();

      queryParams.set("q", searchTerm.trim());

      if (sortParam) {
        queryParams.set("sort", sortParam);
      }

      navigate(`/search?${queryParams.toString()}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionHover = (index: number) => {
    setSelectedIndex(index);
  };

  const groupedSuggestions = suggestions.reduce<GroupedSuggestions>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {},
  );

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm.trim()) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={i} className="font-semibold text-primary">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const totalProducts = suggestions.length;

  return (
    <div className="*:not-first:mt-2 relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            ref={inputRef}
            className="peer rounded-md border border-gray-300 pe-9 ps-9 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search Products..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            role="combobox"
            aria-expanded={showSuggestions}
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-activedescendant={
              selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined
            }
          />

          {showClearIcon || searchTerm ? (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-0.5 hover:bg-gray-100"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-1.5 top-1/2 hidden h-6 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 text-center font-mono text-xs font-medium opacity-100 xl:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}

          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Search size={16} />
          </div>
        </div>
      </form>

      {showSuggestions && (
        <div
          ref={dropdownRef}
          id="search-suggestions"
          role="listbox"
          className={cn(
            "absolute z-50 mt-2 max-h-80 w-full min-w-full overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 bg-white shadow-lg",
            "sm:w-[calc(100%+4rem)] sm:-translate-x-8",
            "md:w-[calc(100%+2rem)] md:-translate-x-4",
            "lg:w-[calc(100%+4rem)] lg:-translate-x-8",
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              <span className="ml-3 text-sm text-gray-500">Searching...</span>
            </div>
          ) : (
            <>
              {suggestions.length > 0 && searchTerm.trim() && (
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-sm text-gray-600">
                    Found <span className="font-medium">{totalProducts}</span>{" "}
                    results for "{searchTerm}"
                  </p>
                </div>
              )}

              <ul className="divide-y divide-gray-100">
                {Object.entries(groupedSuggestions).map(
                  ([category, categoryItems], categoryIndex) => (
                    <li key={category} className="py-2">
                      <div className="bg-gray-50/50 px-4 py-1.5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {category}{" "}
                          <span className="text-gray-400">
                            ({categoryItems.length})
                          </span>
                        </p>
                      </div>
                      <ul>
                        {categoryItems.map((suggestion, index) => {
                          const flattenedIndex = suggestions.findIndex(
                            (s) => s.id === suggestion.id,
                          );

                          return (
                            <li
                              ref={(el) => {
                                suggestionRefs.current[flattenedIndex] = el;
                              }}
                              key={suggestion.id}
                              id={`suggestion-${flattenedIndex}`}
                              role="option"
                              aria-selected={selectedIndex === flattenedIndex}
                              onClick={() => handleSuggestionClick(suggestion)}
                              onMouseEnter={() =>
                                handleSuggestionHover(flattenedIndex)
                              }
                              className={cn(
                                "cursor-pointer transition-colors duration-150",
                                selectedIndex === flattenedIndex
                                  ? "bg-gray-100"
                                  : "hover:bg-gray-50",
                              )}
                              tabIndex={-1}
                            >
                              <div className="flex items-center p-3">
                                <div className="mr-4 h-14 w-14 flex-shrink-0 overflow-hidden rounded border border-gray-100 bg-gray-50">
                                  {suggestion.imageUrl ? (
                                    <img
                                      src={suggestion.imageUrl}
                                      alt={suggestion.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center text-gray-300">
                                      <Search size={20} />
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-gray-900">
                                    {highlightSearchTerm(suggestion.name)}
                                  </p>
                                  <p className="mt-0.5 text-xs text-gray-500">
                                    {suggestion.category}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ),
                )}
                {suggestions.length > 0 && (
                  <li
                    className={cn(
                      "px-4 py-3 transition-colors duration-150",
                      selectedIndex === flattenedSuggestions.length
                        ? "bg-gray-100"
                        : "hover:bg-gray-50",
                    )}
                    ref={(el) => {
                      suggestionRefs.current[flattenedSuggestions.length] = el;
                    }}
                    id={`suggestion-${flattenedSuggestions.length}`}
                    role="option"
                    aria-selected={
                      selectedIndex === flattenedSuggestions.length
                    }
                    onMouseEnter={() =>
                      handleSuggestionHover(flattenedSuggestions.length)
                    }
                  >
                    <button
                      type="button"
                      className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      onClick={handleSubmit}
                    >
                      See all results for "{searchTerm}"
                    </button>
                  </li>
                )}
              </ul>

              {suggestions.length === 0 && searchTerm.length >= 2 && (
                <div className="px-4 py-8 text-center">
                  <Search className="mx-auto h-8 w-8 text-gray-300" />
                  <p className="mt-3 font-medium text-gray-600">
                    No results found
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    We couldn't find any products matching "{searchTerm}"
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

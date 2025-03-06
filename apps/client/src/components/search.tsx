import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Search, X } from "lucide-react";
import { useRef } from "react";

// [ ] Internal Imports
import { Input } from "./ui/input";

export function SearchComponent() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [showClearIcon, setShowClearIcon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const currentQ = searchParams.get("q");
    if (currentQ !== null) {
      setSearchTerm(currentQ);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    const handleFocusBlur = (e: FocusEvent) => {
      setShowClearIcon(e.type === "focus");
    };

    document.addEventListener("keydown", handleKeyDown);
    inputRef.current?.addEventListener("focus", handleFocusBlur);
    inputRef.current?.addEventListener("blur", handleFocusBlur);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      inputRef.current?.removeEventListener("focus", handleFocusBlur);
      inputRef.current?.removeEventListener("blur", handleFocusBlur);
    };
  }, []);

  const clearInput = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const sortParam = searchParams.get("sort");
      const queryParams = new URLSearchParams();

      queryParams.set("q", searchTerm.trim());

      if (sortParam) {
        queryParams.set("sort", sortParam);
      }

      navigate(`/search?${queryParams.toString()}`);
    }
  };

  return (
    <div className="*:not-first:mt-2">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            ref={inputRef}
            className="peer pe-9 ps-9"
            placeholder="Search Products..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
    </div>
  );
}

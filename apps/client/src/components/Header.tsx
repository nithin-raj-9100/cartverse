import { Link } from "react-router";
import { ChevronDown, Search, User, ShoppingCart } from "lucide-react";

// [ ] Internal Imports
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-6 flex items-center space-x-3">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <span className="font-bold text-xl">
              <ShoppingCart />
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-8 text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 transition-colors hover:text-foreground/80 hover:underline decoration-2 underline-offset-4 focus:outline-none">
              Categories
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/categories/baby" className="w-full">
                  Baby
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/categories/clothing" className="w-full">
                  Clothing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/categories/accessories" className="w-full">
                  Accessories
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/categories/home-office" className="w-full">
                  Home &amp; Office
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/products"
            className="transition-colors hover:text-foreground/80 hover:underline decoration-2 underline-offset-4"
          >
            Products
          </Link>
          <Link
            to="/orders"
            className="flex items-center transition-colors hover:text-foreground/80 hover:underline decoration-2 underline-offset-4"
          >
            Orders
            {/* <Badge variant="secondary" className="ml-2 hover:bg-secondary/80">
              2
            </Badge> */}
          </Link>
          {/* <Link
            to="/customers"
            className="transition-colors hover:text-foreground/80 hover:underline decoration-2 underline-offset-4"
          >
            Customers
          </Link> */}
        </div>

        <div className="ml-auto flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 md:w-80 lg:w-96 transition-all duration-200 focus:w-[28rem]"
              aria-label="Search products"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <User className="h-6 w-6" />
                <span className="sr-only">Toggle user menu</span>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem className="font-semibold text-lg">
                {/* Show real user name */}
                John Doe
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="block w-full text-left">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button variant="outline" className="block w-full text-left">
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

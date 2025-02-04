import { Link, useNavigate } from "react-router";
import { Search, User, Menu, ShoppingBag, ShoppingCart } from "lucide-react";

// [ ] Internal Imports
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const categories = [
  { name: "Clothing", subcategories: ["T-Shirts", "Hoodies", "Jackets"] },
  { name: "Accessories", subcategories: ["Hats", "Bags", "Mugs"] },
  { name: "Baby", subcategories: ["Onesies", "Caps"] },
  { name: "Pets", subcategories: ["Dog Sweaters"] },
  { name: "Tech", subcategories: ["Keyboards", "Webcam Covers", "Stickers"] },
];

const Header = ({ data }: { data: any }) => {
  const { status, user } = data || {};
  // @ts-ignore
  const userName = user?.name | "Guest";

  const navigate = useNavigate();

  console.log("status", status);
  console.log("user", userName);

  // this should be also included inisde useQuery
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to logout");
      }

      navigate("/");
    } catch (error) {
      console.error("Error occured", error);
    }
  };
  return (
    <div>
      <header className="bg-background">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">CartVerse</span>
              <ShoppingCart className="h-8 w-8" />
              {/* <img
                className="h-8 w-auto"
                src="/path-to-your-logo.png"
                alt="Logo"
                width={32}
                height={32}
              /> */}
            </Link>
          </div>
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {categories.map((category) => (
                        <div key={category.name} className="space-y-2">
                          <h3 className="text-sm font-semibold leading-6 text-foreground">
                            {category.name}
                          </h3>
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory}
                              to={`/${subcategory.toLowerCase().replace(" ", "-")}`}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                              {subcategory}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="py-6">
                      {user ? (
                        <>
                          <span className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-foreground">
                            Welcome, {user.name}
                          </span>
                          <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            Logout
                          </Button>
                        </>
                      ) : (
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Link to="/login">Log in</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {categories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">{category.name}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {category.subcategories.map((subcategory) => (
                    <DropdownMenuItem key={subcategory} asChild>
                      <Link
                        to={`/${subcategory.toLowerCase().replace(" ", "-")}`}
                      >
                        {subcategory}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
            {/* Search can me a modal  */}
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search">
                <Search className="h-6 w-6" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingBag className="h-6 w-6" />
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            {user ? (
              <div className="flex items-center gap-x-4">
                <span className="text-sm font-semibold leading-6 text-foreground">
                  Welcome, {user.name}
                </span>
                <Button onClick={handleLogout} variant="ghost">
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/login">
                  <User className="h-6 w-6" />
                  <span className="sr-only">Log in</span>
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;

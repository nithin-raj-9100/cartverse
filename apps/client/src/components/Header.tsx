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
import Navbar from "./Navbar";

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
      <Navbar data={data} />
    </div>
  );
};

export default Header;

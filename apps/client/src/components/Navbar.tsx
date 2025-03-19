import { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/slices/auth";
import { useCartStore } from "@/store/useCartStore";
import { useCartQuery } from "@/hooks/useCart";
import { SearchComponent } from "@/components/search";
import { OrdersPopover } from "./orders/OrdersPopover";
import { cn } from "@/lib/utils";

// [ ] Internal Imports
import { navigation } from "../lib/constants";

export function Navbar({ data }: { data: Record<string, unknown> }) {
  const [open, setOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout: logoutStore, isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const { setCartOpen } = useCartStore();
  const { data: cart } = useCartQuery();

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      setProfileMenuOpen(false);
    };
  }, [navigate]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:4000/auth/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to logout");
      }

      return res.json();
    },
    onSuccess: () => {
      logoutStore();
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <Link
                            to={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </Link>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>

                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <Link
                                to={item.href}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                {data?.status === "authenticated" ? (
                  <>
                    <div className="border-b border-gray-100 pb-3">
                      <p className="-m-2 block p-2 font-medium text-gray-900">
                        {/* @ts-expect-error FIXIT: */}
                        Hello, {data.user.name}
                      </p>
                      <p className="-m-2 block p-2 text-sm text-gray-500">
                        {/* @ts-expect-error FIXIT: */}
                        {data.user.email || ""}
                      </p>
                    </div>
                    <Link
                      to="/orders"
                      className="-m-2 flex items-center p-2 text-gray-500 hover:text-gray-900"
                    >
                      <ClipboardDocumentListIcon className="mr-3 h-5 w-5 text-gray-400" />
                      Your Orders
                    </Link>
                    <Link
                      to="/profile"
                      className="-m-2 flex items-center p-2 text-gray-500 hover:text-gray-900"
                    >
                      <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
                      Your Profile
                    </Link>
                    <div className="mt-2 border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="-m-2 flex w-full items-center p-2 text-left font-medium text-gray-900"
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6"></div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">CartVerse</span>
                  <img
                    alt="CartVerse Logo"
                    src="/logo/logo.png"
                    className="h-12 w-auto"
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full z-50 text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {/* Short element to hide top of shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow"
                        />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-4">
                            {/* Reduced padding and gap values */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-4 py-2">
                              <div className="col-start-2 grid grid-cols-2 gap-x-4">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-base sm:text-sm"
                                  >
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <Link
                                      to={item.href}
                                      className="mt-2 block font-medium text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </Link>
                                    <p
                                      aria-hidden="true"
                                      className="mt-1 text-xs"
                                    >
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-4 gap-y-4 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-4 space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <Link
                                            to={item.href}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <SearchComponent />
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Link
                      to="/"
                      className="group -m-2 flex items-center p-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setCartOpen(true);
                      }}
                    >
                      <ShoppingBagIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {cart?.totalQuantity || 0}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </Link>
                  </div>

                  {/* User Profile Menu */}
                  {data?.status === "authenticated" ? (
                    <div className="relative ml-4">
                      <Popover>
                        {({ open, close }) => (
                          <>
                            <PopoverButton
                              onClick={() =>
                                setProfileMenuOpen(!profileMenuOpen)
                              }
                              className={cn(
                                "flex items-center space-x-2 rounded-full p-1 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-800 focus:outline-none",
                                open
                                  ? "bg-gray-100 ring-2 ring-indigo-500 ring-opacity-50"
                                  : "",
                              )}
                            >
                              <UserCircleIcon className="h-6 w-6" />
                              <span className="max-w-[100px] truncate">
                                {/* @ts-expect-error FIXIT: */}
                                {data.user.name}
                              </span>
                              <svg
                                className={cn(
                                  "ml-1 h-4 w-4 transition-transform",
                                  open ? "rotate-180 transform" : "",
                                )}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </PopoverButton>
                            <PopoverPanel className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="border-b border-gray-100 px-4 py-3">
                                <p className="text-sm">Signed in as</p>
                                <p className="truncate text-sm font-medium text-gray-900">
                                  {/* @ts-expect-error FIXIT: */}
                                  {data.user.email || data.user.name}
                                </p>
                              </div>
                              <Link
                                to="/orders"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => close()}
                              >
                                <ClipboardDocumentListIcon className="mr-3 h-5 w-5 text-gray-400" />
                                Your Orders
                              </Link>
                              <Link
                                to="/profile"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => close()}
                              >
                                <UserIcon className="mr-3 h-5 w-5 text-gray-400" />
                                Your Profile
                              </Link>
                              <div className="border-t border-gray-100">
                                <button
                                  onClick={() => {
                                    close();
                                    handleLogout();
                                  }}
                                  className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                                  Logout
                                </button>
                              </div>
                            </PopoverPanel>
                          </>
                        )}
                      </Popover>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Login
                      </Link>
                      <span
                        aria-hidden="true"
                        className="h-6 w-px bg-gray-200"
                      />
                      <Link
                        to="/signup"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Create account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;

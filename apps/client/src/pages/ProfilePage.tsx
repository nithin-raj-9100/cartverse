import { useAuthStore } from "@/store/slices/auth";
import { Navigate, Link } from "react-router";
import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  HomeIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const quickLinks = [
    {
      name: "Your Orders",
      description: "Track, return, or buy things again",
      href: "/orders",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Shopping Preferences",
      description: "Manage your shopping preferences",
      href: "#",
      icon: ShoppingBagIcon,
      comingSoon: true,
    },
    {
      name: "Payment Methods",
      description: "Add or remove payment methods",
      href: "#",
      icon: CreditCardIcon,
      comingSoon: true,
    },
    {
      name: "Addresses",
      description: "Edit addresses for orders and gifts",
      href: "#",
      icon: HomeIcon,
      comingSoon: true,
    },
    {
      name: "Account Settings",
      description: "Change your email or password",
      href: "#",
      icon: CogIcon,
      comingSoon: true,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">Your Profile</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-1 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                <UserCircleIcon className="h-full w-full text-gray-300" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {user?.name || "User"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {user?.email || ""}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Member since{" "}
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString(
                    "en-GB",
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 rounded-lg border bg-card text-card-foreground shadow-sm md:col-span-2">
            <div className="p-6">
              <h2 className="text-xl font-semibold">Quick Links</h2>
              <p className="text-sm text-muted-foreground">
                Manage your account and preferences
              </p>
            </div>
            <div className="divide-y">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.comingSoon ? "#" : link.href}
                  className={`flex items-start p-6 transition-colors hover:bg-accent/50 ${link.comingSoon ? "cursor-not-allowed opacity-70" : ""}`}
                  onClick={
                    link.comingSoon ? (e) => e.preventDefault() : undefined
                  }
                >
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{link.name}</h3>
                      {link.comingSoon && (
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// should make the below page routes
const footerNavigation = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "Featured", href: "/products/featured" },
    { name: "New Arrivals", href: "/products/new" },
    { name: "Best Sellers", href: "/products/best-sellers" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  social: [
    {
      name: "Github",
      href: "https://github.com/nithin-raj-9100/cartverse",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="space-y-8 xl:col-span-2">
            <div className="flex items-center space-x-2">
              <img
                alt="CartVerse Logo"
                src="/logo1.webp"
                className="h-12 w-auto"
              />
            </div>

            <p className="text-sm leading-6 text-gray-600">
              Discover a universe of amazing products at unbeatable prices. Join
              our community for exclusive deals and updates.
            </p>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-x-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1"
                />
                <Button>Subscribe</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">
                  123 Commerce St, Shopping City, 12345
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <span className="text-sm">+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <span className="text-sm">support@cartverse.com</span>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 xl:col-span-3 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Shop</h3>
              <ul className="mt-6 space-y-4">
                {footerNavigation.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Support</h3>
              <ul className="mt-6 space-y-4">
                {footerNavigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <ul className="mt-6 space-y-4">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <Link
                to={footerNavigation.social[0].href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Github</span>
                <svg
                  className="h-6 w-6"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
              </Link>
              <span className="text-sm text-gray-500">
                Source code available on Github
              </span>
            </div>

            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} CartVerse, Inc. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

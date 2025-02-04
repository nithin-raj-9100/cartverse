import { Facebook, Instagram, Github, Youtube } from "lucide-react";
import { Link } from "react-router";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Terms & Conditions", href: "/terms-conditions" },
  { name: "Shipping & Return Policy", href: "/shipping-return-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "FAQ", href: "/frequently-asked-questions" },
];

const Footer = () => {
  return (
    <footer className=" text-black" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-white rounded-lg" />
              <span className="text-black font-semibold">CartVerse</span>
            </div>
          </div>

          <nav
            className="md:col-span-6 md:col-start-4"
            aria-label="Footer navigation"
          >
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Link
                to="https://github.com/nithin-raj-9100/cartverse"
                className="text-sm hover:text-gray-300 transition-colors"
              >
                View the source
              </Link>
              <span className="text-gray-600">|</span>
              <span className="text-sm">
                © 2023-2025 CartVerse, Inc. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

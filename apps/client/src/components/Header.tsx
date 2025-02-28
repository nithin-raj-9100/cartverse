// [ ] Internal Imports
import Navbar from "./Navbar";
import { CartIcon } from "@/components/cart/cart-icon";

const Header = ({ data }: { data: any }) => {
  const { user } = data || {};
  // @ts-ignore
  const userName = user?.name | "Guest";

  return <Navbar data={data} />;
};

export default Header;

// [ ] Internal Imports
import Navbar from "./Navbar";

const Header = ({ data }: { data: any }) => {
  const { user } = data || {};
  // @ts-ignore
  const userName = user?.name | "Guest";

  return (
    <div>
      <Navbar data={data} />
    </div>
  );
};

export default Header;

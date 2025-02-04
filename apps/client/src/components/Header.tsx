// [ ] Internal Imports
import Navbar from "./Navbar";

const Header = ({ data }: { data: any }) => {
  const { status, user } = data || {};
  // @ts-ignore
  const userName = user?.name | "Guest";

  console.log("status", status);
  console.log("user", userName);

  return (
    <div>
      <Navbar data={data} />
    </div>
  );
};

export default Header;

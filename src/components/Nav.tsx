import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex">
      <Link
        to="/doc"
        className="p-4 text-2xl text-white underline font-lacquer"
      >
        Doc
      </Link>
      <Link
        className="p-4 text-2xl text-white underline cursor-pointer font-lacquer"
        to="/about"
      >
        About
      </Link>
    </div>
  );
};

export default Nav;

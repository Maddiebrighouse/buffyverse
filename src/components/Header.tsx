import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="mx-64 pb-96">
      <img
        className="absolute ml-32 w-96 left-96"
        src="src/assets/header/moon.png"
        alt="Buffy the Vampire Slayer"
      />
      <img
        className="absolute w-1/3 opacity-50 top-40 mix-blend-lighten right-60"
        src="https://www.pngmart.com/files/11/Storm-Cloud-PNG.png"
        alt="Buffy the Vampire Slayer"
      />
      <Link to="/">
        <img
          className="absolute w-1/3 mt-20 ml-64"
          src="src/assets/header/title.png"
          alt="Buffy the Vampire Slayer"
        />
      </Link>
      <div className="absolute top-4 right-6">
        <Nav />
      </div>
    </div>
  );
};
export default Header;

import React from "react";
import almabetterlogo from "./assets/almalogo.png";

const Navbar = () => {
  return (
    <div>
      <nav className="px-10 py-5 bg-white shadow-md">
        <div className="w-48">
          <img src={almabetterlogo} alt="logo" className="inline-block" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

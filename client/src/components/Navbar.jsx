import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ bgColor }) => {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 font-medium transition-colors hover:underline duration-300 ${
      isActive ? "text-purple-400" : "text-white/70 hover:text-purple-400"
    }`;
  return (
    <>
      <nav className={`${bgColor} py-3 flex items-center px-10 z-50 relative`}>
        <div>
          <NavLink to="/">

          <h1 className="bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-400 pl-16 font-bold text-2xl bg-clip-text text-transparent ml-18">PlayPort</h1>
          </NavLink>
        </div>
        <div className="flex justify-center flex-1">
          <NavLink to="/games" className={navLinkClass}>
            Games
          </NavLink>
          <NavLink to="/bundles" className={navLinkClass}>
            Bundle
          </NavLink>
          <NavLink to="/support" className={navLinkClass}>
            Support
          </NavLink>
        </div>
        {/* Login */}
        <div>
          <button
          className="px-6 bg-purple-700 mx-5 py-2 rounded-4xl font-semibold text-white"
          >Sign In</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

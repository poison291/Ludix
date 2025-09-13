import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 font-medium transition-colors duration-300 ${
      isActive ? "text-purple-400" : "text-white/70 hover:text-purple-400"
    }`;
  return (
    <>
      <nav className="bg-primary py-3 flex items-center px-10">
        <div>
          <h1 className="bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-400 pl-16 font-bold text-2xl bg-clip-text text-transparent">PlayPort</h1>
        </div>
        <div className="flex justify-center flex-1">
          <NavLink to="/game" className={navLinkClass}>
            Games
          </NavLink>
          <NavLink to="/bundle" className={navLinkClass}>
            Bundle
          </NavLink>
          <NavLink to="/support" className={navLinkClass}>
            Support
          </NavLink>
        </div>
        {/* Login */}
        <div>
          <button
          className="px-6 bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-400 mx-5 py-2 rounded-4xl font-semibold text-white"
          >Sign In</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

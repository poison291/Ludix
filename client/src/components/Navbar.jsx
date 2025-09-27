import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = ({ bgColor }) => {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 font-medium transition-colors hover:underline duration-300 ${
      isActive ? "text-purple-400" : "text-white/70 hover:text-purple-400"
    }`;

  return (
    <nav
      className={`${bgColor} py-3 flex items-center justify-between px-10 z-50 relative`}
    >
      {/* Logo */}
      <div>
        <NavLink to="/">
          <h1 className="bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-400 font-bold text-2xl bg-clip-text text-transparent">
            PlayPort
          </h1>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-2">
        <NavLink to="/games" className={navLinkClass}>
          Games
        </NavLink>
        <NavLink to="/games/toprated" className={navLinkClass}>
          Top Rated
        </NavLink>
        <NavLink to="/support" className={navLinkClass}>
          Support
        </NavLink>
      </div>

      {/* Authentication */}
      <div className="flex items-center">
        <button className="px-6 py-2 bg-purple-700 hover:bg-purple-600 transition-colors duration-300 rounded-full font-semibold text-white">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

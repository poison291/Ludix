/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const fullPathNames = ["Home", ...pathnames];

  return (
    <nav className="flex items-center text-gray-400 text-sm mt-4 space-x-1">
      {fullPathNames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index).join("/");

        return (
          <span key={index} className="flex items-center">
            <NavLink
              to={index === 0 ? "/" : routeTo}
              className="hover:text-white transition-colors"
            >
              {name.replace(/-/g, " ")}
            </NavLink>
            {index < fullPathNames.length - 1 && (
              <span className="text-gray-500 mx-1">{">>"}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;

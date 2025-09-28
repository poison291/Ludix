import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const BreadCrumbs = ({ title }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const fullPathNames = ["Home", ...pathnames];

  return (
    <nav className="flex items-center text-sm text-gray-400 space-x-2">
      {fullPathNames.map((name, index) => {
        const routeTo =
          index === 0 ? "/" : "/" + pathnames.slice(0, index).join("/");
        const isLast = index === fullPathNames.length - 1;
        const displayName =
          isLast && title ? title : name.replace(/-/g, " ");

        return (
          <span key={index} className="flex items-center">
            {!isLast ? (
              <NavLink
                to={routeTo}
                className="hover:text-white transition-colors"
              >
                {displayName}
              </NavLink>
            ) : (
              <span className="text-white font-medium">{displayName}</span>
            )}
            {index < fullPathNames.length - 1 && (
              <span className="mx-2 text-gray-500">/</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;

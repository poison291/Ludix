import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from "../pages/Landing";
import Test from "../pages/Test";
import Bundle from "../pages/Bundle";
import Games from "../pages/Games";
import GameDetail from "../pages/GameDetail";
import AdminDashboard from "../Admin/AdminDashboard";

const Approutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/bundles",
      element: <Bundle />,
    },
    {
      path: "/games",
      element: <Games />,
    },
    {
      path: '/games/:id',
      element: <GameDetail/>
    },
    {
      path: '/admin',
      element: <AdminDashboard/>
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Approutes;

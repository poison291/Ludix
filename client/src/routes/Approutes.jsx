import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from "../pages/Landing";
import Test from "../pages/Test";
import Games from "../pages/Games";
import GameDetail from "../pages/GameDetail";
import AdminDashboard from "../Admin/AdminDashboard";
import TopRated from "../pages/TopRated";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/Signup";

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
      path: "/games/toprated",
      element: <TopRated />,
    },
    {
      path: "/games",
      element: <Games />,
    },
    {
      path: "/games/:id",
      element: <GameDetail />,
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
    },
    {

      path: "/login",
      element: <SignIn/>
    },
    {
      path: "/register",
      element: <SignUp />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Approutes;

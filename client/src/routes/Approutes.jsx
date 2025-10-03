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
import ReportForm from "../pages/ReportForm";
import NotFound from "../pages/404";

const Approutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "*",
      element: <NotFound/>
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
    },
    {

      path: "/reports",
      element: <ReportForm />
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Approutes;

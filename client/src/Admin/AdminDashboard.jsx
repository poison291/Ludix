import {
  Gamepad2,
  LayoutDashboard,
  ShoppingCart,
  UserRoundIcon,
  ChartNoAxesCombined,
  Bell,
  Settings,
} from "lucide-react";
import React, { useState } from "react";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Games from "./Pages/AddGames";
import SettingPage from "./Pages/SettingPage";
import Orders from "./Pages/Orders";
import Analytics from "./Pages/Analytics";

const AdminDashboard = () => {
  const menuItem = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Games", icon: <Gamepad2 size={18} /> },
    { name: "Orders", icon: <ShoppingCart size={18} /> },
    { name: "Users", icon: <UserRoundIcon size={18} /> },
    { name: "Analytics", icon: <ChartNoAxesCombined size={18} /> },
    { name: "Setting", icon: <Settings size={18} /> },
  ];

  const Pagecomponent = {
    Dashboard: <Dashboard />,
    Games: <Games />,
    Orders: <Orders />,
    Users: <Users/>,
    Analytics: <Analytics />,
    Setting: <SettingPage />,
  };

  const [activePage, setactivePage] = useState("Games");

  console.log(`Active Page: ${activePage}`);
  return (
    <>
      <div className="flex">
        {/* sidebar */}
        <div className="w-64 h-screen bg-white shadow-2xl flex-col flex fixed text-gray-700">
          <h1 className="font-bold text-xl pt-5 ml-9 flex gap-2 mb-12 text-black">
            <Gamepad2 className="mt-1" />
            GameStore
          </h1>

          <nav className="flex flex-col gap-4">
            {menuItem.map((item) => (
              <button
                key={item.name}
                onClick={() => setactivePage(item.name)}
                className={`flex items-center gap-2 p-2 hover:bg-gray-200 rounded-xl mx-5 px-4 py-3 cursor-pointer ${
                  activePage === item.name
                    ? "bg-purple-100 font-semibold border-r-2 border-purple-500 text-purple-500"
                    : ""
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1 ml-64 min-h-screen bg-gray-100">
          <div className="flex justify-between items-center p-4 bg-white shadow-xl">
            <h2 className="text-2xl font-semibold">{activePage}</h2>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-200 rounded-full">
                <Bell size={24} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <button className="p-2 hover:bg-gray-200 rounded-full">
                <UserRoundIcon size={24} />
              </button>
            </div>
          </div>
            <hr  className="text-gray-200"/>

          <div className=" bg-white ">
            {Pagecomponent[activePage]}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

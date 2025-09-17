import React from "react";
import { useState } from "react";
import { Plus, Search, Funnel } from "lucide-react";
import gamedata from "../games.json";

const Games = () => {
  const [game, setgame] = useState(gamedata);

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-5">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Games Management</h1>
          <button className="bg-purple-600 px-5 flex items-center text-white py-2 rounded-lg font-semibold">
            <Plus className="h-5 w-5 mr-2" />
            Add New Games
          </button>
        </div>

        <div className="bg-white rounded-xl p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Games"
                className="w-full border p-2 rounded-lg pl-10 "
              />
            </div>
            <button className="border border-gray-300 px-5 flex items-center rounded-lg py-2">
              <Funnel className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>
          <div>
            <hr className="w-full border-gray-200" />
            <div>
              <div className="grid grid-cols-[2fr_1fr_1fr_0.5fr_0.5fr_0.5fr_1fr] text-gray-700 font-semibold py-4 mr-10">
                <h1>Games</h1>
                <h1>Genre</h1>
                <h1>Price</h1>
                <h1>Stock</h1>
                <h1>Rating</h1>
                <h1>Status</h1>
                <h1>Actions</h1>
              </div>
              <hr className="w-full border-gray-200" />
              {game.map((game) => (
                <div
                  className="grid grid-cols-[2fr_1fr_1fr_0.5fr_0.5fr_0.5fr_1fr] text-black font-semibold py-4 mr-10"
                  key={game.id}
                >
                  <h1>{game.title}</h1>
                  <h1>{game.category}</h1>
                  <h1> {game.price}</h1>
                  <h1>{game.stock}</h1>
                  <h1>{game.rating}</h1>
                  <h1 className="bg-green-500 pl-5 rounded-2xl">{game.status && "Active"}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;

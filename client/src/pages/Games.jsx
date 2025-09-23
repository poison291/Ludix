import React, { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { getGame } from "../Api/gameApi";
import { Loader } from "../components/Loader";

const Games = () => {
  const [gameData, setgameData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getGame();
      if (result.success) {
        setgameData(result.data);
      }
      setloading(false);
    }
    fetchData();
  }, []);

  const visibleGames = gameData.filter((game) => game.visible === true);

  if (loading) return <Loader />;

  return (
    <div className="bg-[#0e171b] min-h-screen px-6 py-6">
      <div className="mb-10">
        <BreadCrumbs />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {visibleGames.map((game) => (
          <div
            key={game.id}
            className="group text-white flex flex-col bg-[#1b242b] rounded-2xl border border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
          >
            <div className="relative w-full overflow-hidden">
              <img
                src={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.image}/hero_capsule.jpg`}
                alt={game.title}
                className="w-full  object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-3">
              <h1 className="font-semibold text-base mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-purple-400">
                {game.title}
              </h1>
              <h2 className="text-base font-bold text-green-400 mb-3">
                Nrs. {game.price}
              </h2>
              <button className="w-full py-2 text-sm rounded-lg bg-purple-700 font-medium transition-all duration-200 hover:bg-purple-600 active:scale-95">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;

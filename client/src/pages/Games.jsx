import React, { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { getGame } from "../Api/gameApi";
import { LineWaveLoader } from "../components/Loader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGameStore from "../Store/gameStore";

const Games = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const games = useGameStore((state) => state.games) ;
  const loading = useGameStore((state) => state.loading.games);
  const fetchedGames = useGameStore((state) => state.fetchedGames);

  useEffect(() => {
    fetchedGames();
  }, [fetchedGames]);

  const handleClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  const visibleGames = games.filter((game) => game.visible === true);

  if (loading) return <LineWaveLoader />;

  return (
    <div className="bg-[#0e171b] min-h-screen px-6 py-6">
      <div className="mb-10">
        <BreadCrumbs />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-20">
        {visibleGames.map((game) => (
          <div
            key={game.id}
            onClick={() => handleClick(game.id)}
            className="group mb-10 text-white flex flex-col bg-[#1b242b] rounded-2xl border border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-3"
          >
            <div className="relative w-full overflow-hidden">
              <img
                src={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.image}/hero_capsule.jpg`}
                alt={game.title}
                className="w-full h-auto  object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-3">
              <h1 className="font-semibold text-base mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-purple-400">
                {game.title}
              </h1>
              <h2 className="text-base font-bold text-green-400 mb-3">
                Nrs. {game.price}
              </h2>
              <button className="w-full py-2 text-sm rounded-lg bg-green-700 font-medium transition-all duration-200 hover:bg-purple-800 active:scale-95 cursor-pointer">
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

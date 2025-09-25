import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGameDetails } from "../Api/gameApi";
import BreadCrumbs from "../components/BreadCrumbs";
import { LineWaveLoader } from "../components/Loader";

const GameDetail = () => {
  const { id } = useParams();
  const [gameData, setgameData] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchGameData() {
      setloading(true);
      const gameDetail = await getGameDetails(id);
      setgameData(gameDetail);
      setloading(false);
    }
    fetchGameData();
  }, [id]);

  if (loading) return <LineWaveLoader />;
  if (!gameData) return <p>Game not found!</p>;

  return (
    <>
    
    
      <div className="p-6 bg-black min-h-screen text-white">
        <div className="ml-15">
          <BreadCrumbs title={gameData.title} />
        </div>
          
        <div className="mt-10 w-auto ml-15 flex">
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameData.image}/library_600x900.jpg`}
            alt={gameData.title}
            className="w-65 h-auto saturate-105 rounded-xl shadow-xl shadow-gray-900 "
          />
          <h1 className="text-2xl font-bold ml-10">{gameData.title}</h1>
        </div>
      </div>
    </>
  );
};

export default GameDetail;

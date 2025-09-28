import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGameDetails } from "../Api/gameApi";
import BreadCrumbs from "../components/BreadCrumbs";
import { LineWaveLoader } from "../components/Loader";
import useGameStore from "../Store/gameStore";

const GameDetail = () => {
  const { id } = useParams();

  const gameDetails = useGameStore((state) => state.gameDetails[id]);
  const loading = useGameStore((state) => state.loading[id]);
  const fetchGameDetail = useGameStore((state) => state.fetchGameDetail);

  useEffect(() => {
    if (!gameDetails) {
      fetchGameDetail(id);
    }
  }, [id, gameDetails, fetchGameDetail]);

  if (loading) return <LineWaveLoader />;
  if (!gameDetails) return <p>Game not found!</p>;

  return (
    <>
      <div className="p-6 bg-black min-h-screen text-white">
        <div className="ml-15">
          <BreadCrumbs title={gameDetails.title} />
        </div>

        <div className="mt-10 w-auto ml-15 flex">
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameDetails.image}/library_600x900.jpg`}
            alt={gameDetails.title}
            className="w-65 h-auto saturate-105 rounded-xl shadow-xl shadow-gray-900 "
          />
          <h1 className="text-2xl font-bold ml-10">{gameDetails.title}</h1>
        </div>
      </div>
    </>
  );
};

export default GameDetail;

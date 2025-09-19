import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGameDetails } from "../Api/gameApi";
import BreadCrumbs from "../components/BreadCrumbs";
import Navbar from "../components/Navbar";
import { Hourglass } from "react-loader-spinner";


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

  if (loading)
    return (
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    );
  if (!gameData) return <p>Game not found!</p>;

  return (
    <>
      <div className="p-6 bg-black min-h-screen text-white">
        <Navbar />
        <div className="ml-10">
          <BreadCrumbs title={gameData.title}/>
        </div>
        <h1 className="text-3xl font-bold mb-4">{gameData.title}</h1>
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameData.image}/library_600x900.jpg`}
          alt={gameData.title}
          className="w-32 h-44 object-cover"
        />
        {/* <p className="mt-4">{game.description}</p> */}
        <p className="mt-2 font-semibold">Price: {gameData.price}</p>
      </div>
    </>
  );
};

export default GameDetail;

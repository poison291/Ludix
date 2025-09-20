import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BreadCrumbs from "../components/BreadCrumbs";
import { Link } from "react-router-dom";
import { getGame } from "../Api/gameApi";
import { Hourglass } from "react-loader-spinner";

const Games = () => {
  const [gameData, setgameData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getGame();
      if (result.success) {
        setgameData(result.data);
        // console.log(result.data.image)
      }
      setloading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          colors={["#a855f7", "#9333ea"]}
        />
      </div>
    );

  return (
    <>
      <div className="bg-[#0e171b] min-h-screen">
        <Navbar bgColor="bg-[#0e171b]" />
        <div className="ml-10">
          <BreadCrumbs />
        </div>
        <div className="p-6 text-white">
          {gameData.map((game) => (
            <Link key={game.id} to={`/games/${game.id}`}>
              <div key={game.id} className="mb-6 p-4 border rounded">
                <img
                  src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.image}/library_600x900.jpg`}
                  alt={game.title}
                  className="w-32 h-44 object-cover"
                />
                <h2 className="font-bold text-xl mt-2">{game.title}</h2>
                <p>{game.description}</p>
                <p className="mt-1 font-semibold">
                  {game.price} {game.currency}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Games;

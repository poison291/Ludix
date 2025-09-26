import React, { useEffect, useState } from "react";
import { topRated } from "../Api/gameApi";

const TopRated = () => {
  const [game, setgame] = useState([]);
  const [laoding, setlaoding] = useState(true);

  useEffect(() => {
    async function fetchTopRated() {
      const result = await topRated();

      setgame(result);

      setlaoding(false);
    }
    fetchTopRated();
  }, []);

  return (
    <>
      <div>
        {game.map((game) => (
          <div key={game.id}>
            <h1>{game.title}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopRated;

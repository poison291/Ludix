import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import BreadCrumbs from '../components/BreadCrumbs'
import { Link } from 'react-router-dom'
import games from "../data/game.json"

const Games = () => {
  const [gameData, setgameData] = useState(games)


  return (
    <>
    <div className='bg-[#0e171b] min-h-screen'>
     <Navbar bgColor="bg-[#0e171b]"/>
     <BreadCrumbs/>
    <div className="p-6 text-white">
      {gameData.map((game) => (
         <Link key={game.id} to={`/games/${game.id}`}>

        <div key={game.id} className="mb-6 p-4 border rounded">
          <img src={game.image} alt={game.title} className="w-32 h-44 object-cover" />
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
  )
}

export default Games
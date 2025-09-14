import React from 'react'
import { useParams } from 'react-router-dom'
import games from "../data/game.json"
import BreadCrumbs from '../components/BreadCrumbs'

const GameDetail = () => {
    const { id } = useParams()
    const game  = games.find((g) => g.id === id)

      if(!game) return <p>Game not found!</p>
      
  return (
   <>
  <div className="p-6 bg-black min-h-screen text-white">
    <BreadCrumbs/>
      <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
      <img src={game.image} alt={game.title} className="w-80 h-96 object-cover rounded" />
      <p className="mt-4">{game.description}</p>
      <p className="mt-2 font-semibold">
        Price: {game.price} {game.currency}
      </p>
      <p>Rating: {game.rating}</p>
      <p className="mt-2 bg-purple-700 text-white px-4 py-1 rounded-full w-max">{game.tag}</p>
    </div>
   </>
  )
}

export default GameDetail
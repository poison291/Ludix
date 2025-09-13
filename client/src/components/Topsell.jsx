/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import games from "../data/game.json"
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react';

const Topsell = () => {
    const [currentIndex, setcurrentIndex] = useState(0)
    const currentGame = games[currentIndex]

    const next = () => setcurrentIndex((i) => (i + 1) % games.length)
    const prev = () => setcurrentIndex((i) => (i - 1 + games.length) % games.length)

    
    
  return (
    <>
    
    <div className='bg-black text-white'>
        <div className='items-center justify-center text-center'>
            <h1 className='font-bold text-4xl mb-3'>Top Selling Games</h1>
            <p className='text-gray-300'>Discover the most popular games worldwide</p>
        </div>
          {/* carousel div */}
        <div className='bg-darkCard rounded-xl overflow-hidden shadow-lg bg-black relative flex'>
             <ChevronLeft />
            {/* Image div */}
            <div className='flex flex-col md:flex-row py-10 ml-40'>
                <img src={currentGame.image} alt={currentGame.title} className='rounded' />
            </div>
            <div className='py-10 ml-40'>
                <h1>{currentGame.title}</h1>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Topsell
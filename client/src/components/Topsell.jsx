import React from "react";
import games from "../data/game.json";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect } from "react";

const Topsell = () => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const currentGame = games[currentIndex];

  const next = () => setcurrentIndex((i) => (i + 1) % games.length);
  const prev = () =>
    setcurrentIndex((i) => (i - 1 + games.length) % games.length);

  //autoplay function
  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-black h-screen text-white pt-20">
        <div className="items-center justify-center text-center mb-10">
          <h1 className="font-bold text-4xl mb-3">Top Selling Games</h1>
          <p className="text-gray-300">
            Discover the most popular games worldwide
          </p>
        </div>
        {/* carousel div */}
        <div className="bg-darkCard rounded-xl select-none overflow-hidden shadow-lg relative flex justify-center mb-10 bg-black">
          <div className="flex items-center mr-20">
            <ChevronLeft
              onClick={prev}
              size={40}
              className="bg-black rounded-full "
            />
          </div>
          {/* Image div */}
          <div className="flex flex-col md:flex-row py-10">
            <img
              src={currentGame.image}
              alt={currentGame.title}
              className="rounded-2xl w-80 h-96 object-cover hover:scale-105  duration-200"
            />
          </div>
          <div className="py-10 ml-20">
            <h1 className="text-3xl font-bold mb-5">{currentGame.title}</h1>
            <p className="w-130">{currentGame.description}</p>

            <div className="flex items-center gap-2 mt-8">
              <Star className="w-6 h-6 text-yellow-400" fill="currentcolor" />
              <span>{currentGame.rating} Rating</span>
              <span className="bg-purple-700 px-5 ml-5 rounded-4xl font-semibold">
                {currentGame.tag}
              </span>
            </div>
            <div>
              <button className="bg-purple-700 cursor-pointer px-6 py-3 font-semibold mt-12 rounded-xl">
                Enroll Now
              </button>
            </div>
          </div>
          <div className="flex items-center ml-20">
            <ChevronRight
              onClick={next}
              size={40}
              className="bg-black rounded-full "
            />
          </div>
        </div>
        <div className="flex justify-center mt-6 gap-3">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setcurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-purple-500 scale-125 shadow-lg shadow-purple-500/50"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Topsell;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const GameCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const games = [
    {
      id: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      rating: 4.9,
      sales: "31M+ sold",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
      genre: "Action-Adventure",
      description: "An epic adventure in the kingdom of Hyrule awaits in this critically acclaimed open-world game."
    },
    {
      id: 2,
      title: "Grand Theft Auto V",
      rating: 4.7,
      sales: "185M+ sold",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
      genre: "Action",
      description: "Experience the intertwining stories of three unique criminals plotting a series of daring heists."
    },
    {
      id: 3,
      title: "Minecraft",
      rating: 4.8,
      sales: "300M+ sold",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=400&fit=crop",
      genre: "Sandbox",
      description: "Build, explore, and survive in randomly generated worlds limited only by your imagination."
    },
    {
      id: 4,
      title: "Call of Duty: Modern Warfare II",
      rating: 4.5,
      sales: "25M+ sold",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=400&fit=crop",
      genre: "FPS",
      description: "Experience the ultimate first-person shooter with realistic combat and intense multiplayer action."
    },
    {
      id: 5,
      title: "Elden Ring",
      rating: 4.9,
      sales: "20M+ sold",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop",
      genre: "RPG",
      description: "Journey through the Lands Between in this dark fantasy action RPG from FromSoftware."
    },
    {
      id: 6,
      title: "FIFA 24",
      rating: 4.3,
      sales: "15M+ sold",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
      genre: "Sports",
      description: "The world's game comes to life with enhanced realism and authentic football experience."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentGame = games[currentIndex];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Top Selling Games</h2>
        <p className="text-purple-200">Discover the most popular games worldwide</p>
      </div>

      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          {/* Game Card */}
          <div className="flex">
            {/* Game Image */}
            <div className="w-2/5 relative">
              <img 
                src={currentGame.image} 
                alt={currentGame.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50"></div>
              
              {/* Sales Badge */}
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {currentGame.sales}
              </div>
            </div>

            {/* Game Info */}
            <div className="w-3/5 p-8 flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-sm text-purple-300 bg-purple-900/50 px-3 py-1 rounded-full">
                  {currentGame.genre}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">{currentGame.title}</h3>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {currentGame.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-semibold text-lg">{currentGame.rating}</span>
                <span className="text-gray-400">rating</span>
              </div>

              {/* Action Button */}
              <div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-all duration-200 font-semibold text-lg hover:scale-105 shadow-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-20 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-20 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-6">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-purple-500 scale-125 shadow-lg shadow-purple-500/50'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GameCarousel;


import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BreadCrumbs from "../components/BreadCrumbs";
import { Link } from "react-router-dom";
import { getGame } from "../Api/gameApi";
import { Hourglass } from "react-loader-spinner";
import { Star, Filter, Grid3X3, List } from "lucide-react";

const Games = () => {
  const [gameData, setgameData] = useState([]);
  const [loading, setloading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    async function fetchData() {
      const result = await getGame();
      if (result.success) {
        setgameData(result.data);
      }
      setloading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0e171b]">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          colors={["#a855f7", "#9333ea"]}
        />
      </div>
    );

  // Filter and sort games
  const visibleGames = gameData
    .filter((game) => game.visible === true)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="bg-[#0e171b] min-h-screen">
      <Navbar bgColor="bg-[#0e171b]" />
      <div className="ml-10">
        <BreadCrumbs />
      </div>

      <div className="px-6 pb-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Featured Games</h1>
          <p className="text-gray-400">Discover amazing games at great prices</p>
        </div>

        {/* Filter/Sort Bar */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-gray-400">
            <span className="text-white font-semibold">{visibleGames.length}</span> games available
          </div>
          
          <div className="flex gap-4 items-center">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1a252b] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Sort by Rating</option>
            </select>
            
            <div className="flex bg-[#1a252b] rounded-lg border border-gray-600">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-l-lg ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-r-lg ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Games Display */}
        {viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {visibleGames.map((game) => (
              <Link key={game.id} to={`/games/${game.id}`}>
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-[#1a252b] rounded-xl overflow-hidden shadow-lg border border-gray-700 group-hover:border-purple-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                    
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <img
                        src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.image}/library_600x900.jpg`}
                        alt={game.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Rating Badge */}
                      {game.rating && (
                        <div className="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          {game.rating}
                        </div>
                      )}
                      
                      {/* Stock Status */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          game.stock > 10 
                            ? "bg-green-500/80 text-white" 
                            : game.stock > 0 
                            ? "bg-yellow-500/80 text-white" 
                            : "bg-red-500/80 text-white"
                        }`}>
                          {game.stock > 10 ? "In Stock" : game.stock > 0 ? "Low Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {game.title}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-white font-bold text-xl">
                          Nrs.{game.price}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Stock: {game.stock}
                        </div>
                      </div>
                      
                      {/* Categories */}
                      {game.categories && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {game.categories.slice(0, 2).map((category, index) => (
                            <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Action Button */}
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {visibleGames.map((game) => (
              <Link key={game.id} to={`/games/${game.id}`}>
                <div className="bg-[#1a252b] rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition-colors group">
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.image}/library_600x900.jpg`}
                      alt={game.title}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-400 transition-colors">
                        {game.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 mb-2">
                        {game.rating && (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={16} className="fill-current" />
                            <span>{game.rating}</span>
                          </div>
                        )}
                        <span className="text-gray-400">Stock: {game.stock}</span>
                      </div>
                      
                      {game.categories && (
                        <div className="flex flex-wrap gap-2">
                          {game.categories.slice(0, 3).map((category, index) => (
                            <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white font-bold text-2xl mb-2">
                        Nrs.{game.price}
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
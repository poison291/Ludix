import React from "react";
import { useState, useEffect } from "react";
import { Plus, Search, Funnel, Pencil, Trash2, Dice1 } from "lucide-react";
import { getGame } from "../../Api/gameApi";
import { getGameDetails } from "../../Api/gameApi";
import CategoryDropdown from "../Components/CategoryDropDown";
import { deleteGame } from "../../Api/gameApi";
import { Loader, BallLoader } from "../../components/Loader";

const AddGames = () => {
  const [game, setGame] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);

  // Getting List of games
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getGame();
        if (result.success) {
          setGame(result.data);
          setFilteredGames(result.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(`Failed to fetch game data in admin panel`);
      }
    }
    fetchData();
  }, []);

  // Combined filtering effect for search + category
  useEffect(() => {
    let filtered = game;

    // Filter by category if not 'All Categories'
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (gameItem) =>
          gameItem.categories && gameItem.categories.includes(selectedCategory)
      );
    }

    // Filter by search term if present
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((g) =>
        g.title.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredGames(filtered);
  }, [searchTerm, selectedCategory, game]);

  // Category selection handler just updates the state variable
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;

    try {
      const result = await deleteGame(id);
      if (result.success) {
        setFilteredGames((prev) => prev.filter((game) => game.id !== id));
        setGame((prev) => prev.filter((game) => game.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };


  return (
    <>
      <div className="bg-gray-100 min-h-screen p-5">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Games Management</h1>
          <button className="bg-purple-600 px-5 flex items-center text-white py-2 rounded-lg font-semibold">
            <Plus className="h-5 w-5 mr-2" />
            Add New Games
          </button>
        </div>

        <div className="bg-white rounded-xl p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Games"
                value={searchTerm}
                className="w-full border p-2 rounded-lg pl-10 "
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <CategoryDropdown onSelectCategory={handleCategorySelect} />
          </div>

          <div>
            <hr className="w-full border-gray-200" />

            {/* Header Row with Flexbox */}
            <div className="flex text-gray-700 font-semibold py-4">
              <h1 className="p-2 w-2/6">Games</h1>
              <h1 className="p-2 w-1/6">Price</h1>
              <h1 className="p-2 w-1/12">Stock</h1>
              <h1 className="p-2 w-1/12">Rating</h1>
              <h1 className="p-2 w-1/6">Status</h1>
              <h1 className="p-2 w-1/6">Actions</h1>
            </div>

            <hr className="w-full border-gray-200" />

            {/* Game Data Rows with Flexbox */}
            {loading ? (
              <BallLoader />
            ) : (
              filteredGames.map((gameItem) => (
                <div key={gameItem.id}>
                  <div className="flex items-center text-black py-4 ">
                    <img
                      src={`https://cdn.akamai.steamstatic.com/steam/apps/${gameItem.image}/library_600x900.jpg`}
                      alt={gameItem.title}
                      className="w-8 rounded-sm"
                    />
                    <h1 className="p-2 w-2/6 font-semibold">
                      {gameItem.title}
                      <p className="text-sm text-gray-600 font-normal">
                        {gameItem.developer}
                      </p>
                    </h1>

                    <h1 className="p-2 w-1/6 ">Nrs.{gameItem.price}</h1>
                    <h1 className="p-2 w-1/12">{gameItem.stock}</h1>
                    <h1 className="p-2 w-1/12 text-yellow-600">
                      ★ {gameItem.rating}
                    </h1>

                    <div className="p-2 mr-6 w-1/6">
                      {gameItem.visible ? (
                        <span className="inline-block bg-green-300 font-semibold rounded-full px-3 py-1 text-xs text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block bg-red-300 rounded-full font-semibold px-3 py-1 text-xs text-red-800">
                          Hidden
                        </span>
                      )}
                    </div>

                    <div className="flex w-1/6 gap-2 text-gray-500">
                      <div className="p-2 rounded-full hover:bg-blue-100 transition-colors cursor-pointer group">
                        <Pencil className="h-5 w-5 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div
                        onClick={() => handleDelete(gameItem.id)}
                        className="p-2 rounded-full hover:bg-red-100 transition-colors cursor-pointer group"
                      >
                        <Trash2 className="h-5 w-5 group-hover:text-red-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                  <hr className="w-full border-gray-200" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGames;

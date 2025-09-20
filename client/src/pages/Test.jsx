import React, { useState, useEffect } from "react";
import { Plus, Search, Edit3, Trash2, Eye, X, Save, Filter, MoreVertical, Package, TrendingUp, Users, DollarSign } from "lucide-react";

const AdminGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentGame, setCurrentGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or table

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    categories: [],
    description: "",
    stock: "",
    visible: true,
    platforms: [],
    tags: [],
    release_date: "",
    developer: "",
    publisher: "",
    rating: ""
  });

  const availableCategories = ["Action", "Adventure", "RPG", "Strategy", "Simulation", "Sports", "Racing", "Puzzle"];
  const availablePlatforms = ["PC", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X/S", "Nintendo Switch"];

  // API Functions
  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/games');
      const result = await response.json();
      if (result.success) {
        setGames(result.data);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const createGame = async (gameData) => {
    try {
      const response = await fetch('http://localhost:5001/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData),
      });
      const result = await response.json();
      if (result.success) {
        fetchGames();
        return true;
      }
    } catch (error) {
      console.error('Error creating game:', error);
    }
    return false;
  };

  const updateGame = async (id, gameData) => {
    try {
      const response = await fetch(`http://localhost:5001/api/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData),
      });
      const result = await response.json();
      if (result.success) {
        fetchGames();
        return true;
      }
    } catch (error) {
      console.error('Error updating game:', error);
    }
    return false;
  };

  const deleteGame = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/games/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        fetchGames();
        return true;
      }
    } catch (error) {
      console.error('Error deleting game:', error);
    }
    return false;
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Filter games
  useEffect(() => {
    let filtered = games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.developer?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || 
                             game.categories?.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
    setFilteredGames(filtered);
  }, [games, searchTerm, selectedCategory]);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "", price: "", image: "", categories: [], description: "",
      stock: "", visible: true, platforms: [], tags: [], release_date: "",
      developer: "", publisher: "", rating: ""
    });
  };

  const openModal = (mode, game = null) => {
    setModalMode(mode);
    setCurrentGame(game);
    if (mode === "add") {
      resetForm();
    } else if (mode === "edit" && game) {
      setFormData({...game, tags: game.tags || []});
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating)
    };
    
    const success = modalMode === "add" 
      ? await createGame(gameData)
      : await updateGame(currentGame.id, gameData);
    
    if (success) setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this game permanently?")) {
      await deleteGame(id);
    }
  };

  // Stats calculations
  const stats = {
    total: games.length,
    active: games.filter(g => g.visible).length,
    totalValue: games.reduce((sum, g) => sum + (g.price * g.stock), 0),
    lowStock: games.filter(g => g.stock < 10).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Games Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your game inventory</p>
            </div>
            <button
              onClick={() => openModal("add")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Game
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Games</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">
                Showing {filteredGames.length} of {games.length} games
              </p>
            </div>
          </div>
        </div>

        {/* Games Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <div key={game.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.image}/library_600x900.jpg`}
                    alt={game.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                    onError={(e) => {
                      e.target.src = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.image}/header.jpg`;
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      game.visible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {game.visible ? "Active" : "Hidden"}
                    </span>
                  </div>
                  {game.stock < 10 && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                        Low Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{game.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{game.developer}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-green-600">${game.price}</span>
                    <span className="text-sm text-gray-500">Stock: {game.stock}</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {game.categories?.slice(0, 2).map((cat, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-yellow-500">
                      ★ {game.rating}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openModal("view", game)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal("edit", game)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(game.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Game</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGames.map((game) => (
                  <tr key={game.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.image}/library_600x900.jpg`}
                          alt={game.title}
                          className="w-10 h-14 object-cover rounded mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{game.title}</div>
                          <div className="text-gray-500 text-sm">{game.developer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">${game.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{game.stock}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">★ {game.rating}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        game.visible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {game.visible ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => openModal("edit", game)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(game.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredGames.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No games found</h3>
            <p className="text-gray-500">Try adjusting your search or add a new game.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">
                {modalMode === "add" ? "Add New Game" : 
                 modalMode === "edit" ? "Edit Game" : "Game Details"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalMode === "view" ? (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <img
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame?.image}/library_600x900.jpg`}
                    alt={currentGame?.title}
                    className="w-full max-w-xs mx-auto rounded-lg"
                  />
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold">{currentGame?.title}</h3>
                      <p className="text-gray-600">{currentGame?.developer}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Price</span>
                        <p className="text-xl font-semibold text-green-600">${currentGame?.price}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Stock</span>
                        <p className="text-xl font-semibold">{currentGame?.stock}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{currentGame?.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Steam App ID *</label>
                    <input
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stock *</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Developer *</label>
                    <input
                      name="developer"
                      value={formData.developer}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Publisher *</label>
                    <input
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Release Date *</label>
                    <input
                      type="date"
                      name="release_date"
                      value={formData.release_date}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating (0-5) *</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Categories *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {availableCategories.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.categories.includes(category)}
                            onChange={() => handleArrayChange('categories', category)}
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Platforms *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {availablePlatforms.map((platform) => (
                        <label key={platform} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.platforms.includes(platform)}
                            onChange={() => handleArrayChange('platforms', platform)}
                          />
                          <span className="text-sm">{platform}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="visible"
                        checked={formData.visible}
                        onChange={handleInputChange}
                      />
                      <span className="text-sm font-medium">Visible to customers</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {modalMode === "add" ? "Create" : "Update"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGames;
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, ShoppingCart, Gamepad2, DollarSign, TrendingUp, 
  Plus, Edit, Trash2, Search, Filter, Eye, Settings,
  Package, Star, Calendar, Bell, Menu, X
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('games');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data
  const salesData = [
    { month: 'Jan', sales: 45000, orders: 120 },
    { month: 'Feb', sales: 52000, orders: 140 },
    { month: 'Mar', sales: 48000, orders: 130 },
    { month: 'Apr', sales: 61000, orders: 165 },
    { month: 'May', sales: 67000, orders: 180 },
    { month: 'Jun', sales: 74000, orders: 200 }
  ];

  const gameGenres = [
    { name: 'Action', value: 35, color: '#8B5CF6' },
    { name: 'RPG', value: 25, color: '#06B6D4' },
    { name: 'Strategy', value: 20, color: '#10B981' },
    { name: 'Sports', value: 12, color: '#F59E0B' },
    { name: 'Other', value: 8, color: '#EF4444' }
  ];

  const games = [
    { id: 1, title: 'Cyberpunk 2077', genre: 'RPG', price: 59.99, stock: 150, status: 'Active', rating: 4.2 },
    { id: 2, title: 'FIFA 24', genre: 'Sports', price: 69.99, stock: 89, status: 'Active', rating: 4.5 },
    { id: 3, title: 'Call of Duty MW3', genre: 'Action', price: 69.99, stock: 200, status: 'Active', rating: 4.3 },
    { id: 4, title: 'Baldurs Gate 3', genre: 'RPG', price: 59.99, stock: 75, status: 'Active', rating: 4.8 },
    { id: 5, title: 'Starfield', genre: 'RPG', price: 69.99, stock: 120, status: 'Active', rating: 3.9 }
  ];

  const orders = [
    { id: '#ORD-001', customer: 'John Smith', game: 'Cyberpunk 2077', amount: '$59.99', status: 'Completed', date: '2024-09-14' },
    { id: '#ORD-002', customer: 'Sarah Johnson', game: 'FIFA 24', amount: '$69.99', status: 'Processing', date: '2024-09-13' },
    { id: '#ORD-003', customer: 'Mike Wilson', game: 'Call of Duty MW3', amount: '$69.99', status: 'Shipped', date: '2024-09-13' },
    { id: '#ORD-004', customer: 'Emily Davis', game: 'Baldurs Gate 3', amount: '$59.99', status: 'Completed', date: '2024-09-12' },
    { id: '#ORD-005', customer: 'David Brown', game: 'Starfield', amount: '$69.99', status: 'Processing', date: '2024-09-12' }
  ];

  const users = [
    { id: 1, name: 'John Smith', email: 'john@email.com', orders: 12, spent: '$720', joined: '2023-01-15', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', orders: 8, spent: '$480', joined: '2023-03-22', status: 'Active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', orders: 15, spent: '$900', joined: '2022-11-10', status: 'Active' },
    { id: 4, name: 'Emily Davis', email: 'emily@email.com', orders: 6, spent: '$360', joined: '2023-06-08', status: 'Active' },
    { id: 5, name: 'David Brown', email: 'david@email.com', orders: 10, spent: '$600', joined: '2023-02-28', status: 'Inactive' }
  ];

  const StatCard = ({ title, value, icon: Icon, change, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales" 
          value="$74,250" 
          icon={DollarSign} 
          change={12.5} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Total Orders" 
          value="1,247" 
          icon={ShoppingCart} 
          change={8.2} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Games in Store" 
          value="156" 
          icon={Gamepad2} 
          change={3.1} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Active Users" 
          value="2,849" 
          icon={Users} 
          change={15.3} 
          color="bg-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
              <Line type="monotone" dataKey="sales" stroke="#8B5CF6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Genre Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gameGenres}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {gameGenres.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Game</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.game}</td>
                  <td className="py-3 px-4 font-medium">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Games Management</h2>
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add New Game
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search games..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-600">Game</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Genre</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Price</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Stock</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Rating</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.map(game => (
                <tr key={game.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <Gamepad2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{game.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{game.genre}</td>
                  <td className="py-4 px-6 font-medium">${game.price}</td>
                  <td className="py-4 px-6">
                    <span className={`${game.stock < 50 ? 'text-red-600' : 'text-green-600'}`}>
                      {game.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {game.rating}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {game.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders Management</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-600">Order ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Game</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">{order.id}</td>
                  <td className="py-4 px-6">{order.customer}</td>
                  <td className="py-4 px-6">{order.game}</td>
                  <td className="py-4 px-6 font-medium">{order.amount}</td>
                  <td className="py-4 px-6">{order.date}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users Management</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-600">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Email</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Orders</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Total Spent</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Joined</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{user.orders}</td>
                  <td className="py-4 px-6 font-medium">{user.spent}</td>
                  <td className="py-4 px-6">{user.joined}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">GameStore</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors mb-2 ${
                  activeTab === item.id
                    ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-4"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'games' && renderGames()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'analytics' && (
            <div className="text-center py-20">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600">Analytics Coming Soon</h3>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-20">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600">Settings Coming Soon</h3>
            </div>
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

  export default AdminPanel;
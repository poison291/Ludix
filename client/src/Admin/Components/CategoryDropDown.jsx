import React, { useState } from 'react';
import { Funnel, ChevronDown } from 'lucide-react';

const CategoryDropdown = ({ onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const categories = [
    "All Categories",
    "Action",
    "RPG",
    "Adventure",
    "Open World",
    "Strategy",
    "Simulation",
    "Sports",
    "Racing",
    "Puzzle",
    "Others"
  ];

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    onSelectCategory(category);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-lg border border-purple-700 shadow-sm px-4 py-2 bg-purple-800 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-purple-500 transition-colors"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Funnel className="h-5 w-5 mr-2" />
          {selectedCategory}
          <ChevronDown className={`-mr-1 ml-2 h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-purple-800 ring-1 ring-purple-700 ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => handleSelect(category)}
                className={`text-gray-200 block px-4 py-2 text-sm cursor-pointer hover:bg-purple-700 transition-colors ${
                  selectedCategory === category ? 'bg-purple-700 font-bold' : ''
                }`}
                role="menuitem"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;

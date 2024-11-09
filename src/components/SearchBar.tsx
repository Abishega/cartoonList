import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-center space-x-6 mt-6">
      <input
        type="text"
        placeholder="Search Cartoons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-6 py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-200 transform transition-all duration-300 ease-in-out hover:scale-105"
      />
      
      <button
        onClick={handleSearch}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="relative">
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 rounded-xl z-10"></span>
          Search
        </span>
      </button>
    </div>
  );
};

export default SearchBar;

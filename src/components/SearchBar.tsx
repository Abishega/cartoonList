import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-6">
      <input
        type="text"
        placeholder="Search Cartoons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}  
        className="px-6 py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-200 transform transition-all duration-300 ease-in-out hover:scale-105 w-full sm:w-auto"
      />

     
      <button
        onClick={handleSearch}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-2 hover:shadow-2xl hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 hidden sm:block"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;


// src/pages/browse.tsx
import React, { useEffect, useState } from 'react';
import { fetchCartoonList } from '../services/api';
import Card from '../components/Card';
import { Cartoon } from '../utils/types';
import SearchBar from '../components/SearchBar'; 
import Pagination from '@/components/Pagination';

const ITEMS_PER_PAGE = 20;

const Browse: React.FC = () => {
  const [cartoons, setCartoons] = useState<Cartoon[]>([]);
  const [filteredCartoons, setFilteredCartoons] = useState<Cartoon[]>([]); // State to store the filtered list
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  // Fetch cartoons list when the component mounts
  useEffect(() => {
    const loadCartoons = async () => {
      const data = await fetchCartoonList();
      setCartoons(data);
      setFilteredCartoons(data); // Initially show all cartoons
    };
    loadCartoons();
  }, []);

  // Handle search query change and filter the cartoons
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Filter cartoons based on the search query
    const filtered = cartoons.filter((cartoon) =>
      cartoon.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCartoons(filtered);
    setCurrentPage(1); // Reset to the first page when search is performed
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCartoons = filteredCartoons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredCartoons.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Cartoon List</h1>

      {/* Display cartoons in a grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCartoons.map((cartoon) => (
          <Card key={cartoon.id} cartoon={cartoon} />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default Browse;

import React, { useEffect, useState } from 'react';
import { fetchCartoonList } from '../../services/api';
import Card from '../../components/Card';
import { Cartoon } from '../../utils/types';
import SearchBar from '../../components/SearchBar';
import Pagination from '@/components/Pagination';
import Loader from '../../widgets/Loader';
import Link from 'next/link';

const ITEMS_PER_PAGE = 20;

const Browse: React.FC = () => {
  const [cartoons, setCartoons] = useState<Cartoon[]>([]); 
  const [filteredCartoons, setFilteredCartoons] = useState<Cartoon[]>([]); // Filtered cartoons based on search
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch cartoons on initial load
  useEffect(() => {
    const loadCartoons = async () => {
      const data = await fetchCartoonList();
      setCartoons(data); 
      setFilteredCartoons(data); 
      setIsLoading(false); 
    };
    loadCartoons();
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    const filtered = cartoons.filter((cartoon) =>
      cartoon.title.toLowerCase().includes(query.toLowerCase()) 
    );
    setFilteredCartoons(filtered); // Update the filtered cartoons list
    setCurrentPage(1); // Reset to the first page 
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCartoons = filteredCartoons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredCartoons.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 min-h-screen">
      <div className="flex justify-center mb-6">
        <SearchBar onSearch={handleSearch} /> 
      </div>

      <h1 className="text-4xl font-extrabold text-white text-center mb-8">Cartoon List</h1>

      {/* Conditional rendering  */}
      {isLoading ? (
        <Loader /> 
      ) : filteredCartoons.length === 0 ? (
        <>
        <div className="text-center text-white text-xl font-semibold mt-6">
          Oops! No cartoons found for your search.
        </div>
         <Link href="/browse">
         <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
           Back to Browse
         </button>
       </Link>
       </>
      ) : (
        <div>
          {/* Display filtered cartoons in a responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentCartoons.map((cartoon) => (
              <Card key={cartoon.id} cartoon={cartoon} />
            ))}
          </div>

          {/* Display pagination if there are filtered cartoons */}
          <div className="flex justify-center mt-8">
            <Pagination page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;

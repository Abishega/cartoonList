import React, { useEffect, useState } from 'react';
import { fetchCartoonList } from '../../services/api';
import Card from '../../components/Card';
import { Cartoon } from '../../utils/types';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import Loader from '../../widgets/Loader';
import Link from 'next/link';
import Button from '@/widgets/Button';

const ITEMS_PER_PAGE = 20;

const Browse: React.FC = () => {
  const [cartoons, setCartoons] = useState<Cartoon[]>([]);
  const [filteredCartoons, setFilteredCartoons] = useState<Cartoon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCartoons = async () => {
      const data = await fetchCartoonList();
      setCartoons(data);
      setFilteredCartoons(data);
      setIsLoading(false);
    };
    loadCartoons();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = cartoons.filter((cartoon) =>
      cartoon.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCartoons(filtered);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCartoons = filteredCartoons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredCartoons.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 min-h-screen">
      <div className="flex justify-center mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <h1 className="text-4xl font-extrabold text-white text-center mb-8">Cartoon List</h1>

      {isLoading ? (
        <Loader />
      ) : filteredCartoons.length === 0 ? (
        <>
          <div className="text-center text-white text-xl font-semibold mt-6">
            Oops! No cartoons found for your search.
          </div>
          <div className="flex justify-center mt-6">
            <Button text="Back to Browse" link="/cartoon/browse" />
          </div>
        </>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentCartoons.map((cartoon) => (
              <Card key={cartoon.id} cartoon={cartoon} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Pagination page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;
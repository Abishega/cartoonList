import React, { useEffect, useState } from 'react';
import { fetchCartoonList } from '../../services/api';
import { Cartoon } from '../../utils/types';
import dynamic from 'next/dynamic'; 


const Card = dynamic(() => import('../../components/Card'), { loading: () => <div>Loading...</div> });
const Pagination = dynamic(() => import('../../components/Pagination'), { loading: () => <div>Loading Pagination...</div> });
const Loader = dynamic(() => import('../../widgets/Loader'), { loading: () => <div>Loading...</div> });
const SearchBar = dynamic(() => import('../../components/SearchBar'));
const Filter = dynamic(() => import('../../widgets/Filter'));
const DownloadCSV = dynamic(() => import('../../widgets/DownLoadCSV'));

const ITEMS_PER_PAGE = 10; 
const INITIAL_LOAD_LIMIT = 50; 

const Browse: React.FC = () => {
  const [cartoons, setCartoons] = useState<Cartoon[]>([]);
  const [filteredCartoons, setFilteredCartoons] = useState<Cartoon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [genreFilter, setGenreFilter] = useState<string>('');



  useEffect(() => {
    const loadCartoons = async () => {
      setIsLoading(true);
      const data = await fetchCartoonList();
      const limitedData = data.slice(0, INITIAL_LOAD_LIMIT); // Load only a subset initially
      setCartoons(limitedData);
      setFilteredCartoons(limitedData);
      setTotalPages(Math.ceil(limitedData.length / ITEMS_PER_PAGE)); // Calculate total pages
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

  const handleGenreFilter = (genre: string | number) => {
    const id = String(genre);
    setGenreFilter(id);
    filterCartoons(id);
  };

 

  const filterCartoons = (genre: string) => {
    let filtered = cartoons;

    if (genre) {
      filtered = filtered.filter((cartoon) => cartoon.genre.includes(genre));
    }

   
    setFilteredCartoons(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE)); // Update total pages after filtering
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCartoons = filteredCartoons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const genreOptions = [
    { label: 'Action', value: 'Action' },
    { label: 'Adventure', value: 'Adventure' },
    { label: 'Comedy', value: 'Comedy' },
    { label: 'Fantasy', value: 'Fantasy' },
  ];

  const csvHeaders: (keyof Cartoon)[] = ['id', 'title', 'genre', 'rating'];

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 min-h-screen">
      <div className="flex justify-center mb-6 flex-col sm:flex-row sm:justify-between">
        <SearchBar onSearch={handleSearch} />
        <div className="flex space-x-4">
          <Filter
            label="Genre"
            filterValue={genreFilter}
            options={genreOptions}
            onChange={handleGenreFilter}
          />
          <DownloadCSV data={filteredCartoons} headers={csvHeaders} filename="cartoons.csv" />
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-white text-center mb-8">Cartoon List</h1>

      {isLoading ? (
        <Loader />
      ) : filteredCartoons.length === 0 ? (
        <div className="text-center text-white text-xl font-semibold mt-6">
          Oops! No cartoons found for your search or filter.
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {currentCartoons.map((cartoon) => (
              <Card key={cartoon.id} cartoon={cartoon} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Pagination page={currentPage} setPage={handlePageChange} totalPages={totalPages} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;

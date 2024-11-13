import React, { useEffect, useState } from 'react';
import { fetchCartoonList } from '../../services/api';
import { Cartoon } from '../../utils/interface';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('../../components/Card'), { loading: () => <div>Loading...</div> });
const Pagination = dynamic(() => import('../../components/Pagination'), { loading: () => <div>Loading Pagination...</div> });
const Loader = dynamic(() => import('../../widgets/Loader'), { loading: () => <div>Loading...</div> });
const SearchBar = dynamic(() => import('../../components/SearchBar'));
const Filter = dynamic(() => import('../../widgets/Filter'));
const DownloadCSV = dynamic(() => import('../../widgets/DownLoadCSV'));

const ITEMS_PER_PAGE = 10;
const INITIAL_LOAD_LIMIT = 50;

const genreOptions = [
  { label: 'Action', value: 'Action' },
  { label: 'Adventure', value: 'Adventure' },
  { label: 'Comedy', value: 'Comedy' },
  { label: 'Fantasy', value: 'Fantasy' },
];

const csvHeaders: (keyof Cartoon)[] = ['id', 'title', 'genre', 'rating'];

const Browse: React.FC = () => {
  const [cartoons, setCartoons] = useState<Cartoon[]>([]);
  const [filteredCartoons, setFilteredCartoons] = useState<Cartoon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [genreFilter, setGenreFilter] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCartoons = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCartoonList();
        const limitedData = data.slice(0, INITIAL_LOAD_LIMIT);
        setCartoons(limitedData);
        setFilteredCartoons(limitedData);
        setTotalPages(Math.ceil(limitedData.length / ITEMS_PER_PAGE));
      } catch (err) {
        setError('Failed to load cartoons. Please try again later.');
        console.error('Error loading cartoons:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartoons();
  }, []);

  const handleSearch = (query: string) => {
    setError(null);
    if (query.trim() === '') {
      // Reset to default cartoons when query is cleared
      setFilteredCartoons(cartoons);
      setTotalPages(Math.ceil(cartoons.length / ITEMS_PER_PAGE));
    } else {
      try {
        const filtered = cartoons.filter((cartoon) =>
          cartoon.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCartoons(filtered);
        setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
        setCurrentPage(1); // Reset to page 1 when search is done
      } catch (err) {
        setError('An error occurred during the search. Please try again.');
        console.error('Error in search:', err);
      }
    }
  };

  const handleGenreFilter = (genre: string | number) => {
    setError(null);
    try {
      const id = String(genre);
      setGenreFilter(id);
      filterCartoons(id);
    } catch (err) {
      setError('An error occurred while filtering. Please try again.');
      console.error('Error in genre filter:', err);
    }
  };

  const filterCartoons = (genre: string) => {
    setError(null);
    try {
      let filtered = cartoons;
      if (genre) {
        filtered = filtered.filter((cartoon) => cartoon.genre.includes(genre));
      }
      setFilteredCartoons(filtered);
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
      setCurrentPage(1); // Reset to the first page when a new filter is applied
    } catch (err) {
      setError('An error occurred while filtering cartoons.');
      console.error('Error filtering cartoons:', err);
    }
  };

  const handlePageChange = (newPage: number) => {
    setError(null);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    } else {
      setError('Invalid page number.');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 min-h-screen">
      <div className="flex justify-center mb-6 flex-col sm:flex-row sm:justify-between">
        <SearchBar onSearch={handleSearch} />
        <div className="flex space-x-4">
          <Filter
            label="Genre"
            filterValue={genreFilter}
            onChange={handleGenreFilter}
            options={genreOptions}
          />
          <DownloadCSV data={filteredCartoons} headers={csvHeaders} filename="cartoons.csv" />
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-white text-center mb-8">Cartoon List</h1>

      {error && (
        <div className="text-center text-red-500 text-xl font-semibold mt-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <Loader itemsPerPage={ITEMS_PER_PAGE} />
      ) : filteredCartoons.length === 0 && !error ? (
        <div className="text-center text-white text-xl font-semibold mt-6">
          Oops! No cartoons found for your search or filter.
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredCartoons.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((cartoon) => (
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

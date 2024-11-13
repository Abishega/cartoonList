import React from 'react';
import Button from '../widgets/Button';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalPages }) => (
  <div className="flex items-center justify-center space-x-2 mt-6 flex-wrap">

    <Button
      text="Prev" 
      onClick={() => setPage(page - 1)}
      disabled={page <= 1}
      className={`
        ${page <= 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl'}
        px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base
      `}
    />

    <span className="text-lg sm:text-xl text-white font-semibold mx-2 sm:mx-4">
     
      Page {page} of {totalPages}
    </span>

  
    <Button
      text="Next" 
      onClick={() => setPage(page + 1)}
      disabled={page >= totalPages}
      className={`
        ${page >= totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl'}
        px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base
      `}
    />
  </div>
);

export default Pagination;

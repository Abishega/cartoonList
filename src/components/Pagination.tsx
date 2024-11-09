
import React from 'react';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalPages }) => (
  <div className="flex items-center justify-center space-x-4 mt-6">

    <button
      onClick={() => setPage(page - 1)}
      disabled={page <= 1}
      className={`px-6 py-2 text-white font-bold rounded-full 
        ${page <= 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl'}
        focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      Previous
    </button>

    <span className="text-xl text-white font-semibold">
      Page {page} of {totalPages}
    </span>


    <button
      onClick={() => setPage(page + 1)}
      disabled={page >= totalPages}
      className={`px-6 py-2 text-white font-bold rounded-full .
        ${page >= totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl'}
        focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      Next
    </button>
  </div>
);

export default Pagination;

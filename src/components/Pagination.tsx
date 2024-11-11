import React from 'react';
import Button from '../widgets/Button'; // Ensure this path is correct

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalPages }) => (
  <div className="flex items-center justify-center space-x-4 mt-6">
    {/* Previous Button */}
    <Button
      text="Previous"
      onClick={() => setPage(page - 1)}
      disabled={page <= 1}
      className={`
        ${page <= 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl'}
      `}
    />

    <span className="text-xl text-white font-semibold">
      Page {page} of {totalPages}
    </span>

    {/* Next Button */}
    <Button
      text="Next"
      onClick={() => setPage(page + 1)}
      disabled={page >= totalPages}
      className={`
        ${page >= totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl'}
      `}
    />
  </div>
);

export default Pagination;

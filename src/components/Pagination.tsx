
import React from 'react';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalPages }) => (
  <div className="pagination">
    <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
    <span>Page {page} of {totalPages}</span>
    <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
  </div>
);

export default Pagination;

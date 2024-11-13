// widgets/Loader.tsx
import React from 'react';
import Skeleton from '../components/Skeleton';

interface LoaderProps {
  itemsPerPage: number; // You will pass the number of items to show the skeletons
}

const Loader: React.FC<LoaderProps> = ({ itemsPerPage }) => {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      className="flex justify-center items-center min-h-screen bg-black bg-opacity-50 loader-container"
    >
      <div className="w-full max-w-screen-xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Display skeleton for each cartoon based on ITEMS_PER_PAGE */}
        {[...Array(itemsPerPage)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default Loader;


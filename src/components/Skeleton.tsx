
import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-56 bg-gray-300 rounded-lg mb-4"></div> {/* Skeleton for image */}
      <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div> {/* Skeleton for title */}
      <div className="w-1/2 h-4 bg-gray-300 rounded"></div> {/* Skeleton for genre */}
    </div>
  );
};

export default Skeleton;

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      className="flex justify-center items-center min-h-screen bg-black bg-opacity-50 loader-container"
    >
      <div 
        className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full animate-pulse"
      ></div>
    </div>
  );
};

export default Loader;


import React, { useState } from 'react';
import Link from 'next/link';
import { Cartoon } from '../utils/types';
import Image from 'next/image';

interface CardProps {
  cartoon: Cartoon;
}

const Card: React.FC<CardProps> = ({ cartoon }) => {
  const [isImageError, setIsImageError] = useState(false);

  return (

    <div className="relative shadow-lg rounded-xl overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:rotate-2 hover:shadow-2xl hover:cursor-pointer z-10">
    <Link href={`/cartoon/${cartoon.id}`} className="block p-4 flex flex-col items-center relative">
      {/* Image with fallback on error */}
      <Image
      width={200}
      height={200}
        src={isImageError ? '/fallback-image.jpg' : cartoon.image}
        alt={cartoon.title}
        onError={() => setIsImageError(true)}
        className="w-full h-48 object-cover rounded-xl shadow-xl transition-all duration-500 ease-in-out"
      />
      
      {/* Title with comic-style font */}
      <h2 className="mt-4 text-2xl font-bold text-center text-white shadow-lg p-2 bg-black bg-opacity-50 rounded-lg">
        {cartoon.title}
      </h2>
  
      {/* Fun Badge/Emoji for additional style */}
      <div className="absolute top-2 right-2 text-white text-xl flex items-center">
        <span role="img" aria-label="star" className="animate-pulse">⭐</span>
      </div>
  
      {/* Fun comic-style animated bubble for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black opacity-20 rounded-xl z-0 hover:opacity-0 transition-opacity duration-300"></div>
  
      {/* Optional cartoonish pattern or texture */}
      <div className="absolute inset-0 bg-zinc-900 opacity-10 rounded-xl z-0"></div>
    </Link>
  </div>
  
  
    
  );
};

export default Card;

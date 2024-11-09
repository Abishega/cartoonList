import React, { useState } from 'react';
import Link from 'next/link';
import { Cartoon } from '../utils/types';

interface CardProps {
  cartoon: Cartoon;
}

const Card: React.FC<CardProps> = ({ cartoon }) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/${cartoon.id}`}>
        <div className="p-4 flex flex-col items-center">
          <img
            src={isImageError ? '/fallback-image.jpg' : cartoon.image}
            alt={cartoon.title}
            onError={() => setIsImageError(true)}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="mt-4 text-xl font-semibold text-center">{cartoon.title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default Card;


import Button from './../widgets/Button';
import React from 'react';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-8">Welcome to Cartoon World</h1>
        
       
        <Button
          text="Explore Cartoons"
          link="/cartoon/browse"
          className="text-xl md:text-xl"
        />
      </div>
    </div>
  );
}


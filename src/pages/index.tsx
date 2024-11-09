

import Link from "next/link";


export default function Home() {
  return (
    <div className={` flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600`}>
      <div className="text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-8">Welcome to Cartoon World</h1>
        <Link href="/cartoon/browse" className="relative inline-block px-8 py-4 text-lg md:text-xl font-semibold text-white bg-purple-600 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-purple-700 hover:shadow-2xl">
          <span className="absolute inset-0 w-full h-full bg-purple-500 opacity-0 transition-opacity duration-300 rounded-full group-hover:opacity-10"></span>
          Explore Cartoons
        </Link>
      </div>
    </div>
  );
}

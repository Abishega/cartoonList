import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

// next.config.js
module.exports = {
  images: {
    domains: ['nick.mtvnimages.com', 'm.media-amazon.com', 'i.kinja-img.com', 'www.imdb.com'], 
  },
};

export default nextConfig;

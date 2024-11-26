import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'example.com', 
      'images.pexels.com', 
      'hips.hearstapps.com', 
      'www.topgear.com',
      'thumbs.dreamstime.com', // Add the required domain
    ],
  },
};

export default nextConfig;

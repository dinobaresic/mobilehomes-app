import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com", "localhost", "images.unsplash.com", "picsum.photos"], // dozvoljene domene
  },
};

export default nextConfig;

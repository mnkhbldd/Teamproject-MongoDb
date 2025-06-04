import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.NEXT_PUBLIC_CLERK_SECRET_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "www.w3schools.com",
      },

      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
    ],
  },
};

export default nextConfig;

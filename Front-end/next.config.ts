import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.NEXT_PUBLIC_CLERK_SECRET_KEY,
  },
  clerk: {
    sessionDuration: '24h', // 24 hours
    tokenExpiration: '7d', // 7 days
    tokenRefreshDuration: '1h', // 1 hour
  }
};

export default nextConfig;

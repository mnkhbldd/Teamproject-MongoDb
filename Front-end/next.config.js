/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-cloudinary-domain.com'], // Add your image domains here
  },
  experimental: {
    optimizePackageImports: ['react-leaflet'],
  },
}

module.exports = nextConfig

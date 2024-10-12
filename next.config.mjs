/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['tailwindui.com', 'images.unsplash.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
  
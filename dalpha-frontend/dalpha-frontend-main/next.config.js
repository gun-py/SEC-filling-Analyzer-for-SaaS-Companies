/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    return {
      ...config,
      cache: false,
    };
  },
};

module.exports = nextConfig;

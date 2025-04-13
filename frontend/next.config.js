/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',  // Dockerでのデプロイに必要
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000'
  },
  // middleware matcher を含めたい場合はここではなく middleware.ts で書く
};

module.exports = nextConfig;

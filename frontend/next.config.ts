import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',  // Dockerでのデプロイに必要
  // Vercelの環境変数を使用する場合
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000',
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET
  }
};

module.exports = {
  matcher: "/:path*", // 全ページに適用
};


export default nextConfig;

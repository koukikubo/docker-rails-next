import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',  // Dockerでのデプロイに必要
  // Vercelの環境変数を使用する場合
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000'
  }
};

module.exports = {
  matcher: "/:path*", // 全ページに適用
};


export default nextConfig;

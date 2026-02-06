import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:4000/api/:path*',
      },
      {
        source: '/register',
        destination: 'http://127.0.0.1:4000/register',
      },
      {
        source: '/login',
        destination: 'http://127.0.0.1:4000/login',
      },
      {
        source: '/logout',
        destination: 'http://127.0.0.1:4000/logout',
      },
    ];
  },
};

export default nextConfig;

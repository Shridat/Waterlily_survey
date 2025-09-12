import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",                 // frontend calls
        destination: "http://localhost:4000/api/:path*", // backend target
      },
    ]
  },
};

export default nextConfig;

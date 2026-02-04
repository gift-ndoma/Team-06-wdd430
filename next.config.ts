import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL('https://assets.example.com/**'),
      new URL('https://example.com/**'),
    ],
  }
};

export default nextConfig;

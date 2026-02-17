import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hardenbrookhardwoods.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'as1.ftcdn.net',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "assets.example.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",

      },
      {
        protocol: "https",
        hostname: "hardenbrookhardwoods.com"
      },
        {
        protocol: "https",
        hostname: "as1.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;


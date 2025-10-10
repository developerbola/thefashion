import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io",
      },
      {
        protocol: "https",
        hostname: "images.puma.com",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;

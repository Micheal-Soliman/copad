import type { NextConfig } from "next";

const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    qualities: [75, 100],
  },
} satisfies NextConfig;

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [], // Add external domains if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // Allow images served from your Strapi instance on Render (production)
      {
        protocol: "https",
        hostname: "grounded-diamond-1d2fe83bb0.strapiapp.com",
        pathname: "/**",
      },
      // Allow localhost for local development (http://localhost:1337)
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

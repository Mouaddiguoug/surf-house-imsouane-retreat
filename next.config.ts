import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP for the browsers that lack it. On these photographs
    // AVIF comes in a fifth to a third smaller than WebP at the same quality,
    // and the encode cost is paid once per variant, then cached.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Placeholder photography while the retreat's own media is shot. Every
      // real asset should end up in `public/assets` or behind the API, at
      // which point this pattern can go.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

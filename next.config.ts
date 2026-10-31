import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Custom Retreat became The Original Stay. Permanent, so search
      // engines move the old page's standing to the new address.
      {
        source: "/packages/the-custom-retreat",
        destination: "/packages/the-original-stay",
        permanent: true,
      },
    ];
  },
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

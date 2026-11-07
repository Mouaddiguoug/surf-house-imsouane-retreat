import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // V1.5 moved every product to a flat address and renamed two of them:
    // the Custom Retreat is The Original Stay, the Masterclass is Golden
    // Lines. Permanent, so search engines carry the old pages' standing
    // to the new addresses.
    return [
      ["/packages/the-original-stay", "/original-stay"],
      ["/packages/the-custom-retreat", "/original-stay"],
      ["/packages/the-foundation", "/foundation"],
      ["/packages/the-masterclass", "/golden-lines"],
      ["/fr/packages/the-original-stay", "/fr/original-stay"],
      ["/fr/packages/the-foundation", "/fr/foundation"],
    ].map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
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

"use client";

import dynamic from "next/dynamic";

/**
 * Client boundary for the map.
 *
 * `ssr: false` is only legal inside a Client Component, so this thin wrapper
 * exists to hold it. The skeleton is the same height as the canvas it
 * replaces, so nothing on the page moves when the tiles arrive.
 */
const MapCanvas = dynamic(
  () => import("@/features/imsouane/components/map-canvas"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-house-sand size-full animate-pulse motion-reduce:animate-none">
        <span className="sr-only">Loading the map</span>
      </div>
    ),
  },
);

export function HouseMap() {
  return <MapCanvas />;
}

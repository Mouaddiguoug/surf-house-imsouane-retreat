/**
 * Public runtime configuration.
 *
 * Only `NEXT_PUBLIC_*` variables are inlined into the browser bundle, and they
 * must be read as static property accesses so the compiler can substitute them.
 * Never read a secret here — anything in this file ships to the browser.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/**
 * MapLibre style for the location map.
 *
 * OpenFreeMap's Positron is the default because it needs no key and no
 * account, and its pale grey ground sits under the house palette without
 * fighting it. Swap in a MapTiler or Protomaps URL here when the traffic
 * justifies a paid tier — nothing else in the app has to change.
 */
export const MAP_STYLE_URL =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ??
  "https://tiles.openfreemap.org/styles/positron";

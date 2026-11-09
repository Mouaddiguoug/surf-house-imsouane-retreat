"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import { Map, Marker, NavigationControl } from "react-map-gl/maplibre";

import { MAP_STYLE_URL } from "@/lib/constants/env";
import { SITE } from "@/lib/constants/site";
import { useLocale } from "@/lib/i18n/use-locale";

/**
 * MapLibre's own interface strings, in French. Its defaults are English;
 * these replace the ones this map can show (the gesture hints, the zoom
 * buttons and the attribution toggle).
 */
const MAP_FR = {
  "CooperativeGesturesHandler.WindowsHelpText":
    "Utilise Ctrl + molette pour zoomer sur la carte",
  "CooperativeGesturesHandler.MacHelpText":
    "Utilise ⌘ + molette pour zoomer sur la carte",
  "CooperativeGesturesHandler.MobileHelpText":
    "Utilise deux doigts pour déplacer la carte",
  "NavigationControl.ZoomIn": "Zoomer",
  "NavigationControl.ZoomOut": "Dézoomer",
  "AttributionControl.ToggleAttribution": "Afficher les crédits",
  "Map.Title": "Carte",
  "Marker.Title": "Repère sur la carte",
};

/**
 * The MapLibre canvas.
 *
 * Split out from `HouseMap` so it can be loaded with `ssr: false`: maplibre-gl
 * touches `window` while its module initialises, which throws during the
 * prerender pass if it is imported into the server render at all.
 *
 * `cooperativeGestures` is the important option. Without it a map this size
 * swallows the page scroll — a phone drags the map instead of the page, and a
 * trackpad zooms past the village — so panning needs two fingers and desktop
 * zoom needs a modifier key.
 */
export default function MapCanvas() {
  const { latitude, longitude } = SITE.coordinates;
  const locale = useLocale();

  return (
    <Map
      initialViewState={{ latitude, longitude, zoom: 14 }}
      mapStyle={MAP_STYLE_URL}
      cooperativeGestures
      minZoom={5}
      maxZoom={18}
      attributionControl={{ compact: true }}
      locale={locale === "fr" ? MAP_FR : undefined}
      style={{ width: "100%", height: "100%" }}
    >
      <NavigationControl position="bottom-right" showCompass={false} />

      <Marker latitude={latitude} longitude={longitude} anchor="bottom">
        {/* A pin drawn from the palette rather than the default marker sprite,
            which is a blue that belongs to no part of this site. */}
        <span className="flex flex-col items-center" aria-hidden>
          <span className="bg-house-clay ring-house-shell block size-4 rounded-full ring-4" />
          <span className="bg-house-clay -mt-px block h-3 w-px" />
        </span>
        <span className="sr-only">{SITE.name}</span>
      </Marker>
    </Map>
  );
}

import type { Metadata } from "next";

import { LivingSection } from "@/features/house/components/living-section";
import { RoomsSection } from "@/features/house/components/rooms-section";
import { RooftopSection } from "@/features/house/components/rooftop-section";

export const metadata: Metadata = {
  title: "The House — Rooms & Rooftop over Imsouane Bay",
  description:
    "Sea-facing rooms, a rooftop over the bay and the living space where the week happens: the surf house behind the surfing, in Imsouane, Morocco.",
  alternates: { canonical: "/house" },
  openGraph: { url: "/house" },
};

/**
 * The house, on its own page.
 *
 * Three sections, top to bottom the way a guest meets them: the rooftop
 * opens the page as a full-bleed photograph (the navbar sits solid over it,
 * since there is no dark hero here), then the rooms on sand, then the living
 * space on ink with the group's one call to action. Every link out — "Book a
 * stay", "See the packages" — points back at the home page's sections.
 */
export default function HousePage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <RooftopSection />
      <RoomsSection />
      <LivingSection />
    </main>
  );
}

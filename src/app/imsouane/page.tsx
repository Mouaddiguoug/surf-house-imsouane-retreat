import type { Metadata } from "next";

import { ImsouaneHero } from "@/features/imsouane/components/imsouane-hero";
import { ImsouaneSection } from "@/features/imsouane/components/imsouane-section";

export const metadata: Metadata = {
  title: "Imsouane, Morocco — The Bay, the Waves & the Village",
  description:
    "A fishing village on Morocco's Atlantic coast with two right-hand point breaks and the country's longest wave, two hours north of Agadir — and where the house sits in it.",
  alternates: { canonical: "/imsouane" },
  openGraph: { url: "/imsouane" },
};

/**
 * Imsouane, on its own page.
 *
 * The photograph first, full bleed, then the section that used to live on
 * the home page: the two waves, how to get here, and the map that shows the
 * house a few hundred metres from the point. "Find the house" in the hero
 * scrolls to it.
 */
export default function ImsouanePage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <ImsouaneHero />
      <ImsouaneSection />
    </main>
  );
}

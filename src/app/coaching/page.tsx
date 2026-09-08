import type { Metadata } from "next";

import {
  CoachingFacts,
  CoachingHero,
} from "@/features/coaching/components/coaching-hero";
import { HowWeCoachSection } from "@/features/coaching/components/how-we-coach-section";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `How we coach — ${SITE.name}`,
  description:
    "One goal per surfer, a coach in the water who knows your name, small groups sorted by level, and every session filmed and reviewed after dinner.",
};

/**
 * How we coach, on its own page.
 *
 * The hero makes the claim, the band under it shows the three numbers
 * behind it, and the
 * section under it walks through the week, step by step, in the order a
 * guest meets it. The two qualifying sections — the levels and "is this
 * trip for me" — stay on the home page, where they sit between the reviews
 * and the booking.
 */
export default function CoachingPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <CoachingHero />
      <CoachingFacts />
      <HowWeCoachSection />
    </main>
  );
}

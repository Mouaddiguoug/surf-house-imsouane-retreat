import type { Metadata } from "next";

import { FoundationPackage } from "@/features/packages/components/foundation-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";
import { SITE } from "@/lib/constants/site";

const PACKAGE = packageBySlug("the-foundation");

export const metadata: Metadata = {
  title: `The Foundation — ${SITE.name}`,
  description:
    "Surf, Roots & Reset: an academy week for beginners and improvers. Five coached days on the ISA method, the village around you, and enough recovery to paddle out again tomorrow.",
};

/**
 * Package 01, on its own page.
 *
 * The photograph the card showed opens it, then the section that has always
 * made the case for this week, then the other two. The section is cream, so
 * the strip at the foot is sand.
 */
export default function FoundationPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <FoundationPackage />
      <PackageBooking package={PACKAGE} />
      <OtherPackagesSection current={PACKAGE.slug} ground="sand" />
    </main>
  );
}

import type { Metadata } from "next";

import { MasterclassPackage } from "@/features/packages/components/masterclass-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";
import { SITE } from "@/lib/constants/site";

const PACKAGE = packageBySlug("the-masterclass");

export const metadata: Metadata = {
  title: `The Masterclass — ${SITE.name}`,
  description:
    "Classic Longboard: seven nights on a single fin at Imsouane, for surfers who can already read a green wave. Daily video analysis, surf skate, and the walk to the nose.",
};

/**
 * Package 02, on its own page.
 *
 * The section is ink, so the strip at the foot is sand — it would otherwise
 * run straight into the section above it with no edge between them.
 */
export default function MasterclassPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <MasterclassPackage />
      <PackageBooking package={PACKAGE} />
      <OtherPackagesSection current={PACKAGE.slug} ground="sand" />
    </main>
  );
}

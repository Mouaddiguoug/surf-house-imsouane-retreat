import type { Metadata } from "next";

import { CustomRetreatPackage } from "@/features/packages/components/custom-retreat-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";
import { SITE } from "@/lib/constants/site";

const PACKAGE = packageBySlug("the-custom-retreat");

export const metadata: Metadata = {
  title: `The Custom Retreat — ${SITE.name}`,
  description:
    "Bed, breakfast and board from two nights, arriving any day — then build the rest yourself from the ocean, wellness and adventure modules.",
};

/**
 * Package 03, on its own page.
 *
 * The section is already sand, so the strip at the foot takes cream instead —
 * the one page where the two grounds swap.
 */
export default function CustomRetreatPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <CustomRetreatPackage />
      <PackageBooking package={PACKAGE} />
      <OtherPackagesSection current={PACKAGE.slug} ground="shell" />
    </main>
  );
}

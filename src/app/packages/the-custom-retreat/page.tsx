import type { Metadata } from "next";

import { CustomRetreatPackage } from "@/features/packages/components/custom-retreat-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-custom-retreat");

export const metadata: Metadata = {
  title: "Surf House Stay in Imsouane — Bed, Breakfast & Board",
  description:
    "The Custom Retreat: a room, breakfast and a board at the surf house in Imsouane from two nights, arriving any day — then add coaching, yoga and adventure as you like.",
  alternates: { canonical: "/packages/the-custom-retreat" },
  openGraph: { url: "/packages/the-custom-retreat" },
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

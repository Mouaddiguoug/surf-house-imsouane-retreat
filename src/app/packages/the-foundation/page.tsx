import type { Metadata } from "next";

import { FoundationPackage } from "@/features/packages/components/foundation-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-foundation");

export const metadata: Metadata = {
  title: "Beginner Surf Camp in Imsouane — 7-Night Surf & Yoga Week",
  description:
    "The Foundation: a seven-night surf and yoga week in Imsouane for beginners and improvers. Five coached days on the ISA method, full board, and the village around you.",
  alternates: { canonical: "/packages/the-foundation" },
  openGraph: { url: "/packages/the-foundation" },
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

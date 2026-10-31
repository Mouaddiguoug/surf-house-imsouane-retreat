import type { Metadata } from "next";

import { WHATSAPP_HREF } from "@/components/shared/contact-channels";
import {
  FOUNDATION_CLOSING,
  FoundationPackage,
} from "@/features/packages/components/foundation-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-foundation");
const CLOSING = FOUNDATION_CLOSING.en;

export const metadata: Metadata = {
  title: "Beginner Surf Camp in Imsouane — 7-Night Surf & Yoga Week",
  description:
    "The Foundation: seven nights in Imsouane for beginner and intermediate surfers. Five two-hour coached sessions in separate level groups, four yoga sessions, surfskate and half board, from €590.",
  alternates: {
    canonical: "/packages/the-foundation",
    languages: {
      en: "/packages/the-foundation",
      fr: "/fr/packages/the-foundation",
    },
  },
  openGraph: { url: "/packages/the-foundation" },
};

/**
 * Package 01, on its own page.
 *
 * The section ends on sand, so the strip at the foot is shell.
 */
export default function FoundationPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <FoundationPackage />
      <PackageBooking
        package={PACKAGE}
        heading={CLOSING.heading}
        body={[...CLOSING.body]}
        secondary={{
          href: WHATSAPP_HREF,
          label: CLOSING.whatsapp,
          external: true,
        }}
      />
      <OtherPackagesSection current={PACKAGE.slug} ground="shell" />
    </main>
  );
}

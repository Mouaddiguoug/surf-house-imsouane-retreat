import type { Metadata } from "next";

import { WHATSAPP_HREF } from "@/components/shared/contact-channels";
import {
  ORIGINAL_STAY_CLOSING,
  OriginalStayPackage,
} from "@/features/packages/components/original-stay-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-original-stay");
const CLOSING = ORIGINAL_STAY_CLOSING.en;

export const metadata: Metadata = {
  title: "The Original Stay — Surf House Stay in Imsouane with Half Board",
  description:
    "The Original Stay: your room, breakfast and dinner, and a complimentary daily Sunset Tea at the surf house in Imsouane, from €45 for the minimum three-night stay. No compulsory surf lessons, no fixed schedule.",
  alternates: {
    canonical: "/packages/the-original-stay",
    languages: {
      en: "/packages/the-original-stay",
      fr: "/fr/packages/the-original-stay",
    },
  },
  openGraph: { url: "/packages/the-original-stay" },
};

/**
 * Package 03, on its own page. It was the Custom Retreat until the house
 * rewrote it; the old address redirects here (see `next.config.ts`).
 *
 * The page ends on cream, so the strip at the foot takes sand.
 */
export default function OriginalStayPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <OriginalStayPackage />
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
      <OtherPackagesSection current={PACKAGE.slug} ground="sand" />
    </main>
  );
}

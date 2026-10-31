import type { Metadata } from "next";

import { WHATSAPP_HREF } from "@/components/shared/contact-channels";
import {
  FOUNDATION_CLOSING,
  FoundationPackage,
} from "@/features/packages/components/foundation-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-foundation", "fr");
const CLOSING = FOUNDATION_CLOSING.fr;

export const metadata: Metadata = {
  title: "Stage de surf débutant à Imsouane — 7 nuits surf & yoga",
  description:
    "The Foundation : sept nuits à Imsouane pour surfeurs débutants et intermédiaires. Cinq séances encadrées de deux heures en groupes de niveau, quatre séances de yoga, surfskate et demi-pension, à partir de 590 €.",
  alternates: {
    canonical: "/fr/packages/the-foundation",
    languages: {
      en: "/packages/the-foundation",
      fr: "/fr/packages/the-foundation",
    },
  },
  openGraph: { url: "/fr/packages/the-foundation", locale: "fr_FR" },
};

/**
 * The Foundation in French. The navbar, the footer and the booking dialog
 * are still English — the site has no French for them yet — so the page
 * marks its own language on `main` rather than on the document.
 */
export default function FoundationPageFr() {
  return (
    <main id="main" lang="fr" className="flex flex-1 flex-col">
      <FoundationPackage locale="fr" />
      <PackageBooking
        package={PACKAGE}
        locale="fr"
        heading={CLOSING.heading}
        body={[...CLOSING.body]}
        secondary={{
          href: WHATSAPP_HREF,
          label: CLOSING.whatsapp,
          external: true,
        }}
      />
      <OtherPackagesSection current={PACKAGE.slug} ground="shell" locale="fr" />
    </main>
  );
}

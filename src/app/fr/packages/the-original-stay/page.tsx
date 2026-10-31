import type { Metadata } from "next";

import { WHATSAPP_HREF } from "@/components/shared/contact-channels";
import {
  ORIGINAL_STAY_CLOSING,
  OriginalStayPackage,
} from "@/features/packages/components/original-stay-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-original-stay", "fr");
const CLOSING = ORIGINAL_STAY_CLOSING.fr;

export const metadata: Metadata = {
  title: "The Original Stay — Séjour en demi-pension à Imsouane",
  description:
    "The Original Stay : votre chambre, le petit-déjeuner et le dîner, et le Sunset Tea offert chaque jour à la surf house d'Imsouane, à partir de 45 € pour le séjour minimum de trois nuits. Pas de surf camp obligatoire, pas de programme imposé.",
  alternates: {
    canonical: "/fr/packages/the-original-stay",
    languages: {
      en: "/packages/the-original-stay",
      fr: "/fr/packages/the-original-stay",
    },
  },
  openGraph: { url: "/fr/packages/the-original-stay", locale: "fr_FR" },
};

/** The Original Stay in French. See the Foundation's French page. */
export default function OriginalStayPageFr() {
  return (
    <main id="main" lang="fr" className="flex flex-1 flex-col">
      <OriginalStayPackage locale="fr" />
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
      <OtherPackagesSection current={PACKAGE.slug} ground="sand" locale="fr" />
    </main>
  );
}

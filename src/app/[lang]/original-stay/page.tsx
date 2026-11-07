import type { Metadata } from "next";

import { WHATSAPP_HREF } from "@/components/shared/contact-channels";
import {
  ORIGINAL_STAY_CLOSING,
  OriginalStayPackage,
} from "@/features/packages/components/original-stay-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

const META = {
  en: {
    title: "The Original Stay — Accommodation and Half-Board in Imsouane",
    description:
      "Accommodation and half-board at the House in Imsouane, with a complimentary daily Sunset Tea, from €45 for the minimum three-night stay. Academy activities are optional and billed separately.",
  },
  fr: {
    title: "The Original Stay — Hébergement et demi-pension à Imsouane",
    description:
      "L'hébergement et la demi-pension à la House d'Imsouane, avec le Sunset Tea offert chaque jour, à partir de 45 € pour le séjour minimum de trois nuits. Les activités Academy sont facultatives et facturées séparément.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  return {
    ...META[locale],
    alternates: localeAlternates("/original-stay", locale),
    openGraph: openGraphFor("/original-stay", locale, "/og/original-stay.jpg"),
  };
}

/** The Original Stay. The page ends on cream, so the strip at the foot takes sand. */
export default async function OriginalStayPage({ params }: Props) {
  const locale = asLocale((await params).lang);
  const pkg = packageBySlug("original-stay", locale);
  const closing = ORIGINAL_STAY_CLOSING[locale];

  return (
    <main id="main" className="flex flex-1 flex-col">
      <OriginalStayPackage locale={locale} />
      <PackageBooking
        package={pkg}
        locale={locale}
        heading={closing.heading}
        body={[...closing.body]}
        secondary={{
          href: WHATSAPP_HREF,
          label: closing.whatsapp,
          external: true,
        }}
      />
      <OtherPackagesSection current={pkg.slug} ground="sand" locale={locale} />
    </main>
  );
}

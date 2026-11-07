import type { Metadata } from "next";

import {
  FOUNDATION_CLOSING,
  FoundationPackage,
} from "@/features/packages/components/foundation-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

const META = {
  en: {
    title: "Foundation Surf Roots & Reset — Surf Programme in Imsouane",
    description:
      "Discover the Foundation concept: seven nights for beginner and intermediate surfers in separate level groups, with Imsouane Surf Academy. Programme details and opening are subject to confirmation.",
  },
  fr: {
    title: "Foundation Surf Roots & Reset — Programme de surf à Imsouane",
    description:
      "Découvre le concept Foundation : sept nuits pour surfeurs débutants et intermédiaires, en groupes de niveau, avec Imsouane Surf Academy. Les modalités et l'ouverture restent à confirmer.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  return {
    ...META[locale],
    alternates: localeAlternates("/foundation", locale),
    openGraph: openGraphFor("/foundation", locale, "/og/foundation.jpg"),
  };
}

/**
 * Foundation, presented but not sold: the strip at the foot opens a
 * conversation rather than a checkout. The section ends on sand, so the
 * other products take shell.
 */
export default async function FoundationPage({ params }: Props) {
  const locale = asLocale((await params).lang);
  const pkg = packageBySlug("foundation", locale);
  const closing = FOUNDATION_CLOSING[locale];

  return (
    <main id="main" className="flex flex-1 flex-col">
      <FoundationPackage locale={locale} />
      <PackageBooking
        package={pkg}
        locale={locale}
        heading={closing.heading}
        body={[...closing.body]}
      />
      <OtherPackagesSection current={pkg.slug} ground="shell" locale={locale} />
    </main>
  );
}

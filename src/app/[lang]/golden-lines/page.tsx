import type { Metadata } from "next";

import {
  GoldenLinesPackage,
  goldenLinesClosing,
} from "@/features/packages/components/golden-lines-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

const META = {
  en: {
    title: "Golden Lines — Longboard Programme in Imsouane",
    description:
      "Discover the Golden Lines longboard concept at Imsouane, the long, patient right the log was designed for. Programme details and editions are subject to confirmation.",
  },
  fr: {
    title: "Golden Lines — Programme longboard à Imsouane",
    description:
      "Découvre le concept longboard Golden Lines à Imsouane, la droite longue et patiente pour laquelle le longboard a été dessiné. Les modalités et les éditions restent à confirmer.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  return {
    ...META[locale],
    alternates: localeAlternates("/golden-lines", locale),
    openGraph: openGraphFor("/golden-lines", locale, "/og/golden-lines.jpg"),
  };
}

/**
 * Golden Lines: presented, not sold. It was the Masterclass; the old address
 * redirects here (see `next.config.ts`).
 */
export default async function GoldenLinesPage({ params }: Props) {
  const locale = asLocale((await params).lang);
  const pkg = packageBySlug("golden-lines", locale);
  const closing = goldenLinesClosing(locale);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <GoldenLinesPackage locale={locale} />
      <PackageBooking
        package={pkg}
        locale={locale}
        heading={closing.heading}
        body={[closing.body]}
      />
      <OtherPackagesSection current={pkg.slug} ground="sand" locale={locale} />
    </main>
  );
}

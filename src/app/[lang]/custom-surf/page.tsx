import type { Metadata } from "next";

import { WHATSAPP_HREF } from "@/components/shared/contact-channels";
import {
  CustomSurfPackage,
  customSurfClosing,
} from "@/features/packages/components/custom-surf-package";
import { PackageBooking } from "@/features/packages/components/package-booking";
import { OtherPackagesSection } from "@/features/packages/components/other-packages-section";
import { packageBySlug } from "@/features/packages/data/packages";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

const META = {
  en: {
    title: "Custom Surf — The Original Stay with Surf Activities",
    description:
      "Start with The Original Stay in Imsouane and add the surf activities you choose with Imsouane Surf Academy, at the public activity price, billed separately.",
  },
  fr: {
    title: "Custom Surf — The Original Stay avec des activités surf",
    description:
      "Pars de The Original Stay à Imsouane et ajoute les activités surf éligibles d'Imsouane Surf Academy, au tarif public de l'activité, facturées séparément.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  return {
    ...META[locale],
    alternates: localeAlternates("/custom-surf", locale),
    openGraph: openGraphFor("/custom-surf", locale, "/og/custom-surf.jpg"),
  };
}

/** Custom Surf. The section ends on the day panel, so the strip after it is ink and the others sand. */
export default async function CustomSurfPage({ params }: Props) {
  const locale = asLocale((await params).lang);
  const pkg = packageBySlug("custom-surf", locale);
  const closing = customSurfClosing(locale);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <CustomSurfPackage locale={locale} />
      <PackageBooking
        package={pkg}
        locale={locale}
        heading={closing.heading}
        body={[closing.body]}
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

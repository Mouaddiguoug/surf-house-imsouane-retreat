import type { Metadata } from "next";

import { UpgradePage } from "@/features/packages/components/upgrade-page";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

const META = {
  en: {
    title: "Add Activities to Your Stay",
    description:
      "Already booked accommodation at the House in Imsouane? Add surf lessons, coaching, yoga or equipment rental without booking your room again.",
  },
  fr: {
    title: "Ajouter des activités à ton séjour",
    description:
      "Ton hébergement à la House d'Imsouane est déjà réservé ? Ajoute cours de surf, coaching, yoga ou location de matériel sans réserver à nouveau ta chambre.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  return {
    ...META[locale],
    alternates: localeAlternates("/upgrade", locale),
    openGraph: openGraphFor("/upgrade", locale, "/og/upgrade.jpg"),
  };
}

export default async function UpgradeRoute({ params }: Props) {
  const locale = asLocale((await params).lang);
  return (
    <main id="main" className="flex flex-1 flex-col">
      <UpgradePage locale={locale} />
    </main>
  );
}

import type { Metadata } from "next";

import { LivingSection } from "@/features/house/components/living-section";
import { RoomsSection } from "@/features/house/components/rooms-section";
import { RooftopSection } from "@/features/house/components/rooftop-section";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

const META = {
  en: {
    title: "The House — Rooms & Rooftop over Imsouane Bay",
    description:
      "Sea-facing rooms, a rooftop over the bay and the living space where the week happens: the surf house behind the surfing, in Imsouane, Morocco.",
  },
  fr: {
    title: "La House — Chambres et toit-terrasse sur la baie d'Imsouane",
    description:
      "Des chambres face à la mer, un toit-terrasse sur la baie et l'espace de vie où se passe la semaine : la maison derrière le surf, à Imsouane, au Maroc.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  return {
    ...META[locale],
    alternates: localeAlternates("/house", locale),
    openGraph: openGraphFor("/house", locale, "/og/house.jpg"),
  };
}

export default async function HousePage({ params }: Props) {
  const locale = asLocale((await params).lang);
  return (
    <main id="main" className="flex flex-1 flex-col">
      <RooftopSection locale={locale} />
      <RoomsSection locale={locale} />
      <LivingSection locale={locale} />
    </main>
  );
}

import type { Metadata } from "next";

import { ImsouaneHero } from "@/features/imsouane/components/imsouane-hero";
import { ImsouaneSection } from "@/features/imsouane/components/imsouane-section";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

const META = {
  en: {
    title: "Imsouane, Morocco — The Bay, the Waves & the Village",
    description:
      "A fishing village on Morocco's Atlantic coast with two right-hand point breaks, two hours north of Agadir — and where the house sits in it.",
  },
  fr: {
    title: "Imsouane, Maroc — La baie, les vagues et le village",
    description:
      "Un village de pêcheurs sur la côte atlantique du Maroc, avec deux droites de pointe, à deux heures au nord d'Agadir — et la place de la maison dans le village.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  return {
    ...META[locale],
    alternates: localeAlternates("/imsouane", locale),
    openGraph: openGraphFor("/imsouane", locale, "/og/imsouane.jpg"),
  };
}

export default async function ImsouanePage({ params }: Props) {
  const locale = asLocale((await params).lang);
  return (
    <main id="main" className="flex flex-1 flex-col">
      <ImsouaneHero locale={locale} />
      <ImsouaneSection locale={locale} />
    </main>
  );
}

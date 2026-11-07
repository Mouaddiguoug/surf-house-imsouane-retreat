import type { Metadata } from "next";

import {
  CoachingFacts,
  CoachingHero,
} from "@/features/coaching/components/coaching-hero";
import { HowWeCoachSection } from "@/features/coaching/components/how-we-coach-section";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

const META = {
  en: {
    title: "Surf Coaching in Imsouane — How We Teach",
    description:
      "One goal per surfer, a coach in the water who knows your name, small groups sorted by level, and every session filmed and reviewed after dinner.",
  },
  fr: {
    title: "Coaching de surf à Imsouane — Notre méthode",
    description:
      "Un objectif par surfeur, un coach dans l'eau qui connaît ton prénom, des petits groupes par niveau, et chaque séance filmée et revue après le dîner.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  return {
    ...META[locale],
    alternates: localeAlternates("/coaching", locale),
    openGraph: openGraphFor("/coaching", locale, "/og/coaching.jpg"),
  };
}

export default async function CoachingPage({ params }: Props) {
  const locale = asLocale((await params).lang);
  return (
    <main id="main" className="flex flex-1 flex-col">
      <CoachingHero locale={locale} />
      <CoachingFacts locale={locale} />
      <HowWeCoachSection locale={locale} />
    </main>
  );
}

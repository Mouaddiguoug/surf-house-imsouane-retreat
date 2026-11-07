import type { Metadata } from "next";

import {
  ExperiencesChapter,
  FinalChapter,
  HomeHero,
  HouseChapter,
  HouseLifeChapter,
  PeopleChapter,
  PlaceChapter,
  SurfChapter,
} from "@/features/home/components/home-chapters";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

/**
 * The hero footage, encoded from the 4K master (`hero_bg_vid.mp4`, kept out
 * of the repo in ~/Downloads/surf-house-masters/): no audio track, since it
 * plays muted. AV1 first where it decodes, H.264 for the rest.
 *
 * Only the landscape cut: the V1.5 hero holds the footage in a 4:3 frame on
 * every screen, so the portrait cut that used to fill an upright phone would
 * now be cropped to a third of itself.
 *
 * To re-encode: `sh scripts/encode-hero-video.sh <master.mp4>`.
 */
const HERO_SOURCES = [
  {
    src: "/assets/hero-1080-av1.mp4",
    type: 'video/mp4; codecs="av01.0.08M.08"',
  },
  { src: "/assets/hero-1080.mp4", type: 'video/mp4; codecs="avc1.640028"' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  return {
    alternates: localeAlternates("/", locale),
    openGraph: openGraphFor("/", locale, "/og/home.jpg"),
  };
}

/**
 * The home page: eight chapters in the order the V1.5 brief fixes.
 *
 * The place, then surf, then the experiences, then the House and its life,
 * then real guests and plain answers, then the close. Three paths — Stay,
 * Surf, Already Booked — are offered in the hero and again at the end, and
 * nothing in between forces a choice: the two questions are optional and
 * only point the way.
 */
export default async function HomePage({ params }: Props) {
  const locale = asLocale((await params).lang);

  return (
    <main id="main" className="flex flex-1 flex-col">
      <HomeHero
        locale={locale}
        sources={HERO_SOURCES}
        poster="/assets/hero_bg_vid_poster.jpg"
      />
      <PlaceChapter locale={locale} />
      <SurfChapter locale={locale} />
      <ExperiencesChapter locale={locale} />
      <HouseChapter locale={locale} />
      <HouseLifeChapter locale={locale} />
      <PeopleChapter locale={locale} />
      <FinalChapter locale={locale} />
    </main>
  );
}

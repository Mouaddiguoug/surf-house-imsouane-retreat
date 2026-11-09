import type { Metadata } from "next";

import {
  FinalChapter,
  HomeHero,
  HouseChapter,
  HouseLifeChapter,
  PeopleChapter,
  PlaceChapter,
  SurfChapter,
} from "@/features/home/components/home-chapters";
import { HERO_END_ID } from "@/lib/constants/hero";
import { asLocale, localeAlternates } from "@/lib/i18n/locale";
import { openGraphFor } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ lang: string }> };

/**
 * The hero footage, encoded from the 4K master (`hero_bg_vid.mp4`, kept out
 * of the repo in ~/Downloads/surf-house-masters/): no audio track, since it
 * plays muted. AV1 first where it decodes, H.264 for the rest.
 *
 * The hero runs the footage full bleed, so an upright phone gets the
 * portrait cut (matched once, on load) and everything else the landscape.
 *
 * To re-encode: `sh scripts/encode-hero-video.sh <master.mp4>`.
 */
const PORTRAIT = "(orientation: portrait) and (max-width: 767px)";
const HERO_SOURCES = [
  {
    src: "/assets/hero-portrait-720-av1.mp4",
    type: 'video/mp4; codecs="av01.0.05M.08"',
    media: PORTRAIT,
  },
  {
    src: "/assets/hero-portrait-720.mp4",
    type: 'video/mp4; codecs="avc1.640028"',
    media: PORTRAIT,
  },
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
 * The House first, then the place, then surf and its experiences, then the
 * House's life, then real guests and plain answers, then the close. Three paths — Stay,
 * Surf, Already Booked — are offered at the end, and
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
      {/* The rest of the page is one sand sheet that slides up over the
          pinned hero. Its top is also where the navbar stops being
          transparent (HERO_END_ID). */}
      <div
        id={HERO_END_ID}
        className="relative z-10 bg-background pt-16 md:pt-20 min-[900px]:pt-24"
      >
        <HouseChapter locale={locale} />
        <PlaceChapter locale={locale} />
        <SurfChapter locale={locale} />
        <HouseLifeChapter locale={locale} />
        <PeopleChapter locale={locale} />
        <FinalChapter locale={locale} />
      </div>
    </main>
  );
}

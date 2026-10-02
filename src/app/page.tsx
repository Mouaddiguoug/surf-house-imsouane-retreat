import { CtaButtons } from "@/components/shared/cta-buttons";
import { HeroVideo } from "@/components/shared/hero-video";
import { BookStaySection } from "@/features/booking/components/book-stay-section";
import { SurfLevelSection } from "@/features/coaching/components/surf-level-section";
import { TripFitSection } from "@/features/coaching/components/trip-fit-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { PackagesSection } from "@/features/packages/components/packages-section";
import { PACKAGES, formatPrice } from "@/features/packages/data/packages";
import { ReviewsSection } from "@/features/reviews/components/reviews-section";

/**
 * The lowest price a coached week is published at: the hero quotes it, so it
 * is read from the packages rather than typed in. It used to be typed in, and
 * said €485 — the Foundation's semi-flexible rate — over cards that each said
 * "From €435.60" a screen below.
 */
const WEEK_FROM = Math.min(
  ...PACKAGES.filter((entry) => entry.rates.unit === "week").map(
    (entry) => entry.rates.nonRefundable,
  ),
);

/**
 * The hero footage, encoded from the 4K master (`hero_bg_vid.mp4`, which is
 * not served): no audio track, since it plays muted, and two cuts. A phone
 * held upright only ever shows the middle of a 16:9 frame under
 * `object-cover`, so it gets that middle as a 720×1280 file of its own
 * instead of downloading the full width to throw two thirds away. Everything
 * else gets 1080p. AV1 first where it decodes, H.264 for the rest.
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

/**
 * The home page.
 *
 * The hero is the full viewport: the bay footage, a scrim, and two columns
 * along the foot — the promise on the left, the mission line and the calls to
 * action on the right. Under it the three packages are three cards on sand —
 * each one a way in to its own page, rather than three long sections run end
 * to end here. The house, the village and the coaching method each have their
 * own page now (`/house`, `/imsouane`, `/coaching`); their sections used to
 * sit here.
 *
 * What is left is ordered by the questions a learner asks, in the order they
 * ask them: which week, which level am I, what did other guests think, is
 * this for me — and only then the ask. Booking used to follow the reviews and
 * come before the level check, which asked a beginner to commit before they
 * knew whether they qualified. Now it is the ink finale, with the contact
 * form after it for anyone who would rather write than book. Grounds run
 * sand, cream, sand, cream, ink, sand: no two adjacent sections share one.
 */
export default function HomePage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      {/* Pinned, so the page rises over the bay rather than the bay sliding
          away under it. Sticky rather than fixed: it stays a flow element, so
          the hero still occupies its own screen at the top and needs no spacer
          standing in for it. See `.hero-depart-media` in `globals.css`. */}
      <section
        id="surf"
        className="bg-bay-dusk sticky top-0 h-dvh w-full overflow-hidden"
      >
        <HeroVideo
          sources={HERO_SOURCES}
          poster="/assets/hero_bg_vid_poster.jpg"
          className="hero-depart-media absolute inset-0"
        />

        {/* Weighted to the two ends again now the copy sits along the foot:
            the navbar floats shell-coloured type over the top, both bottom
            columns need a dark ground under them, and the middle can lighten
            back off the horizon so the footage still carries the frame. */}
        <div
          aria-hidden
          className="from-house-deep/75 via-house-deep/15 to-house-deep/85 absolute inset-0 bg-gradient-to-b via-45%"
        />

        <div className="hero-depart-copy absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 sm:pb-20">
          {/* Two columns along the foot, but only once there is room for both
              to keep a readable measure. Below lg they stack and run left, and
              `items-end` sits the two blocks on a shared baseline rather than
              letting the shorter one float. */}
          <div
            className={
              "mx-auto flex w-full max-w-6xl flex-col gap-10 " +
              "lg:flex-row lg:items-end lg:justify-between lg:gap-16"
            }
          >
            <h1
              className={
                "font-title text-house-shell max-w-xl shrink-0 lg:max-w-xl " +
                "text-[clamp(1.25rem,6vw,1.5rem)] leading-[1.15] text-pretty text-shadow-md " +
                "sm:text-3xl lg:text-[2rem] xl:text-4xl " +
                "animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-1000 motion-reduce:animate-none"
              }
            >
              {/* Two blocks rather than a <br>, so the intended break holds and
                  either line can still wrap on its own when narrow. */}
              <span className="block">Stay for the Waves.</span>
              <span className="block">Come Back for the Feeling.</span>
            </h1>

            {/* The right column. Its own max-width rather than the paragraph's,
                so the calls to action hang off the same right edge as the last
                line of copy. Text stays 16px: the column is narrow enough that
                the 18px step would cut the measure too short. */}
            <div className="max-w-lg lg:text-right">
              <p
                className={
                  "font-sans text-house-shell/85 text-base leading-relaxed " +
                  "text-pretty text-shadow-sm " +
                  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-150 duration-1000 " +
                  "motion-reduce:animate-none"
                }
              >
                Coached surf weeks on Morocco&rsquo;s longest right-hand wave.
                Small groups, daily video, yoga and a shared table, from &euro;
                {formatPrice(WEEK_FROM)}.
              </p>

              <CtaButtons className="mt-8 lg:justify-end" />
            </div>
          </div>
        </div>
      </section>

      {/* The sheet that rises over the hero. It carries the ground colour
          itself, so a section that ever ships without one shows cream rather
          than the footage, and the upward shadow gives the edge somewhere to
          land as it crosses the frame. */}
      <div className="bg-background relative z-10 shadow-rise">
        <PackagesSection />

        <ReviewsSection />
        <TripFitSection />
        <BookStaySection />
        <SurfLevelSection />
        <ContactSection />
      </div>
    </main>
  );
}

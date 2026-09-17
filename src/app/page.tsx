import { CtaButtons } from "@/components/shared/cta-buttons";
import { HeroVideo } from "@/components/shared/hero-video";
import { BookStaySection } from "@/features/booking/components/book-stay-section";
import { SurfLevelSection } from "@/features/coaching/components/surf-level-section";
import { TripFitSection } from "@/features/coaching/components/trip-fit-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { PackagesSection } from "@/features/packages/components/packages-section";
import { ReviewsSection } from "@/features/reviews/components/reviews-section";

/**
 * The home page.
 *
 * The hero is the full viewport: the bay footage, a scrim, and two columns
 * along the foot — the promise on the left, the mission line and the calls to
 * action on the right. Under it the three packages are three cards on sand —
 * each one a way in to its own page, rather than three long sections run end
 * to end here — then the guest reviews on cream. The house, the village and the coaching
 * method each have their own page now (`/house`, `/imsouane`, `/coaching`);
 * their sections used to sit here.
 *
 * What is left reads as one funnel: the offer, then the proof, then the ask.
 * Booking follows the reviews directly and takes the ink — a reader who has
 * just read what other guests said is as convinced as this page will make
 * them, and the two qualifying sections after it are there for the reader who
 * is not: the levels on sand, the honest "is this for me" on cream, and the
 * contact form on sand for anyone who would rather write than book. No two
 * adjacent sections share a ground.
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
          src="/assets/background_hero.mp4"
          poster="/assets/background_hero_poster.jpg"
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
                We deliver a structured, personalized surf-learning experience
                that blends digital preparation, expert coaching, and ocean
                training, empowering every surfer to build lasting skills and
                achieve measurable progress.
              </p>

              <CtaButtons className="mt-8 lg:justify-end" />
            </div>
          </div>
        </div>

        {/* The cue to scroll. A link rather than an ornament, so it also does
            the thing it is asking for. Three layers, one animation each: the
            outer fades out on scroll, the link fades in after the copy has
            landed, the segment inside the line loops. Hidden on phones — the
            foot there holds the stacked copy with 56px under it, and the cue
            stands 62px tall. From `sm` the padding is 80px and it fits. */}
        <div className="hero-depart-cue absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:block">
          <a
            href="#packages"
            aria-label="Scroll down to the packages"
            className={
              "text-house-shell/80 flex flex-col items-center gap-3 rounded-sm " +
              "transition-colors duration-200 hover:text-house-shell motion-reduce:transition-none " +
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 " +
              "animate-in fade-in fill-mode-both delay-1000 duration-1000 motion-reduce:animate-none"
            }
          >
            <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase">
              Scroll
            </span>
            <span
              aria-hidden
              className="bg-house-shell/25 relative block h-10 w-px overflow-hidden"
            >
              <span className="animate-scroll-cue bg-house-shell absolute inset-x-0 top-0 block h-4 motion-reduce:animate-none" />
            </span>
          </a>
        </div>
      </section>

      {/* The sheet that rises over the hero. It carries the ground colour
          itself, so a section that ever ships without one shows cream rather
          than the footage, and the upward shadow gives the edge somewhere to
          land as it crosses the frame. */}
      <div className="bg-background relative z-10 shadow-rise">
        <PackagesSection />

        <ReviewsSection />
        <BookStaySection />

        <SurfLevelSection />
        <TripFitSection />
        <ContactSection />
      </div>
    </main>
  );
}

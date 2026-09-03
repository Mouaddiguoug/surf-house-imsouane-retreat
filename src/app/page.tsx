import { CtaButtons } from "@/components/shared/cta-buttons";
import { HeroVideo } from "@/components/shared/hero-video";
import { LivingSection } from "@/features/house/components/living-section";
import { ImsouaneSection } from "@/features/imsouane/components/imsouane-section";
import { RoomsSection } from "@/features/house/components/rooms-section";
import { BookStaySection } from "@/features/booking/components/book-stay-section";
import { HowWeCoachSection } from "@/features/coaching/components/how-we-coach-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { RooftopSection } from "@/features/house/components/rooftop-section";
import { CustomRetreatSection } from "@/features/packages/components/custom-retreat-section";
import { FoundationSection } from "@/features/packages/components/foundation-section";
import { MasterclassSection } from "@/features/packages/components/masterclass-section";

/**
 * Placeholder home page.
 *
 * The hero is the full viewport: the bay footage, a scrim, and two columns
 * along the foot — the promise on the left, the mission line and the calls to
 * action on the right. Under it the three packages run cream → ink → sand,
 * then the three house sections run cream → sand → ink, so no two adjacent
 * sections ever share a ground.
 *
 * The booking section follows, where every "Book now" on the page lands,
 * then the contact form, then the first coaching section on ink. What comes
 * after is still anchor targets only, so the navbar's deeper links have
 * somewhere real to land; each should be replaced wholesale by its actual
 * section.
 */
export default function HomePage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <section
        id="surf"
        className="bg-bay-dusk relative h-dvh w-full overflow-hidden"
      >
        <HeroVideo
          src="/assets/background_hero.mp4"
          poster="/assets/background_hero_poster.jpg"
          className="absolute inset-0"
        />

        {/* Weighted to the two ends again now the copy sits along the foot:
            the navbar floats shell-coloured type over the top, both bottom
            columns need a dark ground under them, and the middle can lighten
            back off the horizon so the footage still carries the frame. */}
        <div
          aria-hidden
          className="from-house-deep/75 via-house-deep/15 to-house-deep/85 absolute inset-0 bg-gradient-to-b via-45%"
        />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 sm:pb-20">
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
      </section>

      <FoundationSection />
      <MasterclassSection />
      <CustomRetreatSection />

      <RooftopSection />
      <RoomsSection />
      <LivingSection />

      <ImsouaneSection />

      <BookStaySection />
      <ContactSection />

      <HowWeCoachSection />

      {[
        { id: "surf-level", title: "What's my surf level" },
        { id: "is-this-trip-for-me", title: "Is this trip for me" },
      ].map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="border-border border-t px-6 py-24 sm:px-10"
        >
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="font-display text-3xl sm:text-4xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mt-4 font-mono text-xs">
              Placeholder section.
            </p>
          </div>
        </section>
      ))}
    </main>
  );
}

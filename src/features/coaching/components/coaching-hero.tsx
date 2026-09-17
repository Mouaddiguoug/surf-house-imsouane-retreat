import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { BookButton } from "@/features/booking/components/book-button";
import { cn } from "@/lib/utils/cn";

/**
 * The three numbers a reader wants before they trust the paragraphs. Any of
 * these that changes on the ground should change here first.
 */
const FACTS = [
  { term: "Coach to surfer", detail: "1 : 3 at most" },
  { term: "In the water", detail: "Two a day" },
  { term: "On video", detail: "Every session" },
];

/**
 * The coaching page's hero.
 *
 * The photograph fills the frame and the copy sits on it, held by
 * `.bg-coach-scrim` — a gradient that climbs from the foot on a phone and
 * runs in from the left on a wide screen, which is the half of the picture
 * that holds nothing but open water. The surfer stays in the clear on the
 * right at every width, so the copy never lands on the subject.
 *
 * The photo is the argument, too. A surfer waiting on the shoulder, looking
 * back for the set, is what coaching actually looks like from the water:
 * position first, wave second.
 *
 * `object-[62%_52%]` holds her and the village in frame as the viewport
 * narrows — the empty water on the left is the first thing to go.
 *
 * The extra top padding from lg up is the header's own height. The bar
 * overlays the top of this section rather than sitting above it, so
 * centring against the section's true box leaves the copy riding high in
 * the band a reader can actually see; the padding puts it back on the
 * optical centre.
 */
export function CoachingHero() {
  return (
    <section className="bg-house-ink text-house-sand relative flex min-h-[40rem] items-end overflow-hidden sm:min-h-[44rem] lg:min-h-[min(88dvh,48rem)] lg:items-center">
      <Image
        src="/assets/surf_3.jpg"
        alt="A surfer lying on a longboard in the flat water off Imsouane at first light, looking back over her shoulder for the next set, with the village stacked along the cliff behind her."
        fill
        priority
        sizes="100vw"
        className="object-cover object-[66%_50%] lg:object-[62%_52%]"
      />
      <div aria-hidden className="bg-coach-scrim absolute inset-0" />

      <div className="relative w-full px-6 pt-24 pb-12 sm:px-10 sm:pt-28 sm:pb-14 lg:pt-44 lg:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-xl">
            <h1 className="font-title text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-tight text-balance text-shadow-md animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-1000 motion-reduce:animate-none">
              How we coach
            </h1>
            <p className="font-display text-house-shell/90 mt-5 text-lg text-pretty text-shadow-sm animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-150 duration-1000 sm:text-xl motion-reduce:animate-none">
              One goal per surfer, a coach who knows your name, and the proof on
              video.
            </p>
            <p className="text-house-shell/75 mt-6 text-base leading-relaxed text-pretty text-shadow-sm animate-in fade-in fill-mode-both delay-300 duration-1000 motion-reduce:animate-none">
              Most surf camps teach a syllabus. We coach a person: the week is
              built around the one thing you came to learn, and every session,
              clip and evening is pointed at it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 animate-in fade-in fill-mode-both delay-500 duration-1000 motion-reduce:animate-none">
              <BookButton className="h-12 w-full px-6 text-xs sm:w-auto">
                Book a coached week
              </BookButton>
              <Link
                href="/#surf-level"
                className={cn(
                  buttonVariants({ variant: "shellOutline" }),
                  "h-12 w-full px-6 text-xs sm:w-auto",
                )}
              >
                What&apos;s my surf level
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The three numbers, in a band of their own directly under the hero.
 *
 * They used to sit inside the frame. On a phone that made the copy tall
 * enough to need a scrim heavy enough to bury the photograph, which is the
 * one thing the hero is for — so they moved out, onto the same ink the
 * Imsouane page uses for its caption strip.
 */
export function CoachingFacts() {
  return (
    <div className="bg-house-ink text-house-sand px-6 sm:px-10">
      <dl className="divide-house-sand/15 mx-auto grid w-full max-w-6xl divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {FACTS.map((fact) => (
          <div
            key={fact.term}
            className="py-5 sm:px-8 sm:py-6 sm:first:pl-0 sm:last:pr-0"
          >
            <dt className="text-house-sky font-mono text-[0.65rem] tracking-[0.18em] uppercase">
              {fact.term}
            </dt>
            <dd className="font-display mt-1 text-xl leading-tight sm:text-2xl">
              {fact.detail}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

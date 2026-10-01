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
 * The entrance every hero on the site makes: a second-long fade with a short
 * rise, held invisible until its own delay so a late block never flashes
 * before it moves.
 */
const ENTER =
  "animate-in fade-in fill-mode-both duration-1000 motion-reduce:animate-none";

/**
 * The coaching page's hero.
 *
 * The photograph is the argument — a surfer on the shoulder at first light,
 * looking back for the set, which is what coaching looks like from the water:
 * position first, wave second — so it leads, and the words are laid over its
 * foot on the same dark glass the package cards use, rather than on a scrim
 * that darkens the whole frame to carry them.
 *
 * It used to be the scrim. Heavy enough for a paragraph and two buttons to
 * read on it, it left the left half of a wide screen a flat dark wash and, on
 * a phone, buried the photograph entirely: the hero was type on black. The
 * three numbers had been moved out to a band of their own for the same
 * reason. With the glass carrying the copy they come back in, as the right
 * half of that band — the claim on the left, the proof beside it.
 *
 * Two arrangements. From lg the photograph fills the section and the glass
 * runs full-bleed along its foot, a hairline on top, the title standing on
 * the open water just above it. Below lg there is no room to lay a band that
 * tall over a picture and still see the picture, so the photograph takes the
 * top of the screen as a frame of its own, fades into the ink, and the title
 * lands across that fade with the copy, the buttons and the numbers on the
 * ink under it. The glass would be glass over ink there, so it is only ink.
 *
 * `object-[64%_50%]` keeps the surfer and the village in frame as the width
 * narrows; the empty water on the left is the first thing to go. From lg the
 * frame is wider than the photograph is tall, so the crop is vertical
 * instead: `78%` gives up the flat sky and lifts her clear of the title.
 */
export function CoachingHero() {
  return (
    <section className="bg-house-ink text-house-sand relative isolate overflow-hidden lg:flex lg:min-h-[min(100dvh,58rem)] lg:flex-col lg:justify-end">
      {/* The frame. A block of its own on a phone, the whole section from lg.
          Settles from a hair over size as it fades up, the way the package
          heroes arrive. */}
      <div
        className={cn(
          "relative h-[min(60svh,32rem)] sm:h-[34rem] lg:absolute lg:inset-0 lg:-z-10 lg:h-auto",
          ENTER,
          "zoom-in-105 ease-out",
        )}
      >
        <Image
          src="/assets/surf_3.jpg"
          alt="A surfer lying on a longboard in the flat water off Imsouane at first light, looking back over her shoulder for the next set, with the village stacked along the cliff behind her."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_50%] lg:object-[62%_78%]"
        />
        {/* On a phone: clear at the top, ink by the foot, so the title can
            land on the fade. From lg: only the lower half darkens, and
            lightly — the glass does the rest, and a heavy gradient under it
            turned the glass into a black slab with nothing showing through.
            Plus a light pull from the left where the title starts. */}
        <div
          aria-hidden
          className="from-house-ink via-house-ink/20 absolute inset-0 bg-gradient-to-t via-40% to-transparent lg:from-house-deep/45 lg:via-house-deep/5 lg:via-55%"
        />
        <div
          aria-hidden
          className="from-house-deep/45 absolute inset-0 hidden bg-gradient-to-r via-transparent via-45% to-transparent lg:block"
        />
      </div>

      {/* The title, across the fade on a phone and on the water from lg. */}
      <div className="relative -mt-24 px-6 sm:-mt-28 sm:px-10 lg:mt-0 lg:pt-40">
        <div className="mx-auto w-full max-w-6xl">
          <h1
            className={cn(
              "font-title text-house-shell text-[clamp(3rem,11vw,5.25rem)] lg:text-[min(5.25rem,6vw)] leading-[0.9] tracking-[-0.03em] text-balance text-shadow-md",
              ENTER,
              "slide-in-from-bottom-6",
            )}
          >
            How we coach
          </h1>
        </div>
      </div>

      {/* The band. Glass from lg, where there is a photograph under it; the
          section's own ink below that, where there is not. */}
      <div
        className={cn(
          "relative mt-8 px-6 pb-12 sm:px-10 sm:pb-14",
          "lg:border-house-shell/20 lg:bg-house-deep/65 lg:mt-12 lg:border-t lg:py-10 lg:backdrop-blur-xl",
        )}
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-end lg:gap-16">
          <div>
            <p
              className={cn(
                "font-display text-house-shell text-xl leading-snug text-pretty sm:text-2xl",
                ENTER,
                "slide-in-from-bottom-4 delay-150",
              )}
            >
              One goal per surfer, a coach who knows your name, and the proof
              on video.
            </p>
            <p
              className={cn(
                "text-house-shell/75 mt-4 max-w-xl text-base leading-relaxed text-pretty",
                ENTER,
                "delay-300",
              )}
            >
              Most surf camps teach a syllabus. We coach a person: the week is
              built around the one thing you came to learn, and every session,
              clip and evening is pointed at it.
            </p>

            <div
              className={cn(
                "mt-8 flex flex-wrap items-center gap-3",
                ENTER,
                "delay-500",
              )}
            >
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

          {/* The proof beside the claim. Three across at every width: each
              detail is two or three words, and a column of three stacked rows
              on a phone read as a list to scroll past rather than numbers to
              compare. The detail is display type at full strength — these
              are the figures the paragraph is asking to be trusted on. */}
          <dl
            className={cn(
              "border-house-sand/15 divide-house-sand/15 grid grid-cols-3 divide-x border-t pt-6 lg:border-t-0 lg:pt-0",
              ENTER,
              "delay-500",
            )}
          >
            {FACTS.map((fact) => (
              <div
                key={fact.term}
                className="flex flex-col-reverse justify-end gap-2 px-3 first:pl-0 last:pr-0 sm:px-5"
              >
                <dt className="text-house-sky font-mono text-label tracking-[0.18em] uppercase">
                  {fact.term}
                </dt>
                <dd className="font-display text-house-shell text-lg leading-tight text-balance sm:text-2xl lg:text-xl lg:whitespace-nowrap">
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

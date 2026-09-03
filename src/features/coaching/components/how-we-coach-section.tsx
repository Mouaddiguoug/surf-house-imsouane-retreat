import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { BOOK_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";

/**
 * The method, in the order a guest meets it — from the questionnaire before
 * the flight to the folder of clips after it. Chronology rather than a list
 * of features, because "how we coach" is a question about what happens.
 */
const STEPS = [
  {
    title: "It starts before you fly",
    body: "A short questionnaire — where you have surfed, what you can do on a wave, what you want to be able to do — and a prep pack of drills and reading so the first morning is not spent finding out.",
  },
  {
    title: "One goal, set at the Sunday dinner",
    body: "You tell the coaches what a good week would look like: a first green wave, a take-off that repeats, speed down the line, a first cutback, the walk to the nose. That sentence is the syllabus.",
  },
  {
    title: "Small groups, sorted by level",
    body: "Levels are drawn up over the same table, so nobody is held back by the group or thrown in ahead of it. The coach knows your name, your goal, and which of the two waves suits you today.",
  },
  {
    title: "Coached in the water, not shouted from the sand",
    body: "The coach paddles out with you: positioning in the line-up, wave selection, the timing of the take-off. Corrections arrive one at a time, while the last wave is still fresh.",
  },
  {
    title: "Filmed from the beach, reviewed after dinner",
    body: "Every session is filmed. In the evening your clips go up on the screen and you watch yourself surf — and fix the things you cannot feel from the inside. Style, stance, the moment you look down.",
  },
  {
    title: "Theory in the evenings, progress you take home",
    body: "Short sessions on reading the forecast, choosing a board, and the etiquette of a crowded point. On Friday your progress is read back against Sunday's goal, and your clips and notes leave with you.",
  },
];

/**
 * The three numbers a reader wants before they trust the paragraphs. Any
 * of these that changes on the ground should change here first.
 */
const FACTS = [
  { term: "Coach to surfer", detail: "1 : 4 at most" },
  { term: "In the water", detail: "Two a day" },
  { term: "On video", detail: "Every session" },
];

/**
 * How we coach.
 *
 * Ink, after the sand of the contact section. There is no photograph here on
 * purpose: the two package sections above already carry the surfing images,
 * and this one has to make an argument rather than a mood. The numerals do
 * the visual work — one method, six steps, read in order.
 */
export function HowWeCoachSection() {
  return (
    <section
      id="how-we-coach"
      className="bg-house-ink text-house-sand px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Coaching · 01"
              title="How we coach"
              subtitle="One goal per surfer, a coach who knows your name, and the proof on video."
            />

            <p className="text-house-sand/80 mt-6 text-base leading-relaxed text-pretty">
              Most surf camps teach a syllabus. We coach a person: the week is
              built around the one thing you came to learn, and every session,
              clip and evening is pointed at it.
            </p>
          </div>

          {/* Three numbers, set against the same rules as the Foundation's
              fact strip so the two read as one system. Right column on lg,
              where they sit level with the heading. */}
          <dl className="border-house-sand/20 grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-3 lg:self-end lg:border-t-0 lg:pt-0">
            {FACTS.map((fact) => (
              <div key={fact.term}>
                <dt className="text-house-sky font-mono text-[0.65rem] tracking-[0.18em] uppercase">
                  {fact.term}
                </dt>
                <dd className="font-display mt-2 text-2xl leading-none sm:text-3xl">
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="border-house-sand/20 mt-16 grid gap-x-16 gap-y-12 border-t pt-12 md:grid-cols-2">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              {/* A real numeral in the tree, so the order survives a
                  screen reader and a copy-paste. */}
              <span
                aria-hidden
                className="text-house-sky font-mono text-sm tracking-[0.18em] tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl leading-snug text-balance">
                  {step.title}
                </h3>
                <p className="text-house-sand/70 mt-2 text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <Link
            href={BOOK_HREF}
            className={cn(
              buttonVariants({ variant: "clay" }),
              "h-12 w-full px-6 text-xs sm:w-auto",
            )}
          >
            Book a coached week
          </Link>
          <Link
            href="#surf-level"
            className={cn(
              buttonVariants({ variant: "shellOutline" }),
              "h-12 w-full px-6 text-xs sm:w-auto",
            )}
          >
            What&apos;s my surf level
          </Link>
        </div>
      </div>
    </section>
  );
}

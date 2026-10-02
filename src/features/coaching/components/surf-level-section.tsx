import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils/cn";
import { CONTACT_HREF } from "@/lib/constants/nav";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

/**
 * Four levels, each opened by the sentence a surfer would say about
 * themselves. That sentence is the test — read the four and one of them is
 * you — so it comes before the name of the level, not after. "In between"
 * is normal and the copy says so; the groups get drawn up on Sunday night
 * anyway, from what the coaches see, not from what was ticked.
 */
const LEVELS = [
  {
    number: "01",
    name: "First waves",
    quote: "I have never surfed, or only a few times.",
    focus: [
      "Paddling, and getting out through the whitewater",
      "The pop-up, drilled on the sand before it is tried on a wave",
      "Stance, and where to look",
      "Etiquette and staying safe in a busy line-up",
      "First unbroken waves by the end of the week, with a good bank and a bit of luck",
    ],
    weeks: [{ label: "The Foundation", href: "/packages/the-foundation" }],
  },
  {
    number: "02",
    name: "Green waves",
    quote: "I catch green waves and angle my take-off.",
    focus: [
      "Reading where the wave will peel, and sitting there",
      "A take-off that repeats",
      "Angling left and right, then trimming along the face",
      "Loosening the stance so the board can be steered",
      "Choosing a board for the day",
    ],
    // Two weeks fit here, so two links: one line that named both and led to
    // one of them sent every longboarder to the wrong page.
    weeks: [
      { label: "The Foundation", href: "/packages/the-foundation" },
      {
        label: "The Classic Longboard week",
        href: "/packages/the-masterclass",
      },
    ],
  },
  {
    number: "03",
    name: "Speed and turns",
    quote: "I'm learning to turn and to generate speed.",
    focus: [
      "Speed down the line, from the rail rather than the arms",
      "The bottom turn, and the first top turns",
      "Positioning for the better waves at the point",
      "Duck-diving and getting out on bigger days",
      "Equipment for the conditions, from the free quiver",
    ],
    weeks: [
      {
        label: "The Classic Longboard week",
        href: "/packages/the-masterclass",
      },
    ],
  },
  {
    number: "04",
    name: "Manoeuvres",
    quote: "I'm working on cutbacks and top turns.",
    focus: [
      "Cutbacks, and the roundhouse when the wall allows",
      "Drive out of the bottom turn",
      "Top turns: positioning, rotation, the transition out",
      "Floaters and re-entries on the sections that offer them",
      "Wave selection on the days the point gets serious",
    ],
    weeks: [
      {
        label: "The Custom Retreat, coached one-to-one",
        href: "/packages/the-custom-retreat",
      },
    ],
  },
];

/**
 * What's my surf level.
 *
 * Cream, straight after the packages on sand: the second question a learner
 * asks, once they have seen the three weeks, is which one is theirs. Sand
 * cards on the cream, the inverse of the packages above. Four cards rather
 * than tabs: the reader is meant to skim
 * all four sentences and stop at their own, which tabs would hide.
 *
 * Each card folds. The name and the sentence are always out — those are the
 * test — and the five things a coach works on at that level, plus the weeks
 * it points to, open on demand. Closed, the section is four short cards
 * instead of a wall of twenty bullet points.
 */
export function SurfLevelSection() {
  return (
    <section
      id="surf-level"
      className="bg-background text-house-ink px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <SectionHeading
            title="What's my surf level"
            subtitle="Four levels, one honest sentence each. Read them and stop at yours."
          />

          <p className="mt-6 text-base leading-relaxed text-pretty">
            Feeling in between two of them is normal — most people are. Pick the
            closer one when you book; the groups are drawn up on Sunday night
            from what the coaches see in the water, not from what you ticked,
            and the coaching is one-to-one from there whatever the level.
          </p>
        </div>

        {/* `items-start` so an opened card grows on its own rather than
            stretching the one beside it to match. */}
        <ol className="mt-12 grid items-start gap-6 md:grid-cols-2">
          {LEVELS.map((level) => (
            <li
              key={level.number}
              className="border-house-ink/10 bg-house-sand shadow-card rounded-3xl border p-6 sm:p-8"
            >
              {/* Native disclosure, as in "Is this trip for me": no script,
                  keyboard and screen-reader behaviour for free, and the page
                  prints with every level open. The name and the sentence stay
                  out here because they are the test — the reader is meant to
                  skim four of them and stop at their own; only the detail
                  underneath folds away. */}
              <details className="group/level details-reveal">
                <summary
                  className={cn(
                    "cursor-pointer list-none [&::-webkit-details-marker]:hidden",
                    "rounded-sm",
                    focusRing,
                  )}
                >
                  <span className="text-house-muted font-mono text-xs tracking-[0.18em] uppercase">
                    Level {level.number} · {level.name}
                  </span>

                  {/* The test itself. Display type at body-plus size, because
                      it is the one line on the card that has to be read. */}
                  <span className="font-display mt-4 block text-xl leading-snug text-balance sm:text-2xl">
                    &ldquo;{level.quote}&rdquo;
                  </span>

                  <span className="border-house-ink/10 mt-6 flex min-h-11 items-center justify-between gap-4 border-t pt-4 transition-colors duration-200 group-hover/level:text-house-tide motion-reduce:transition-none">
                    <span className="text-house-muted font-mono text-label tracking-[0.18em] uppercase">
                      What we work on
                    </span>
                    <ChevronDown
                      aria-hidden
                      className="text-house-muted size-5 shrink-0 transition-[color,transform] duration-200 group-open/level:rotate-180 group-hover/level:text-house-tide motion-reduce:transition-none"
                    />
                  </span>
                </summary>

                <ul className="mt-4 space-y-3">
                  {level.focus.map((item) => (
                    <li
                      key={item}
                      className="text-house-muted border-house-ink/10 border-t pt-3 text-sm leading-relaxed first:border-t-0 first:pt-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <ul className="border-house-ink/10 mt-6 border-t pt-2">
                  {level.weeks.map((week) => (
                    <li key={week.href}>
                      <Link
                        href={week.href}
                        className={`group/week flex min-h-11 items-center justify-between gap-4 rounded-sm py-2 transition-colors duration-200 hover:text-house-tide motion-reduce:transition-none ${focusRing}`}
                      >
                        <span className="text-sm leading-relaxed">
                          <span className="text-house-muted">Your week: </span>
                          <span className="underline-offset-4 group-hover/week:underline">
                            {week.label}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="text-house-muted size-4 shrink-0 transition-[color,transform] duration-200 group-hover/week:translate-x-0.5 group-hover/week:text-house-tide motion-reduce:transition-none"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ol>

        <p className="text-house-muted mt-10 text-sm leading-relaxed">
          Still not sure?{" "}
          <Link
            href={CONTACT_HREF}
            className={`text-house-tide rounded-sm underline underline-offset-4 transition-colors duration-200 hover:text-house-ink ${focusRing}`}
          >
            Tell us how you surf
          </Link>{" "}
          and we will place you before you arrive.
        </p>
      </div>
    </section>
  );
}

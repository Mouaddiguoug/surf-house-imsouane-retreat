import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
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
    week: { label: "The Foundation", href: "#the-foundation" },
  },
  {
    number: "02",
    name: "Green waves",
    quote: "I catch unbroken waves and I'm starting to angle my take-off.",
    focus: [
      "Reading where the wave will peel, and sitting there",
      "A take-off that repeats",
      "Angling left and right, then trimming along the face",
      "Loosening the stance so the board can be steered",
      "Choosing a board for the day",
    ],
    week: {
      label: "The Foundation, or the Classic Longboard week",
      href: "#the-foundation",
    },
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
    week: { label: "The Classic Longboard week", href: "#the-masterclass" },
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
    week: {
      label: "The Custom Retreat, coached one-to-one",
      href: "#the-custom",
    },
  },
];

/**
 * What's my surf level.
 *
 * Sand after the ink of "How we coach", and the same shell-card grammar as
 * the Custom Retreat so the two coaching sections read as one family with
 * the packages. Four cards rather than tabs: the reader is meant to skim
 * all four sentences and stop at their own, which tabs would hide.
 */
export function SurfLevelSection() {
  return (
    <section
      id="surf-level"
      className="bg-house-sand text-house-ink px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow="Coaching · 02"
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

        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          {LEVELS.map((level) => (
            <li
              key={level.number}
              className="border-house-ink/10 bg-house-shell shadow-card flex flex-col rounded-3xl border p-6 sm:p-8"
            >
              <p className="text-house-muted font-mono text-xs tracking-[0.18em] uppercase">
                Level {level.number} · {level.name}
              </p>

              {/* The test itself. Display type at body-plus size, because it
                  is the one line on the card that has to be read. */}
              <blockquote className="font-display mt-4 text-xl leading-snug text-balance sm:text-2xl">
                &ldquo;{level.quote}&rdquo;
              </blockquote>

              <p className="text-house-muted mt-6 font-mono text-[0.65rem] tracking-[0.18em] uppercase">
                What we work on
              </p>
              <ul className="mt-3 flex-1 space-y-3">
                {level.focus.map((item) => (
                  <li
                    key={item}
                    className="text-house-muted border-house-ink/10 border-t pt-3 text-sm leading-relaxed first:border-t-0 first:pt-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={level.week.href}
                className={`group/week border-house-ink/10 mt-6 flex min-h-11 items-center justify-between gap-4 rounded-sm border-t pt-5 transition-colors duration-200 hover:text-house-tide motion-reduce:transition-none ${focusRing}`}
              >
                <span className="text-sm leading-relaxed">
                  <span className="text-house-muted">Your week: </span>
                  <span className="underline-offset-4 group-hover/week:underline">
                    {level.week.label}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="text-house-clay size-4 shrink-0 transition-transform duration-200 group-hover/week:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
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

import { Fish, Soup, Sunrise } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { BookButton } from "@/features/booking/components/book-button";
import { cn } from "@/lib/utils/cn";

/**
 * The week, as it is actually run.
 *
 * Six entries rather than seven: Saturday is an arrival day and nothing is
 * promised on it, so putting it in the list would be padding.
 */
const WEEK = [
  {
    day: "Sunday",
    title: "The integration dinner",
    body: "You meet the coaches, set your own goal for the week, and the level groups are drawn up over the table.",
  },
  {
    day: "Monday & Tuesday",
    title: "Foundations",
    body: "Assessment in the water, then your own program: positioning, paddling, a take-off that repeats, and how to read the bay.",
  },
  {
    day: "Wednesday",
    title: "The break",
    body: "Active rest. The body files away what it learned, and nobody arrives at Thursday already injured.",
  },
  {
    day: "Thursday",
    title: "Refining",
    body: "Precision work, then the video review after dinner — you watch yourself surf and correct what you cannot feel from the inside.",
  },
  {
    day: "Friday",
    title: "Validation",
    body: "Assisted free surf against Sunday's goal, and your progress read back to you over the last meal.",
  },
];

const INCLUDED = [
  {
    icon: Sunrise,
    title: "Five yoga sessions",
    body: "Dynamic in the morning to switch the body on, restorative Yin in the evening for the shoulders and lower back.",
  },
  {
    icon: Soup,
    title: "Surf-Fuel full board",
    body: "Full board built around performance and recovery: local protein, slow carbohydrates, and the superfoods that grow here.",
  },
  {
    icon: Fish,
    title: "The village, not the postcard",
    body: "Tuesday you walk to the auction with the chef to haggle for the evening's fish. Wednesday is a Berber souk in the hills, or argan and a tagine with the women of the village.",
  },
];

const FACTS = [
  { term: "Level", detail: "Beginner & improver" },
  { term: "Format", detail: "7 nights, fixed dates" },
  { term: "Arrival", detail: "Saturday or Sunday" },
];

/**
 * Package 01.
 *
 * The image column is sticky on `lg` because the right column runs long — the
 * week is the substance of this package and shortening it would sell it
 * short — and a static photo would otherwise scroll away within the first
 * two days.
 */
export function FoundationSection() {
  return (
    <section
      id="the-foundation"
      className="border-border bg-background border-t px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <div className="shadow-photo relative aspect-4/5 w-full overflow-hidden rounded-3xl">
              <Image
                src="/assets/surf_1.jpg"
                alt="A surfer trimming down the face of a clean right-hander at Imsouane while the rest of the group waits in the lineup."
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-4">
              {FACTS.map((fact) => (
                <div key={fact.term}>
                  <dt className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.18em] uppercase">
                    {fact.term}
                  </dt>
                  <dd className="mt-1 text-sm">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionHeading
              eyebrow="Package 01 · The Foundation"
              title="Surf, Roots & Reset"
              subtitle="An academy week for beginners and improvers."
            />

            <p className="mt-6 text-base leading-relaxed text-pretty">
              More than a surf school. Five coached days on the ISA method that
              change how you read the ocean, held up by the village around you
              and by enough recovery to paddle out again tomorrow.
            </p>

            {/* The days carry the argument for this package, so they get the
                timeline treatment rather than a paragraph. The dot is pulled
                28px left — half its own width past the 24px padding — to sit
                centred on the rule. */}
            <ol className="border-border mt-10 space-y-8 border-l pl-6">
              {WEEK.map((entry) => (
                <li key={entry.day} className="relative">
                  <span
                    aria-hidden
                    className="bg-house-clay absolute top-1.5 -left-7 size-2 rounded-full"
                  />
                  <p className="text-house-clay font-mono text-xs tracking-[0.18em] uppercase">
                    {entry.day}
                  </p>
                  <p className="font-display mt-1.5 text-lg">{entry.title}</p>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {entry.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Out of the two columns and across the full measure: three cards in
            the right-hand column would each be ~140px wide on a laptop, which
            breaks the body copy into two-word lines. */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {INCLUDED.map(({ icon: Icon, title, body }) => (
            // Sand is a fixed ground rather than a themed one, so these
            // three carry their own ink instead of inheriting a foreground
            // that would invert with the theme and vanish.
            <div
              key={title}
              className="bg-house-sand text-house-ink shadow-card rounded-2xl p-6"
            >
              <Icon aria-hidden className="text-house-clay size-5" />
              <p className="font-display mt-3 text-lg">{title}</p>
              <p className="text-house-muted mt-2 text-sm leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mt-8 font-mono text-xs leading-relaxed tracking-[0.05em]">
          Add on: sandboarding the Timlaline dunes at sunset, or the cliffs on
          horseback or by quad.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <BookButton className="h-12 w-full px-6 text-xs sm:w-auto">
            Book the Foundation
          </BookButton>
          <Link
            href="#how-we-coach"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-12 w-full px-4 font-mono text-xs tracking-[0.14em] uppercase sm:w-auto",
            )}
          >
            How we coach
          </Link>
        </div>
      </div>
    </section>
  );
}

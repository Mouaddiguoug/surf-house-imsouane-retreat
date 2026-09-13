import { Fish, Soup, Sunrise } from "lucide-react";

import { PackageHero } from "@/features/packages/components/package-hero";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-foundation");

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

/**
 * Package 01, as the body of its own page.
 *
 * Three sections rather than one. It used to be a single block with a single
 * heading, which is what a section is — the week and the inclusions sat inside
 * it as anonymous lists, and a reader scanning the page had one signpost for
 * the whole thing. Each part now opens with its own heading and its own
 * ground, so the page can be skimmed the way a page is: the offer, the week
 * that makes the case, then what comes with it.
 */
export function FoundationPackage() {
  return (
    <>
      <PackageHero
        package={PACKAGE}
        id="the-foundation"
        tone="cream"
        lede="More than a surf school. Five coached days on the ISA method that change how you read the ocean, held up by the village around you and by enough recovery to paddle out again tomorrow."
      />

      <section
        id="the-week"
        className="bg-house-sand text-house-ink px-6 py-20 sm:px-10 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            The week, day by day
          </h2>
          <p className="text-house-muted mt-3 max-w-xl text-base leading-relaxed text-pretty">
            Five coached days, one off in the middle, and a goal set on the
            first night that the last night measures you against.
          </p>

          {/* The days carry the argument for this package, so they get the
              timeline treatment rather than a paragraph. The dot is pulled
              28px left — half its own width past the 24px padding — to sit
              centred on the rule. */}
          <ol className="border-house-ink/15 mt-12 max-w-2xl space-y-8 border-l pl-6">
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
                <p className="text-house-muted mt-1.5 text-sm leading-relaxed">
                  {entry.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="what-is-included"
        className="bg-background px-6 py-20 sm:px-10 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            What comes with it
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed text-pretty">
            The surfing is five days of the week. This is the rest of it.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
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
        </div>
      </section>
    </>
  );
}

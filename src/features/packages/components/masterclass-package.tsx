import { BookOpen, Footprints, Video } from "lucide-react";

import { PackageDay } from "@/features/packages/components/package-day";
import { PackageHero } from "@/features/packages/components/package-hero";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-masterclass");

/** The moves the week is built around, in the order they are taught. */
const GOALS = ["Trim", "Cross-step", "Hang five", "Hang ten"];

/** A day on the log. The surfing moves with the tide; the drills do not. */
const DAY = [
  {
    time: "07:30",
    title: "Balance and flexibility",
    body: "The morning yoga is built for the nose ride rather than for power: ankles, hips, and the stillness a cross-step needs.",
  },
  {
    time: "08:30",
    title: "Breakfast, kept light",
    body: "Anti-inflammatory and easy on the walk out — there is a nine-six under your arm and the point is a long way.",
  },
  {
    time: "10:00",
    title: "The session on the point",
    body: "Long, patient rights and the coach in the water. Trim first, then the walk, then the nose — in that order, and filmed from the beach.",
  },
  {
    time: "13:00",
    title: "Lunch",
    body: "Back at the house, boards rinsed, the morning's clips already copying across for the evening.",
  },
  {
    time: "15:00",
    title: "Surf skate on the tarmac",
    body: "The footwork, drilled where it can be repeated a hundred times: so the cross-step is already in the legs by the time you carry the board down.",
  },
  {
    time: "17:00",
    title: "Golden hour",
    body: "Free surf if the tide has come round, or the terrace and the sunset if it has not. Nobody is timed.",
  },
  {
    time: "19:30",
    title: "Dinner",
    body: "Full board, together, the day's waves argued over.",
  },
  {
    time: "20:30",
    title: "Video analysis and theory",
    body: "Your rides on the screen, one at a time. Then where the longboard came from, what a single fin actually does, and what your outline is doing under you.",
  },
];

const METHOD = [
  {
    icon: Video,
    title: "Video analysis, every day",
    body: "Non-negotiable on a log. Style is the whole point and style cannot be corrected from the inside — you have to see it.",
  },
  {
    icon: Footprints,
    title: "Surf skate on the tarmac",
    body: "Afternoons spent drilling the footwork on a surf skate, so the dance is already in the legs by the time you carry the board down to the point.",
  },
  {
    icon: BookOpen,
    title: "Evening theory",
    body: "Where the longboard came from, what a single fin actually does, and how an outline dictates the way a board behaves under you.",
  },
];

/**
 * Package 02, as the body of its own page.
 *
 * Ink only for the opening now. It used to be ink end to end because it was
 * one section among several on the home page and had to look like a different
 * proposition to the two weeks either side of it; on a page of its own that
 * argument is already won by the URL, and a whole page of ink is a tunnel.
 * The colour stays where it introduces the week and the rest of the page
 * returns to the light grounds, which is also the only way the method blocks
 * can be read at length.
 */
export function MasterclassPackage() {
  return (
    <>
      <PackageHero
        package={PACKAGE}
        id="the-masterclass"
        tone="ink"
        lede="Imsouane is a long, patient right — the wave the log was designed for. This week is the one that suits it: grace over power, the walk to the nose, and the flow that holds a whole ride together."
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {GOALS.map((goal) => (
            <li
              key={goal}
              className="border-house-sand/25 text-house-sand/80 rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-[0.18em] uppercase"
            >
              {goal}
            </li>
          ))}
        </ul>
      </PackageHero>

      <section
        id="how-it-is-taught"
        className="bg-background px-6 py-20 sm:px-10 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            How the week is taught
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed text-pretty">
            Three things run every day, and none of them are only surfing.
          </p>

          <dl className="mt-12 grid gap-8 sm:grid-cols-3">
            {METHOD.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon aria-hidden className="text-house-clay size-5" />
                <dt className="font-display mt-3 text-lg">{title}</dt>
                <dd className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PackageDay
        id="a-typical-day"
        tone="sand"
        heading="What a day looks like"
        intro="The same rhythm as the Foundation — Sunday to Friday, Wednesday off — with the afternoons and evenings given to the log."
        entries={DAY}
        note="The point works on the tide, so the session moves and the day is built around it. The clock here is a typical one, not a promise."
      />
    </>
  );
}

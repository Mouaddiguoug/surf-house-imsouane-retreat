import { BookOpen, Footprints, Video } from "lucide-react";

import { PackageHero } from "@/features/packages/components/package-hero";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-masterclass");

/** The moves the week is built around, in the order they are taught. */
const GOALS = ["Trim", "Cross-step", "Hang five", "Hang ten"];

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

      <section
        id="the-rhythm"
        className="bg-house-sand text-house-ink px-6 py-20 sm:px-10 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            The rhythm of the week
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty">
            The week runs on the same rhythm as the Foundation — Sunday to
            Friday, Wednesday off — with yoga built around balance and
            flexibility rather than power, and light anti-inflammatory food for
            the long walks out to the point with a nine-six under your arm.
          </p>
        </div>
      </section>
    </>
  );
}

import { PackageDay } from "@/features/packages/components/package-day";
import { PackageFeature } from "@/features/packages/components/package-feature";
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

/**
 * Package 02, as the body of its own page.
 *
 * This page used to be ink end to end, and then ink for its opening alone,
 * because it was one section among several on the home page and had to look
 * like a different proposition to the two weeks either side of it. On a page
 * of its own that argument is won by the URL before the reader sees a colour,
 * and the odd hero out made the three packages read as three different sites
 * rather than three weeks at one house. It opens on the same light ground as
 * the others now; what distinguishes this week is the log, not the paint.
 *
 * The three method blocks were a row of cards with an icon and two lines
 * each; they are three sections now, one photograph apiece, for the same
 * reason the Foundation's inclusions are — "three across" was the size of
 * the layout, not the size of what they were.
 */
export function MasterclassPackage() {
  return (
    <>
      <PackageHero
        package={PACKAGE}
        id="the-masterclass"
        tone="cream"
        lede="Imsouane is a long, patient right — the wave the log was designed for. This week is the one that suits it: grace over power, the walk to the nose, and the flow that holds a whole ride together."
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {GOALS.map((goal) => (
            <li
              key={goal}
              className="border-house-ink/20 text-house-muted rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-[0.18em] uppercase"
            >
              {goal}
            </li>
          ))}
        </ul>
      </PackageHero>

      <PackageFeature
        id="video-analysis"
        tone="sand"
        side="left"
        eyebrow="Method · Video analysis"
        title="Filmed every day, reviewed every night"
        body="Non-negotiable on a log. Style is the whole point, and style cannot be corrected from the inside — you have to see it. Every session is filmed from the beach, and after dinner your rides go up on the screen one at a time: the stance, the trim, the moment you look down, the step that came half a beat late."
        frames={[
          {
            src: "/assets/video_analysis.JPG",
            alt: "A longboarder trimming along the face of a green wave at Imsouane, with the rest of the group waiting in the line-up behind.",
          },
        ]}
      />

      <PackageFeature
        id="surf-skate"
        tone="cream"
        side="right"
        eyebrow="Method · Surf skate"
        title="The footwork, drilled on tarmac"
        body="Afternoons on a surf skate, where a movement can be repeated a hundred times in an hour and the ocean is not deciding when you get another go. Trim, then the cross-step, then the walk — so the dance is already in the legs by the time you carry the board down to the point."
        frames={[
          {
            src: "/assets/skateboard.JPG",
            alt: "A surfer cross-stepping along a surf skate on a concrete ramp outside the house, watched by the rest of the group.",
          },
        ]}
      />

      <PackageFeature
        id="evening-theory"
        tone="sand"
        side="left"
        eyebrow="Method · Evening theory"
        title="Where the longboard came from"
        body="What a single fin actually does, and how an outline dictates the way a board behaves under you. Not history for its own sake: knowing why the board wants what it wants is what turns a lucky nose ride into one you can repeat."
        frames={[
          {
            src: "/assets/evening_theory.jpg",
            alt: "The group on the sand with their longboards before a session, listening to a coach read the bay.",
          },
        ]}
      />

      <PackageDay
        id="a-typical-day"
        heading="What a day looks like"
        intro="The same rhythm as the Foundation — Sunday to Friday, Wednesday off — with the afternoons and evenings given to the log."
        entries={DAY}
        note="The point works on the tide, so the session moves and the day is built around it. The clock here is a typical one, not a promise."
      />
    </>
  );
}

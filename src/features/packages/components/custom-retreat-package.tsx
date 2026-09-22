import { Compass, Waves, Wind } from "lucide-react";

import { PackageDay } from "@/features/packages/components/package-day";
import { PackageFeature } from "@/features/packages/components/package-feature";
import { PackageHero } from "@/features/packages/components/package-hero";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-custom-retreat");

/**
 * One way a day goes. Parts of the day rather than the clock: the house sets
 * no hours for this package, and a timetable would say otherwise.
 */
const DAY = [
  {
    time: "Morning",
    title: "Breakfast, whenever you surface",
    body: "Surf-Fuel, on the terrace, included. The one fixed thing in the day, and it is not fixed to an hour.",
  },
  {
    time: "Late morning",
    title: "The quiver, or a drop-in session",
    body: "Take a board from the rack and go, or join an academy session when a place is free and surf with a coach for the morning.",
  },
  {
    time: "Midday",
    title: "The work you brought",
    body: "Fast Wi-Fi, a chill-out zone with a view of the bay, and nobody asking when you will be done.",
  },
  {
    time: "Afternoon",
    title: "A class, a massage, or the dunes",
    body: "Yoga by the class. The recovery room. Or out of the house entirely — sandboarding the Timlaline dunes at sunset, or the cliffs by horse or quad.",
  },
  {
    time: "Evening",
    title: "The communal dinner",
    body: "A ticket from the book buys a seat at the long table with whoever is in the house that week.",
  },
];

const MODULES = [
  {
    icon: Waves,
    title: "Ocean",
    items: [
      "Premium quiver on free rental — shortboards, twin fins, classic logs",
      "Drop-in sessions: join an academy day when a place is free",
      "Private one-to-one coaching, or guiding to the quiet spots north and south",
    ],
  },
  {
    icon: Wind,
    title: "Wellness & food",
    items: [
      "A ticket book for the communal dinners",
      "Yoga by the class, whenever you want it",
      "Massage, and the recovery room when you need it",
    ],
  },
  {
    icon: Compass,
    title: "Adventure",
    items: [
      "Sandboarding the Timlaline dunes at sunset",
      "The cliffs on horseback or by quad",
      "The Berber souk in the hills",
    ],
  },
];

/**
 * Package 03, as the body of its own page.
 *
 * The base and the modules answer two different questions — what you get for
 * turning up, and what you can add — and a reader deciding between them
 * should be able to find either from the outline. The base was a row of three
 * one-line cards; it is three sections now, a photograph apiece, because the
 * room, the breakfast and the house are the whole of what this package
 * promises before anything is added to it, and a single line each undersold
 * all three.
 */
export function CustomRetreatPackage() {
  return (
    <>
      <PackageHero
        package={PACKAGE}
        id="the-custom"
        tone="sand"
        lede="Your stay, your rules. For nomads working the morning, couples on their own clock, and independent surfers who want the house and the quiver without the timetable."
      />

      <PackageFeature
        id="your-room"
        tone="cream"
        side="left"
        eyebrow="Always included · The room"
        title="A bed that is yours for as long as you want it"
        body="A premium dorm bed or a private room, from two nights, arriving any day of the week. No fixed changeover, no Saturday-to-Saturday: the room is the only thing you have to book, and everything else on this page is optional."
        frames={[
          {
            src: "/assets/book_a_stay_1.JPG",
            alt: "A private room at the house: a made double bed, a painted mural along one wall, and light coming through the curtains from the sea-facing window.",
          },
        ]}
      />

      <PackageFeature
        id="breakfast"
        tone="sand"
        side="right"
        eyebrow="Always included · Breakfast"
        title="Surf-Fuel, whenever you surface"
        body="The same breakfast the coached weeks eat — local protein, slow carbohydrates, fruit, and the superfoods that grow here — without the timetable that comes with them. It is the one fixed thing in the day, and it is not fixed to an hour."
        frames={[
          {
            src: "/assets/surf_fuel.jpg",
            alt: "Guests at the long table inside the house over breakfast, a surfboard leaning in the foreground and the house dog underfoot.",
          },
        ]}
      />

      <PackageFeature
        id="the-house-itself"
        tone="cream"
        side="left"
        eyebrow="Always included · The house"
        title="Terraces, shade, and Wi-Fi that holds"
        body="The rooftop over the bay, the chill-out zones, and a connection fast enough for the work you brought. Nobody asks when you will be done, and the point is a two-minute walk away for when you are."
        frames={[
          {
            src: "/assets/rooftop.JPG",
            alt: "The rooftop terrace at dusk: low seating and rugs around a table, the village rooftops and the bay stretching out beyond.",
          },
        ]}
      />

      <section
        id="build-the-rest"
        className="bg-house-sand text-house-ink px-6 py-20 sm:px-10 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            Build the rest
          </h2>
          <p className="text-house-muted mt-3 max-w-xl text-base leading-relaxed text-pretty">
            Three sets of things to add, by the session or by the day, for as
            much or as little of the stay as you want.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {MODULES.map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className="border-house-ink/10 bg-house-shell shadow-card rounded-3xl border p-6 sm:p-8"
              >
                <Icon aria-hidden className="text-house-clay size-5" />
                <h3 className="font-display mt-3 text-xl">{title}</h3>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-house-muted border-house-ink/10 border-t pt-3 text-sm leading-relaxed first:border-t-0 first:pt-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PackageDay
        id="a-day-you-might-build"
        heading="A day you might build"
        intro="There is no timetable, which is the point. This is one way a day here goes — parts of the day rather than hours, because you set the hours."
        entries={DAY}
        note="Everything past breakfast is a module, bookable by the session or by the day, for as much or as little of the stay as you want."
      />
    </>
  );
}

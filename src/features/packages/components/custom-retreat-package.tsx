import { Compass, Waves, Wind } from "lucide-react";

import { PackageDay } from "@/features/packages/components/package-day";
import { PackageHero } from "@/features/packages/components/package-hero";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-custom-retreat");

/** What every night includes before anything is added to it. */
const BASE = [
  "Your room — premium dorm bed or private",
  "Surf-Fuel breakfasts",
  "Terraces, chill-out zones, fast Wi-Fi for the work you brought",
];

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
 * The other two sell a fixed week and open on a photograph. This one sells the
 * freedom to assemble your own, so the modules are its picture and the frame
 * stays a watermark behind the opening. The base and the modules are two
 * sections rather than two anonymous blocks, because they answer two different
 * questions — what you get for turning up, and what you can add — and a reader
 * deciding between them should be able to find either one from the outline.
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

      <section
        id="always-included"
        className="bg-background px-6 py-20 sm:px-10 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            Always included
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed text-pretty">
            Every night comes with this much, before you add anything to it.
          </p>

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {BASE.map((item) => (
              <li
                key={item}
                className="bg-house-sand text-house-ink shadow-card rounded-2xl p-6 text-sm leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

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
        tone="cream"
        heading="A day you might build"
        intro="There is no timetable, which is the point. This is one way a day here goes — parts of the day rather than hours, because you set the hours."
        entries={DAY}
        note="Everything past breakfast is a module, bookable by the session or by the day, for as much or as little of the stay as you want."
      />
    </>
  );
}

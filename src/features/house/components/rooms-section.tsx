import Image from "next/image";

import { SectionHeading } from "@/components/shared/section-heading";

/**
 * The room, listed plainly.
 *
 * Deliberately specific: "sea-facing" and "kitchenette" are the two questions
 * every booking email asks, and a vague paragraph makes people write the email
 * instead of booking.
 */
const SPECS = [
  {
    term: "The window",
    detail:
      "Floor to ceiling, facing the water. Linen curtains draw across it when the sun comes round.",
  },
  {
    term: "The beds",
    detail:
      "Twins that make up as a double. Fresh linen and towels, changed midweek.",
  },
  {
    term: "The kitchenette",
    detail:
      "Gas hob, sink and counter, for the coffee you want before anyone else is up.",
  },
  {
    term: "Underfoot",
    detail:
      "Wood floors, white walls, and a shower with hot water at six in the morning.",
  },
];

/**
 * House 02.
 *
 * Sand, and the photograph on the left — the mirror of the ink section that
 * follows it, so the two rooms sections do not read as the same slide twice.
 */
export function RoomsSection() {
  return (
    <section
      id="the-rooms"
      className="bg-house-sand text-house-ink px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="shadow-photo relative aspect-4/3 w-full overflow-hidden rounded-3xl">
          <Image
            src="/assets/bedroom_2.JPG"
            alt="A bright white studio room: bed set beside a floor-to-ceiling window onto the sea, cream curtains drawn back, and a kitchenette with a gas hob along the near wall."
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="The house · 02"
            title="The rooms"
            subtitle="Sea-facing studios, kept simple on purpose."
          />

          <p className="mt-6 text-base leading-relaxed text-pretty">
            White walls, a big window and very little else. You are out of the
            room from seven until dark, so it is built for the two things that
            actually matter after a week of surfing: blackout sleep and
            somewhere dry to put a wetsuit.
          </p>

          <dl className="mt-10">
            {SPECS.map((spec) => (
              <div
                key={spec.term}
                className="border-house-ink/10 grid gap-1 border-t py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="text-house-muted font-mono text-xs tracking-[0.18em] uppercase">
                  {spec.term}
                </dt>
                <dd className="text-sm leading-relaxed">{spec.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

import { Compass, Waves, Wind } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { BOOK_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";

/** What every night includes before anything is added to it. */
const BASE = [
  "Your room — premium dorm bed or private",
  "Surf-Fuel breakfasts",
  "Terraces, chill-out zones, fast Wi-Fi for the work you brought",
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
 * Package 03.
 *
 * No photograph here on purpose: the other two sections sell a fixed week and
 * a photo does that work, while this one sells the freedom to assemble your
 * own — so the modules themselves are the image. The wordmark sits behind the
 * grid as a watermark to keep the panel from reading as an empty pricing page.
 */
export function CustomRetreatSection() {
  return (
    <section
      id="the-custom"
      className="bg-house-sand text-house-ink relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32"
    >
      <Image
        src="/assets/surf_3.png"
        alt=""
        aria-hidden
        width={4580}
        height={4580}
        sizes="420px"
        className="pointer-events-none absolute top-16 right-4 hidden w-[300px] opacity-[0.09] xl:block"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow="Package 03 · From two nights, arrive any day"
            title="The Custom Retreat"
            subtitle="Bed, breakfast &amp; board — then build the rest yourself."
          />

          <p className="mt-6 text-base leading-relaxed text-pretty">
            Your stay, your rules. For nomads working the morning, couples on
            their own clock, and independent surfers who want the house and the
            quiver without the timetable.
          </p>
        </div>

        <div className="border-house-ink/10 bg-house-shell shadow-card mt-10 rounded-3xl border p-6 sm:p-8">
          <p className="text-house-muted font-mono text-xs tracking-[0.18em] uppercase">
            Always included
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {BASE.map((item) => (
              <li key={item} className="text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
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

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href={BOOK_HREF}
            className={cn(
              buttonVariants({ variant: "clay" }),
              "h-12 w-full px-6 text-xs sm:w-auto",
            )}
          >
            Build your stay
          </Link>
          <Link
            href="#is-this-trip-for-me"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-house-ink hover:bg-house-ink/5 h-12 w-full px-4 font-mono text-xs tracking-[0.14em] uppercase sm:w-auto",
            )}
          >
            Is this trip for me
          </Link>
        </div>
      </div>
    </section>
  );
}

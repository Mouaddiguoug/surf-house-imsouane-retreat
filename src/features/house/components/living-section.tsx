import { Coffee, Laptop, Sofa } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { BOOK_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";

const SPACE = [
  {
    icon: Sofa,
    title: "Somewhere to collapse",
    body: "A corner sofa and a low table, an arch away from the bed. The obvious place to be while your shoulders remember the morning.",
  },
  {
    icon: Laptop,
    title: "A table you can work at",
    body: "A proper desk height table and chairs, not a laptop balanced on your knees. The Wi-Fi holds a call.",
  },
  {
    icon: Coffee,
    title: "Your own kitchen corner",
    body: "Hob, sink and counter for breakfast before dawn patrol, or for the nights you would rather not be sociable.",
  },
];

/**
 * House 03.
 *
 * Ink, to close the house group the way the Masterclass closes the fixed
 * weeks — but with the photograph on the right and the three points laid
 * across the foot rather than stacked in the column, so the two dark bands
 * read as different sections rather than one template.
 */
export function LivingSection() {
  return (
    <section
      id="the-living-space"
      className="bg-house-ink text-house-sand px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="The house · 03"
              title="The living space"
              subtitle="Room to land, for the stays that run longer than a week."
            />

            <p className="text-house-sand/80 mt-6 text-base leading-relaxed text-pretty">
              Each apartment opens into its own living room — sofa, table,
              kitchen corner — with the bedroom through the arch. It is the part
              of the house that makes a fortnight work as easily as a weekend,
              and the reason the Custom Retreat suits people who bring their
              work with them.
            </p>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
            <Image
              src="/assets/living_room.JPG"
              alt="An apartment living room: a grey corner sofa and wooden coffee table, a dining table and chairs, a woven palm pendant lamp, and the bedroom visible through a wide arch."
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {SPACE.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-house-sand/20 border-t pt-5">
              <Icon aria-hidden className="text-house-sky size-5" />
              <h3 className="font-display mt-3 text-lg">{title}</h3>
              <p className="text-house-sand/70 mt-2 text-sm leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* The only call to action in the house group. Three sections of
            rooms with a "Book a stay" under each would read as a pitch; one
            at the end, where the reader has seen the whole house, does not. */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            href={BOOK_HREF}
            className={cn(
              buttonVariants({ variant: "clay" }),
              "h-12 w-full px-6 text-xs sm:w-auto",
            )}
          >
            Book a stay
          </Link>
          <Link
            href="#the-foundation"
            className={cn(
              buttonVariants({ variant: "shellOutline" }),
              "h-12 w-full px-6 text-xs sm:w-auto",
            )}
          >
            See the packages
          </Link>
        </div>
      </div>
    </section>
  );
}

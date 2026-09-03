import { Anchor, Plane, Waves } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { HouseMap } from "@/features/imsouane/components/house-map";
import { CONTACT_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

const { latitude, longitude } = SITE.coordinates;

/** Google Maps takes a bare "lat,lng" destination and routes from wherever the visitor is. */
const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

const WHAT_IS_HERE = [
  {
    icon: Waves,
    title: "The Bay",
    body: "A long, slow right that peels for several hundred metres on a good day — the reason people arrive carrying a nine-six.",
  },
  {
    icon: Anchor,
    title: "Cathedral Point",
    body: "The shorter, sharper right at the north end by the port. Where the week goes when the swell is up.",
  },
  {
    icon: Plane,
    title: "Getting here",
    body: "Roughly two hours from Agadir Al Massira, an hour and a half from Essaouira, three and a half from Marrakech. We arrange transfers.",
  },
];

/**
 * Imsouane, and where the house sits in it.
 *
 * The map earns half the section because "where is it" is the question this
 * anchor exists to answer — a paragraph of driving times cannot show that the
 * house is a few hundred metres from the point.
 */
export function ImsouaneSection() {
  return (
    <section
      id="imsouane"
      className="border-border bg-background border-t px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="flex flex-col">
            <SectionHeading
              eyebrow="Imsouane · The bay"
              title="Two waves and a fishing port"
              subtitle="A village of a thousand people on the coast road, two hours north of Agadir."
            />

            <p className="mt-6 text-base leading-relaxed text-pretty">
              Imsouane is a working port with a wave attached: boats out at
              dawn, the catch sold on the quay by nine, and a headland that
              turns Atlantic swell into one of the longest rights in Morocco.
              There is a handful of cafés, one road in, and very little else —
              which is the point.
            </p>

            <dl className="mt-10 space-y-6">
              {WHAT_IS_HERE.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <Icon
                    aria-hidden
                    className="text-house-clay mt-0.5 size-5 shrink-0"
                  />
                  <div>
                    <dt className="font-display text-lg">{title}</dt>
                    <dd className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                      {body}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "clay" }),
                  "h-12 w-full px-6 text-xs sm:w-auto",
                )}
              >
                Get directions
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link
                href={CONTACT_HREF}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-12 w-full px-4 font-mono text-xs tracking-[0.14em] uppercase sm:w-auto",
                )}
              >
                Ask about transfers
              </Link>
            </div>
          </div>

          {/* min-h rather than an aspect ratio: on lg the map matches the
              height of the column beside it, and below lg it needs a floor
              tall enough to still read as a map. */}
          <div className="border-border shadow-photo relative min-h-[420px] w-full overflow-hidden rounded-3xl border lg:min-h-[560px]">
            <HouseMap />
          </div>
        </div>

        <p className="text-muted-foreground mt-8 font-mono text-xs tracking-[0.05em]">
          {latitude.toFixed(5)}, {longitude.toFixed(5)} · Imsouane, Souss-Massa,
          Morocco
        </p>
      </div>
    </section>
  );
}

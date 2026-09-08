import { BookOpen, Footprints, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { BookButton } from "@/features/booking/components/book-button";
import { cn } from "@/lib/utils/cn";

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
 * Package 02.
 *
 * The ink band. Two 7-night packages back to back would read as one long list
 * on the same cream ground, so this one inverts: the specialist week looks
 * like a different proposition because it is one.
 */
export function MasterclassSection() {
  return (
    <section
      id="the-masterclass"
      className="bg-house-ink text-house-sand px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Content first in the source, so the reading order stays heading →
            copy on narrow screens; the photo takes the right half on lg. */}
        <div className="order-2 lg:order-1">
          <SectionHeading
            tone="dark"
            eyebrow="Package 02 · The Magic Bay Masterclass"
            title="Classic Longboard"
            subtitle="Seven nights on a single fin, for surfers who can already read a green wave."
          />

          <p className="text-house-sand/80 mt-6 text-base leading-relaxed text-pretty">
            Imsouane is a long, patient right — the wave the log was designed
            for. This week is the one that suits it: grace over power, the walk
            to the nose, and the flow that holds a whole ride together.
          </p>

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

          <dl className="mt-10 space-y-7">
            {METHOD.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <Icon
                  aria-hidden
                  className="text-house-sky mt-0.5 size-5 shrink-0"
                />
                <div>
                  <dt className="font-display text-lg">{title}</dt>
                  <dd className="text-house-sand/70 mt-1.5 text-sm leading-relaxed">
                    {body}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <p className="text-house-sand/70 mt-8 text-sm leading-relaxed">
            The week runs on the same rhythm as the Foundation — Sunday to
            Friday, Wednesday off — with yoga built around balance and
            flexibility rather than power, and light anti-inflammatory food for
            the long walks out to the point with a nine-six under your arm.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <BookButton className="h-12 w-full px-6 text-xs sm:w-auto">
              Book the Masterclass
            </BookButton>
            <Link
              href="/#surf-level"
              className={cn(
                buttonVariants({ variant: "shellOutline" }),
                "h-12 w-full px-6 text-xs sm:w-auto",
              )}
            >
              What&apos;s my surf level
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl sm:aspect-3/2 lg:aspect-4/5">
            <Image
              src="/assets/surf_2.jpg"
              alt="A surfer carrying a white single-fin longboard across wet sand lit gold by the low sun."
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Check, ChevronDown, X } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { BookButton } from "@/features/booking/components/book-button";
import { CONTACT_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

/**
 * Both lists are written to be true rather than flattering. The second one
 * is the useful one: every guest it turns away is a refund and a bad review
 * we do not have to deal with, and every guest it does not turn away books
 * with more confidence.
 */
const COME_IF = [
  "You want to get better, not just get wet — a goal for the week, a coach in the water, and the video to prove it.",
  "You are travelling on your own. Most of the house is, and the Sunday dinner takes care of the rest.",
  "You are a couple or a group at different levels. The level groups mean you surf with your peers and eat with each other.",
  "You like a week with a rhythm: early starts, two sessions, yoga, a shared table and an early night.",
  "You can swim two hundred metres in open water and stay calm when a wave holds you under for a few seconds.",
  "You have work to do in the mornings. The Wi-Fi is fast, the terraces are quiet, and the Custom Retreat was built for exactly this.",
];

const THINK_TWICE_IF = [
  "You are after a party town. Imsouane is a fishing village with a handful of cafés, and the nights are early because the mornings are.",
  "You want a resort. The rooms are simple on purpose; the money goes into the coaching and the food.",
  "You are chasing heavy, hollow waves. The bay is a long, slow right and the point is sharper — a progression wave and a longboard wave, not a slab.",
  "You would rather free-surf all day with nobody watching. The Custom Retreat can do that; the two coached weeks cannot.",
  "You are not a confident swimmer. We cannot take you out, and we would rather say so here than on the beach.",
];

/**
 * The questions that arrive by email in the week before a booking, answered
 * once. Anything here that changes on the ground should change here first.
 */
const QUESTIONS = [
  {
    question: "How fit do I need to be?",
    answer:
      "Surfing is mostly paddling, so a normal, active level of fitness is enough. The yoga each morning is there to keep shoulders and lower backs working through the week. If you can swim comfortably and manage a long walk, you can manage the week.",
  },
  {
    question: "Can a partner who does not surf come too?",
    answer:
      "Yes. They stay on the Custom Retreat basis — room, Surf-Fuel breakfasts, yoga, the communal dinners — and can add the dunes, the horses or the souk while you are in the water. Say so when you book and we will put the two stays together.",
  },
  {
    question: "Is there an age limit?",
    answer:
      "The coached weeks are for adults. Teenagers are welcome with a parent on the Custom Retreat, with private coaching arranged around them — write to us first so we can plan the sessions.",
  },
  {
    question: "When is the best time to come?",
    answer:
      "Autumn through spring brings the most consistent swell, and the bay works at almost any size. Summer is smaller and warmer, which suits first waves. Whatever the month, the coaches choose between the two waves each morning, so there is nearly always something to surf.",
  },
  {
    question: "Do I need my own board or wetsuit?",
    answer:
      "No. The quiver is on free rental for every package — shortboards, twin fins and classic logs — and there are wetsuits in the house. Bring your own board if you love it; a board bag is worth the fee for a week on a wave like this.",
  },
  {
    question: "What is not included?",
    answer:
      "Flights, travel insurance and airport transfers. We arrange transfers from Agadir, Essaouira and Marrakech at cost — say your flight times when you book and a driver meets you.",
  },
];

/**
 * Is this trip for me.
 *
 * Cream, after the sand of the levels, and the last section on the page —
 * the place a reader arrives with their reasons not to book. Two lists say
 * plainly who the house is for and who it is not, then the questions that
 * would otherwise become emails. Native disclosure elements for those: no
 * script, keyboard and screen-reader behaviour for free, and the page
 * prints with every answer open.
 */
export function TripFitSection() {
  return (
    <section
      id="is-this-trip-for-me"
      className="border-border bg-background border-t px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow="Coaching · 03"
            title="Is this trip for me"
            subtitle="An honest list, both ways, and the questions everyone asks."
          />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Sand is a fixed ground rather than a themed one, so both cards
              carry their own ink rather than inheriting a foreground that
              would invert with the theme and vanish. */}
          <div className="bg-house-sand text-house-ink shadow-card rounded-3xl p-6 sm:p-8">
            <h3 className="font-display text-2xl">Come if…</h3>
            <ul className="mt-6 space-y-4">
              {COME_IF.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    aria-hidden
                    className="text-house-clay mt-0.5 size-5 shrink-0"
                  />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-house-ink/10 bg-house-shell text-house-ink shadow-card rounded-3xl border p-6 sm:p-8">
            <h3 className="font-display text-2xl">Think twice if…</h3>
            <ul className="mt-6 space-y-4">
              {THINK_TWICE_IF.map((item) => (
                <li key={item} className="flex gap-3">
                  <X
                    aria-hidden
                    className="text-house-dim mt-0.5 size-5 shrink-0"
                  />
                  <span className="text-house-muted text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
              Before you ask
            </p>
            <h3 className="font-display mt-3 text-2xl leading-[1.1] text-balance sm:text-3xl">
              The questions that come up in the week before a booking.
            </h3>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty">
              If yours is not here, it is one message away — a person at the
              house answers every one.
            </p>
          </div>

          <div className="border-border border-t">
            {QUESTIONS.map(({ question, answer }) => (
              <details
                key={question}
                className="group/faq details-reveal border-border border-b"
              >
                <summary
                  className={cn(
                    "flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-4 text-left [&::-webkit-details-marker]:hidden",
                    "transition-colors duration-200 hover:text-house-tide motion-reduce:transition-none",
                    focusRing,
                  )}
                >
                  <span className="font-display text-lg leading-snug">
                    {question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className="text-house-clay size-5 shrink-0 transition-transform duration-200 group-open/faq:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <p className="text-muted-foreground max-w-2xl pb-6 text-base leading-relaxed text-pretty">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <BookButton className="h-12 w-full px-6 text-xs sm:w-auto">
            Book a stay
          </BookButton>
          <Link
            href={CONTACT_HREF}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-12 w-full px-4 font-mono text-xs tracking-[0.14em] uppercase sm:w-auto",
            )}
          >
            Ask us anything
          </Link>
        </div>
      </div>
    </section>
  );
}

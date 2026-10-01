import { CalendarCheck, MailCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { BookStayBackdrop } from "@/features/booking/components/book-stay-backdrop";
import { BookButton } from "@/features/booking/components/book-button";
import { CONTACT_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";

/**
 * What the reader wants to know before pressing a button that opens a
 * payment flow. Each one is a fact about how the engine works, not a claim
 * about the house.
 */
const HOW_IT_WORKS = [
  {
    icon: CalendarCheck,
    title: "Live availability",
    body: "The calendar is the house's own. If a date shows open, it is open — no enquiry, no waiting for a reply.",
  },
  {
    icon: ShieldCheck,
    title: "Secure payment",
    body: "Card payment runs inside Bookinglayer, PCI-compliant; your card details never touch this site.",
  },
  {
    icon: MailCheck,
    title: "Confirmed at once",
    body: "The confirmation lands in your inbox the moment the booking goes through, with everything you need for arrival.",
  },
];

/**
 * The booking section — where every "Book now" on the page lands.
 *
 * Ink, and the finale: it comes after every qualifying section — the level,
 * the reviews, the honest "is this for me" — so the page ends on the ask,
 * with only the contact form after it. The button opens the engine in place — the
 * same dialog every "Book" button on the site opens — rather than sending
 * the reader straight out to the booking engine: the week and the rate plan
 * are chosen here, in the house's own words, and only then is the reader
 * handed over for dates and payment.
 *
 * The house cycles behind it all at a fraction of full strength — the one
 * section on the page that shows the place rather than describing it, kept
 * quiet enough that the copy over it never has to fight for contrast.
 */
export function BookStaySection() {
  return (
    <section
      id="book"
      className="bg-house-ink text-house-sand relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32"
    >
      <BookStayBackdrop />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <SectionHeading
            title="Book a stay"
            subtitle="Choose your week and how you would like to pay. Dates and the room come next, and it is done in a few minutes."
            tone="dark"
          />

          <p className="text-house-sand/85 mt-6 text-base leading-relaxed text-pretty">
            Every package books online, and the button below opens it right
            here. Coming as a group, or after dates you cannot find? Write to
            us and we will put it together by hand.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <BookButton className="h-12 w-full px-6 text-xs sm:w-auto">
              Book a stay
            </BookButton>
            <Link
              href={CONTACT_HREF}
              className={cn(
                buttonVariants({ variant: "shellOutline" }),
                "h-12 w-full px-6 text-xs sm:w-auto",
              )}
            >
              Get in touch
            </Link>
          </div>
        </div>

        <ul className="flex flex-col">
          {HOW_IT_WORKS.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="border-house-sand/20 flex gap-4 border-t py-5"
            >
              <Icon
                aria-hidden
                className="text-house-sky mt-0.5 size-5 shrink-0"
              />
              <div>
                <h3 className="font-display text-lg">{title}</h3>
                <p className="text-house-sand/70 mt-1.5 text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

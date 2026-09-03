import { CalendarCheck, MailCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { BookStayDialog } from "@/features/booking/components/book-stay-dialog";
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
    body: "Card payment runs inside Cloudbeds, PCI-compliant; your card details never touch this site.",
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
 * Ink, after the cream of Imsouane, and the last hard ground before the
 * softer sections that follow. The button opens the engine in place rather
 * than sending the reader off to Cloudbeds' domain, so the house stays around
 * the booking from the first click to the confirmation.
 */
export function BookStaySection() {
  return (
    <section
      id="book"
      className="bg-house-ink text-house-sand px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Book · Imsouane"
            title="Book a stay"
            subtitle="Pick your dates, pick a room, and it is done in a few minutes."
            tone="dark"
          />

          <p className="text-house-sand/85 mt-6 text-base leading-relaxed text-pretty">
            Dates, rooms and prices live in one calendar, and the button below
            opens it right here. Booking a package, a group, or dates you cannot
            find? Write to us and we will put it together by hand.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <BookStayDialog />
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

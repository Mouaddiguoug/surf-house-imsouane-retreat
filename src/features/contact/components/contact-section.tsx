import { CalendarDays, Mail, Phone, Users } from "lucide-react";
import Link from "next/link";

import { InstagramIcon } from "@/components/shared/brand-icons";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/features/contact/components/contact-form";
import { BOOK_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";

const linkClass =
  "text-house-tide rounded-sm underline underline-offset-4 transition-colors duration-200 hover:text-house-ink focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

const { phone, email, instagram } = SITE.contact;

/**
 * The direct lines, for the reader who would rather not fill in a form.
 *
 * Each row is one link and the whole row is the target, 44px tall. The icon
 * is decorative — the visually hidden prefix names the channel for a screen
 * reader, and the visible text is the thing itself: the number, the handle,
 * the address — so there is nothing to translate before dialling.
 */
const CHANNELS = [
  {
    icon: Phone,
    prefix: "Call or WhatsApp",
    label: phone.display,
    href: `tel:${phone.e164}`,
  },
  {
    icon: InstagramIcon,
    prefix: "Instagram",
    label: `@${instagram}`,
    href: `https://www.instagram.com/${instagram}`,
    external: true,
  },
  {
    icon: Mail,
    prefix: "Email",
    label: email,
    href: `mailto:${email}`,
  },
];

/**
 * The two things that decide whether a message is the right move, so
 * nobody writes to ask what the calendar already answers.
 */
const BEFORE_YOU_WRITE = [
  {
    icon: CalendarDays,
    title: "Booking a room",
    body: (
      <>
        Dates and prices live in{" "}
        <Link href={BOOK_HREF} className={linkClass}>
          the calendar
        </Link>
        , and it is quicker than we are.
      </>
    ),
  },
  {
    icon: Users,
    title: "Coming as a group",
    body: "Say how many of you, roughly when, and what you surf like. We put the week together by hand.",
  },
];

/**
 * Get in touch.
 *
 * Sand after the ink of the booking section. The form takes the right column
 * because it is the point; the left column earns its place by putting the
 * direct lines one tap away and heading off the message we would rather not
 * receive — "how much is a room".
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-house-sand text-house-ink px-6 py-24 sm:px-10 sm:py-32"
    >
      {/* Three cells, not two columns: on a phone the form follows the
          heading and the notes come after, on a desktop the form takes the
          right column across both rows and the notes sit under the heading. */}
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16">
        <div>
          <SectionHeading
            eyebrow="Contact · Imsouane"
            title="Get in touch"
            subtitle="Questions, dates that are not on the calendar, or a group — write, and a person at the house answers."
          />

          {/* Ahead of the form in source, so on a phone the number is one
              tap away before any scrolling — most of the people who would
              rather call are reading on one. */}
          <ul className="mt-8 flex flex-col">
            {CHANNELS.map(({ icon: Icon, prefix, label, href, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group/channel -mx-2 flex min-h-11 items-center gap-4 rounded-lg px-2 transition-colors duration-200 hover:text-house-tide focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none"
                >
                  <Icon
                    aria-hidden
                    className="text-house-clay size-5 shrink-0"
                  />
                  <span className="sr-only">{prefix}: </span>
                  <span className="text-base underline-offset-4 group-hover/channel:underline">
                    {label}
                  </span>
                  {external && (
                    <span className="sr-only"> (opens in a new tab)</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm className="lg:col-start-2 lg:row-span-2" />

        <dl className="flex flex-col lg:col-start-1">
          {BEFORE_YOU_WRITE.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="border-house-ink/10 flex gap-4 border-t py-5"
            >
              <Icon
                aria-hidden
                className="text-house-clay mt-0.5 size-5 shrink-0"
              />
              <div>
                <dt className="font-display text-lg">{title}</dt>
                <dd className="text-house-muted mt-1.5 text-sm leading-relaxed">
                  {body}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CONTACT_CHANNELS } from "@/components/shared/contact-channels";
import { BookButton } from "@/features/booking/components/book-button";
import { PLATFORMS } from "@/features/reviews/data/reviews";
import { CONTACT_HREF, LEGAL_LINKS, MENU_COLUMNS } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

const { latitude, longitude } = SITE.coordinates;

/** Google Maps takes a bare "lat,lng" destination and routes from wherever the visitor is. */
const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

const linkClass = cn(
  "text-house-sand/70 -mx-2 inline-flex min-h-11 items-center rounded-lg px-2 text-sm",
  "transition-colors duration-200 hover:text-house-sand motion-reduce:transition-none",
  focusRing,
);

const columnLabelClass =
  "text-house-sky font-mono text-[0.65rem] tracking-[0.18em] uppercase";

/**
 * Site footer.
 *
 * `house-deep` rather than `house-ink`: it is the darkest ground in the
 * palette and the only one below the ink sections, so the page still ends on
 * a step down even on `/house`, which closes on an ink section of its own.
 *
 * Four link columns, the house's own details on the left, and the wordmark
 * oversized along the foot — the one place on the site where the name is
 * allowed to be decoration rather than information, so it is `aria-hidden`
 * and the real name sits in the copyright line under it.
 */
export function Footer() {
  return (
    <footer className="bg-house-deep text-house-sand relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 pt-20 pb-10 sm:px-10 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          {/* The house itself. */}
          <div>
            <Link
              href="/"
              aria-label={`${SITE.name} — home`}
              className={cn("inline-flex rounded-sm", focusRing)}
            >
              <Image
                src="/assets/logo_white.png"
                alt=""
                width={512}
                height={512}
                sizes="72px"
                loading="eager"
                className="h-14 w-auto object-contain object-left"
              />
            </Link>

            <p className="text-house-sand/70 mt-5 max-w-xs text-sm leading-relaxed text-pretty">
              {SITE.tagline}
            </p>

            <ul className="mt-6 flex flex-col">
              {CONTACT_CHANNELS.map(
                ({ icon: Icon, prefix, label, href, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={cn(linkClass, "gap-3 font-mono text-xs")}
                    >
                      <Icon
                        aria-hidden
                        className="text-house-clay size-4 shrink-0"
                      />
                      <span className="sr-only">{prefix}: </span>
                      {label}
                      {external && (
                        <span className="sr-only"> (opens in a new tab)</span>
                      )}
                    </a>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BookButton className="h-12 w-full px-6 text-xs sm:w-auto">
                Book a stay
              </BookButton>
              <Link
                href={CONTACT_HREF}
                className={cn(
                  linkClass,
                  "border-house-sand/25 mx-0 h-12 justify-center rounded-xl border px-5 font-mono text-xs tracking-[0.14em] uppercase",
                  "w-full sm:w-auto",
                )}
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Everywhere the site goes. */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
          >
            {MENU_COLUMNS.map((column) => (
              <div key={column.id}>
                <h2 className={columnLabelClass}>{column.label}</h2>
                <ul className="mt-2 flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.href} className="flex">
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Where the house is, and what people say about it — the two things
            a reader still checks at the very bottom of a page. */}
        <div className="border-house-sand/15 mt-16 grid gap-8 border-t pt-8 sm:grid-cols-2">
          <div>
            <h2 className={columnLabelClass}>Where we are</h2>
            <p className="mt-2 text-sm leading-relaxed">
              {SITE.locality}, {SITE.region}, Morocco
              <span className="text-house-sand/60 block">
                Two hours north of Agadir on the coast road
              </span>
            </p>
            <a
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(linkClass, "gap-2")}
            >
              <MapPin aria-hidden className="text-house-clay size-4 shrink-0" />
              Get directions
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRight aria-hidden className="size-3.5" />
            </a>
          </div>

          <div>
            <h2 className={columnLabelClass}>Guest reviews</h2>
            <ul className="mt-2 flex flex-col">
              {PLATFORMS.map((platform) => (
                <li key={platform.name}>
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(linkClass, "gap-2")}
                  >
                    <span className="text-house-sand font-display">
                      {platform.score}
                    </span>
                    on {platform.name}
                    <span className="text-house-sand/50">
                      ({platform.count})
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The legal row. These four have to be reachable from every page of
            a site that takes card payments, which is why they sit here rather
            than in the menu — and why they are given their own rule instead
            of being folded into the copyright line. */}
        <div className="border-house-sand/15 mt-10 flex flex-col gap-6 border-t pt-6 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Legal">
            <ul className="-mx-2 flex flex-wrap items-center gap-x-4">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(linkClass, "font-mono text-xs")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* The cards the booking engine takes, named rather than drawn:
              the brand marks are trademarks with their own usage rules, and a
              wordmark in the house's own type says the same thing without
              borrowing one. */}
          <div className="flex items-center gap-3">
            <span className="text-house-sand/50 font-mono text-[0.65rem] tracking-[0.18em] uppercase">
              We accept
            </span>
            <ul className="flex flex-wrap items-center gap-2">
              {["Visa", "Mastercard", "Amex"].map((card) => (
                <li
                  key={card}
                  className="border-house-sand/25 text-house-sand/75 rounded-md border px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.12em] uppercase"
                >
                  {card}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-house-sand/15 text-house-sand/60 mt-6 flex flex-col gap-2 border-t pt-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="tracking-[0.05em]">
            {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </p>
        </div>
      </div>

      {/* The wordmark as a floor. The negative margin pulls the font's
          descender space below the footer's edge, so the letters sit on the
          bottom of the page rather than being sliced by it, and the 6%
          opacity keeps it a texture rather than a second logo competing
          with the one above. */}
      <p
        aria-hidden
        className="font-title text-house-sand/[0.06] -mb-[0.1em] w-full px-6 text-center text-[clamp(2.75rem,13vw,10rem)] leading-none font-semibold tracking-tight select-none sm:px-10"
      >
        Imsouane
      </p>
    </footer>
  );
}

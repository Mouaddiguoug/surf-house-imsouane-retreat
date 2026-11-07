import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { contactChannels } from "@/components/shared/contact-channels";
import { BookButton } from "@/features/booking/components/book-button";
import { PLATFORMS } from "@/features/reviews/data/reviews";
import { contactHref, legalLinks, menuColumns } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";
import { localizeHref, type Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils/cn";

const { latitude, longitude } = SITE.coordinates;

/** Google Maps takes a bare "lat,lng" destination and routes from wherever the visitor is. */
const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

const linkClass = cn(
  "text-house-muted -mx-2 inline-flex min-h-11 items-center rounded-lg px-2 text-sm",
  "underline-offset-4 transition-colors duration-200 hover:text-house-ink hover:underline motion-reduce:transition-none",
  focusRing,
);

const columnLabelClass =
  "text-house-ink text-xs font-semibold tracking-[0.16em] uppercase";

/**
 * Site footer.
 *
 * Sand, with a charcoal rule across the top. It used to be the darkest
 * ground on the site; the Terracotta A logo only reads on a light one, and
 * the V1.5 final section is already the page's dark close, so the footer is
 * the quiet floor under it.
 *
 * Four link columns, the house's own details on the left, and the wordmark
 * oversized along the foot — the one place on the site where the name is
 * allowed to be decoration rather than information, so it is `aria-hidden`
 * and the real name sits in the copyright line under it.
 */
const COPY = {
  en: {
    home: "home",
    tagline: "A house in Imsouane by the Atlantic, with surf experiences you can choose.",
    book: "Book a stay",
    contact: "Get in touch",
    footer: "Footer",
    legal: "Legal",
    where: "Where we are",
    road: "Two hours north of Agadir on the coast road",
    directions: "Get directions",
    reviews: "Guest reviews",
    on: "on",
    accept: "We accept",
    rights: "All rights reserved.",
    newTab: "{t.newTab}",
  },
  fr: {
    home: "accueil",
    tagline: "Une maison à Imsouane, au bord de l'Atlantique, avec les expériences surf que tu choisis.",
    book: "Réserver un séjour",
    contact: "Nous écrire",
    footer: "Pied de page",
    legal: "Mentions légales",
    where: "Où nous trouver",
    road: "À deux heures au nord d'Agadir, par la route côtière",
    directions: "Itinéraire",
    reviews: "Avis voyageurs",
    on: "sur",
    accept: "Paiements acceptés",
    rights: "Tous droits réservés.",
    newTab: "(s'ouvre dans un nouvel onglet)",
  },
} as const;

export function Footer({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <footer className="bg-house-sand text-house-ink border-house-ink relative overflow-hidden border-t">
      <div className="page-wrap pt-20 pb-10 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          {/* The house itself. */}
          <div>
            <Link
              href={localizeHref("/", locale)}
              aria-label={`${SITE.name} — ${t.home}`}
              className={cn("inline-flex rounded-sm", focusRing)}
            >
              <Image
                src="/brand/logo-terracotta-a.svg"
                alt=""
                width={748}
                height={539}
                className="h-20 w-auto"
              />
            </Link>

            <p className="text-house-muted mt-5 max-w-xs text-sm leading-relaxed text-pretty">
              {t.tagline}
            </p>

            <ul className="mt-6 flex flex-col">
              {contactChannels(locale).map(
                ({ icon: Icon, prefix, label, href, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={cn(linkClass, "gap-3")}
                    >
                      <Icon
                        aria-hidden
                        className="text-house-ink size-4 shrink-0"
                      />
                      <span className="sr-only">{prefix}: </span>
                      {label}
                      {external && (
                        <span className="sr-only"> {t.newTab}</span>
                      )}
                    </a>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BookButton className="h-12 w-full px-6 text-xs sm:w-auto">
                {t.book}
              </BookButton>
              <Link
                href={contactHref(locale)}
                className={cn(
                  linkClass,
                  "border-house-ink text-house-ink mx-0 h-12 justify-center rounded-xl border px-5 text-xs font-semibold tracking-[0.14em] uppercase hover:no-underline hover:bg-house-ink/5",
                  "w-full sm:w-auto",
                )}
              >
                {t.contact}
              </Link>
            </div>
          </div>

          {/* Everywhere the site goes. */}
          <nav
            aria-label={t.footer}
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
          >
            {menuColumns(locale).map((column) => (
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
        <div className="border-house-ink/20 mt-16 grid gap-8 border-t pt-8 sm:grid-cols-2">
          <div>
            <h2 className={columnLabelClass}>{t.where}</h2>
            <p className="mt-2 text-sm leading-relaxed">
              {SITE.locality}, {SITE.region}, Morocco
              <span className="text-house-muted block">
                {t.road}
              </span>
            </p>
            <a
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(linkClass, "gap-2")}
            >
              <MapPin aria-hidden className="text-house-ink size-4 shrink-0" />
              {t.directions}
              <span className="sr-only"> {t.newTab}</span>
              <ArrowUpRight aria-hidden className="size-3.5" />
            </a>
          </div>

          <div>
            <h2 className={columnLabelClass}>{t.reviews}</h2>
            <ul className="mt-2 flex flex-col">
              {PLATFORMS.map((platform) => (
                <li key={platform.name}>
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(linkClass, "gap-2")}
                  >
                    <span className="text-house-ink font-display">
                      {platform.score}
                    </span>
                    {t.on} {platform.name}
                    <span className="text-house-muted">
                      ({platform.count})
                    </span>
                    <span className="sr-only"> {t.newTab}</span>
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
        <div className="border-house-ink/20 mt-10 flex flex-col gap-6 border-t pt-6 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label={t.legal}>
            <ul className="-mx-2 flex flex-wrap items-center gap-x-4">
              {legalLinks(locale).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(linkClass, "text-xs")}
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
            <span className="text-house-muted text-label font-semibold tracking-[0.16em] uppercase">
              {t.accept}
            </span>
            <ul className="flex flex-wrap items-center gap-2">
              {["Visa", "Mastercard", "Amex"].map((card) => (
                <li
                  key={card}
                  className="border-house-ink/30 text-house-ink rounded-md border px-2.5 py-1 text-label font-semibold tracking-[0.12em] uppercase"
                >
                  {card}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-house-ink/20 text-house-muted mt-6 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {t.rights}
          </p>
          <p className="tracking-[0.05em]">
            {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </p>
        </div>
      </div>

      {/* The wordmark as a floor. The negative margin pulls the font's
          descender space below the footer's edge, so the letters sit on the
          bottom of the page rather than being sliced by it, and the light terracotta
          tint keeps it a texture rather than a second logo competing
          with the one above. */}
      <p
        aria-hidden
        className="font-display text-house-terracotta/15 -mb-[0.1em] w-full px-6 text-center text-[clamp(2.75rem,13vw,10rem)] leading-none font-semibold tracking-tight select-none sm:px-10"
      >
        Imsouane
      </p>
    </footer>
  );
}

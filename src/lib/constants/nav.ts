import { localizeHref, type Locale } from "@/lib/i18n/locale";

/**
 * The site's navigation, in both languages.
 *
 * Paths are written once, unprefixed, and every getter returns them already
 * localized — `/house` for English, `/fr/house` for French — so the header,
 * the menu sheet and the footer cannot drift apart or forget the prefix.
 *
 * Every hash target is written from the root (`/#surf`, not `#surf`) so the
 * same link works from any page: on the home page Next treats it as a scroll,
 * anywhere else as a navigation home that lands on the section.
 */

type Label = Record<Locale, string>;
type NavLink = { href: string; label: Label };

/** The three chapters of the home page, shown in the header bar. */
const CHAPTERS: NavLink[] = [
  { href: "/#imsouane", label: { en: "Imsouane", fr: "Imsouane" } },
  { href: "/#surf", label: { en: "Surf", fr: "Surf" } },
  { href: "/#house", label: { en: "House", fr: "House" } },
];

/**
 * The drawer's own menu: the two stays and the route for guests who have
 * already booked, then the programmes, then the place. Deliberately not the
 * header's list — on desktop the bar already shows the three chapters.
 */
const GROUPS: { id: string; label: Label; links: NavLink[] }[] = [
  {
    id: "stay",
    label: { en: "Stay", fr: "Séjourner" },
    links: [
      {
        href: "/original-stay",
        label: { en: "The Original Stay", fr: "The Original Stay" },
      },
      { href: "/custom-surf", label: { en: "Custom Surf", fr: "Custom Surf" } },
      { href: "/upgrade", label: { en: "Already booked", fr: "Déjà réservé" } },
    ],
  },
  {
    id: "programmes",
    label: { en: "Programmes", fr: "Programmes" },
    links: [
      { href: "/foundation", label: { en: "Foundation", fr: "Foundation" } },
      {
        href: "/golden-lines",
        label: { en: "Golden Lines", fr: "Golden Lines" },
      },
      {
        href: "/coaching",
        label: { en: "How we coach", fr: "Notre méthode" },
      },
    ],
  },
  {
    id: "discover",
    label: { en: "Discover", fr: "Découvrir" },
    links: [
      { href: "/imsouane", label: { en: "Imsouane", fr: "Imsouane" } },
      { href: "/house", label: { en: "The House", fr: "La House" } },
      {
        href: "/#people",
        label: { en: "Guests & FAQ", fr: "Voyageurs & FAQ" },
      },
    ],
  },
];

/**
 * The pages a card network expects to find from any page of a site that
 * takes payments — the reason they live in the footer rather than the menu.
 */
const LEGAL: NavLink[] = [
  {
    href: "/legal/terms",
    label: { en: "Terms & Conditions", fr: "Conditions générales" },
  },
  {
    href: "/legal/refunds",
    label: { en: "Cancellation & Refunds", fr: "Annulation & remboursements" },
  },
  {
    href: "/legal/privacy",
    label: { en: "Privacy Policy", fr: "Confidentialité" },
  },
];

const resolve = (link: NavLink, locale: Locale) => ({
  href: localizeHref(link.href, locale),
  label: link.label[locale],
});

/** The header bar's three chapters. */
export function navLinks(locale: Locale) {
  return CHAPTERS.map((link) => resolve(link, locale));
}

/**
 * The menu, as columns: the chapters followed by the deeper groups. The
 * sheet behind the burger and the footer both render this, so a new page
 * appears in both at once.
 */
export function menuColumns(locale: Locale) {
  return [
    {
      id: "site",
      label: locale === "fr" ? "Chapitres" : "Chapters",
      links: navLinks(locale),
    },
    ...GROUPS.map((group) => ({
      id: group.id,
      label: group.label[locale],
      links: group.links.map((link) => resolve(link, locale)),
    })),
  ];
}

export function legalLinks(locale: Locale) {
  return LEGAL.map((link) => resolve(link, locale));
}

/** The legal paths, unprefixed, for the sitemap. */
export const LEGAL_PATHS = LEGAL.map((link) => link.href);

/** Where every "Get in touch" call to action points: the home page's close. */
export const CONTACT_PATH = "/#contact";

export function contactHref(locale: Locale) {
  return localizeHref(CONTACT_PATH, locale);
}

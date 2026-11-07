/**
 * The languages the site is written in, and how a URL carries them.
 *
 * English is the default and keeps the unprefixed addresses it has always
 * had (`/original-stay`); French lives under `/fr` (`/fr/original-stay`).
 * Internally every page sits under `app/[lang]`, and `src/proxy.ts` serves
 * the unprefixed English URLs from the `en` segment, so a reader never sees
 * `/en` in the address bar.
 *
 * Nothing picks the language for the reader: they get the language of the
 * link they followed, and the switcher in the header moves between the two
 * versions of the same page.
 */
export const LOCALES = ["en", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** How each language names itself, for the switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/** For Open Graph, which wants a region. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_GB",
  fr: "fr_FR",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** The route param as a locale; anything unknown falls back to English. */
export function asLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * An internal link in the reader's language.
 *
 * Only root-relative paths are touched — `/house`, `/#surf`, `/` — so
 * `mailto:`, `tel:`, external URLs and in-page `#anchors` pass through as
 * they are. English paths are returned unchanged.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE || !href.startsWith("/")) return href;
  if (href.startsWith("/fr/") || href === "/fr") return href;
  if (href === "/") return "/fr";
  if (href.startsWith("/#")) return `/fr${href.slice(1)}`;
  return `/fr${href}`;
}

/**
 * The visible path with its language taken off: `/fr/house` → `/house`,
 * `/fr` → `/`, `/house` → `/house`. What the switcher and the metadata
 * build both versions of a page from.
 */
export function stripLocale(pathname: string): string {
  if (pathname === "/fr") return "/";
  if (pathname.startsWith("/fr/")) return pathname.slice(3);
  return pathname;
}

/**
 * `alternates` for a page's metadata: its canonical address in this
 * language, and both language versions for `hreflang`, with `x-default`
 * pointing at English.
 */
export function localeAlternates(path: string, locale: Locale) {
  return {
    canonical: localizeHref(path, locale),
    languages: {
      en: path,
      fr: localizeHref(path, "fr"),
      "x-default": path,
    },
  };
}

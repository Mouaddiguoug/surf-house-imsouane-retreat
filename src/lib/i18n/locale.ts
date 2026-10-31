/**
 * The languages the site is written in.
 *
 * English is the site. French covers the two pages the house has had
 * written in French — The Foundation and The Original Stay — and nothing
 * else yet, so a French page links back to English pages wherever there is
 * no French one to send the reader to.
 */
export type Locale = "en" | "fr";

/** How each language names itself, for the switch between them. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

import { SITE } from "@/lib/constants/site";
import { OG_LOCALES, localizeHref, type Locale } from "@/lib/i18n/locale";

/**
 * A page's Open Graph block. A page's `openGraph` replaces the layout's
 * whole rather than merging into it, so every page passes through here to
 * keep the site name, the type and — the part that matters for French —
 * the locale, with the other language named as an alternate.
 */
export function openGraphFor(path: string, locale: Locale, image: string) {
  return {
    type: "website" as const,
    siteName: SITE.name,
    locale: OG_LOCALES[locale],
    alternateLocale: OG_LOCALES[locale === "fr" ? "en" : "fr"],
    url: localizeHref(path, locale),
    images: [image],
  };
}

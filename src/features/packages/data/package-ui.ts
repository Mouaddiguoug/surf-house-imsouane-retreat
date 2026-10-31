import {
  formatPrice,
  type PackageSummary,
} from "@/features/packages/data/packages";
import type { Locale } from "@/lib/i18n/locale";

/**
 * The words the package components say themselves — the price label, the
 * note under it, the headings at the foot of the page — in each language
 * a package page is written in.
 */
export const PACKAGE_UI = {
  en: {
    from: "From",
    week: "week",
    nights: (count: number) => `${count} nights`,
    otherPackages: "The other packages",
    closingHeading: "Ready when you are",
    closingBody:
      "Live availability, secure payment, and a confirmation in your inbox the moment it goes through.",
    readIn: "Lire en français",
  },
  fr: {
    from: "À partir de",
    week: "semaine",
    nights: (count: number) => `${count} nuits`,
    otherPackages: "Les autres formules",
    closingHeading: "Quand vous voulez",
    closingBody:
      "Disponibilités en direct, paiement sécurisé et confirmation dans votre boîte mail dès la réservation.",
    readIn: "Read in English",
  },
} as const satisfies Record<Locale, unknown>;

/** What the headline price buys: "week", or "3 nights" for a minimum stay. */
export function perLabel(entry: PackageSummary, locale: Locale = "en") {
  const ui = PACKAGE_UI[locale];
  return entry.rates.unit === "week"
    ? ui.week
    : ui.nights(entry.rates.nights);
}

/**
 * The line under the headline price: what the figure is, and that the rest
 * is priced at booking.
 */
export function priceNote(entry: PackageSummary, locale: Locale = "en") {
  const { rates } = entry;

  if (locale === "fr") {
    const stay =
      rates.unit === "stay"
        ? ` pour le séjour minimum de ${rates.nights} nuits`
        : "";
    return `Par personne${stay}, en dortoir partagé. Les chambres privées sont proposées selon la catégorie et l'occupation ; le prix définitif s'affiche pendant la réservation.`;
  }

  const stay =
    rates.unit === "stay"
      ? ` for the minimum ${rates.nights}-night stay`
      : "";
  return `Per person${stay}, in a shared dormitory. Private rooms are priced by category and occupancy, and your final price is shown during booking.`;
}

/** "€590" in English, "590 €" in French. */
export function euros(amount: number, locale: Locale = "en") {
  return locale === "fr" ? `${formatPrice(amount)} €` : `€${formatPrice(amount)}`;
}

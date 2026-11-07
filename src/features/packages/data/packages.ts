/**
 * The four products, as everything outside their own pages sees them.
 *
 * V1.5 splits them in two. The Original Stay and Custom Surf are sold: each
 * has a price and a way into the booking shop. The Foundation and Golden
 * Lines are programmes the house presents but does not sell yet — no price,
 * no booking, and a conversation with the team as the way in. `rates` being
 * present is what marks a product as sold; every component that shows a
 * price or a book button checks for it rather than for a name.
 *
 * Every line is lifted from the house's own copy for that product. Nothing
 * here is a new claim: if a fact is not already promised on the product's
 * page, it is not in this file.
 */

import { localizeHref, type Locale } from "@/lib/i18n/locale";

export type PackageFact = {
  /** "Level", "Format" — mono, uppercase, the quiet half of the pair. */
  term: string;
  detail: string;
};

export type PackageSummary = {
  /** The route segment. */
  slug: string;
  href: string;
  /** "Stay" or "Programme": what kind of thing this is, for the cards. */
  kind: "stay" | "programme";
  /** "The Foundation" — the name the nav and the menus use. */
  name: string;
  /** "Surf, Roots & Reset" — the name the section leads with. */
  title: string;
  subtitle: string;
  /** Two lines at most: the card is a way in, not a summary of the week. */
  summary: string;
  facts: PackageFact[];
  /** The package's photograph, at the head of its card and of its page. */
  image: string;
  imageAlt: string;
  /**
   * Where the hero should hold the frame, as a CSS `object-position`.
   *
   * The hero crops a 3:2 photograph to roughly 2.7:1, so a third of its height
   * goes — and centring the *frame* is not the same as centring the *subject*.
   * Only set this where the middle of the picture is not the point of it.
   */
  imagePosition?: string;
  /** The card's own call to action. */
  cta: string;
  /**
   * What the page's main button says. On a sold product it books; on a
   * programme it opens a conversation with the team.
   */
  bookLabel: string;
  /** The page's one link out, beside the book button. */
  secondary: { href: string; label: string };
  /**
   * What the stay costs, in euros.
   *
   * `from` is the one figure the cards, the hero and the dialog lead with:
   * the shared-dorm bed, because a private room costs more and the engine
   * prices the room once dates are chosen. The weeks are priced per stay,
   * the Original Stay for its shortest stay, which is why the unit travels
   * with the number instead of being assumed.
   *
   * `stay` means the figure covers the whole minimum stay, `nights` long —
   * €45 for three nights, not €45 a night — and every label that prints it
   * says the number of nights, so it is never read as a nightly rate.
   */
  rates?:
    | { unit: "week"; from: number }
    | { unit: "stay"; from: number; nights: number };
};

export const PACKAGES: PackageSummary[] = [
  {
    slug: "original-stay",
    href: "/original-stay",
    kind: "stay",
    name: "The Original Stay",
    title: "The Original Stay",
    subtitle: "Your Home. Your Flow.",
    summary:
      "Accommodation and half-board at the House, with a daily Sunset Tea. Academy activities are optional and billed separately.",
    facts: [
      { term: "Stay", detail: "From three nights" },
      { term: "Arrival", detail: "Flexible" },
      { term: "Meals", detail: "Half board" },
    ],
    image: "/assets/book_a_stay_1.JPG",
    imageAlt:
      "A private room at the house: a made double bed, a painted mural along one wall, and light coming through the curtains from the sea-facing window.",
    cta: "Explore your stay",
    bookLabel: "Request your stay",
    secondary: { href: "/custom-surf", label: "Add surf: Custom Surf" },
    rates: { unit: "stay", from: 45, nights: 3 },
  },
  {
    slug: "custom-surf",
    href: "/custom-surf",
    kind: "stay",
    name: "Custom Surf",
    title: "Custom Surf",
    subtitle: "The Original Stay, with the surf you choose.",
    summary:
      "Start with The Original Stay and add eligible surf activities with Imsouane Surf Academy, at the public activity price.",
    facts: [
      { term: "Base", detail: "The Original Stay" },
      { term: "Surf", detail: "Activities you choose" },
      { term: "Billing", detail: "Activities separately" },
    ],
    image: "/assets/video_analysis.JPG",
    imageAlt:
      "A surfer standing up on a small, wind-textured wave at Imsouane while two others paddle back out behind.",
    cta: "Explore Custom Surf",
    bookLabel: "Request your stay",
    secondary: { href: "/upgrade", label: "Already booked?" },
    rates: { unit: "stay", from: 45, nights: 3 },
  },
  {
    slug: "foundation",
    href: "/foundation",
    kind: "programme",
    name: "Foundation",
    title: "Foundation — Surf, Roots & Reset",
    subtitle: "Catch waves. Understand why. Keep growing.",
    summary:
      "A seven-night programme for beginner and intermediate surfers, in separate level groups. Details and opening are subject to confirmation.",
    facts: [
      { term: "Level", detail: "Beginner & Intermediate" },
      { term: "Format", detail: "7 nights, half board" },
      { term: "Status", detail: "Opening to be confirmed" },
    ],
    image: "/assets/surf_1.jpg",
    imageAlt:
      "A surfer trimming down the face of a clean right-hander at Imsouane while the rest of the group waits in the lineup.",
    // The surfer rides high in this frame: centred, the crop leaves him up
    // against the top edge. A third of the way down puts him mid-band.
    imagePosition: "50% 33%",
    cta: "Explore the programme",
    bookLabel: "Ask about Foundation",
    secondary: { href: "/coaching", label: "How we coach" },
  },
  {
    slug: "golden-lines",
    href: "/golden-lines",
    kind: "programme",
    name: "Golden Lines",
    title: "Golden Lines",
    subtitle: "A longboard programme on a long, patient right.",
    summary:
      "The longboard concept: grace over power, and the walk to the nose. Details and editions are subject to confirmation.",
    facts: [
      { term: "Discipline", detail: "Longboard" },
      { term: "For", detail: "Surfers who read a green wave" },
      { term: "Status", detail: "Editions to be confirmed" },
    ],
    image: "/assets/surf_2.jpg",
    imageAlt:
      "A surfer carrying a white single-fin longboard across wet sand lit gold by the low sun.",
    cta: "Explore Golden Lines",
    bookLabel: "Ask about Golden Lines",
    secondary: { href: "/#surf", label: "Back to the Academy" },
  },
];

type PackageCopy = Pick<
  PackageSummary,
  | "href"
  | "title"
  | "subtitle"
  | "summary"
  | "facts"
  | "imageAlt"
  | "cta"
  | "bookLabel"
  | "secondary"
>;

/**
 * The cards and heroes in French, in "tu" like the rest of the French site.
 * Links are not written here: `localizedPackages` points every one at the
 * French page. Where the house's French copy keeps an English line — "Your
 * Home. Your Flow." — so does this.
 */
const FRENCH: Record<string, Partial<PackageCopy>> = {
  "original-stay": {
    summary:
      "L'hébergement et la demi-pension à la House, avec le Sunset Tea quotidien. Les activités Academy sont facultatives et facturées séparément.",
    facts: [
      { term: "Séjour", detail: "À partir de trois nuits" },
      { term: "Arrivée", detail: "Flexible" },
      { term: "Repas", detail: "Demi-pension" },
    ],
    imageAlt:
      "Une chambre privée de la maison : un grand lit fait, une fresque peinte sur un mur et la lumière qui filtre par les rideaux de la fenêtre côté mer.",
    cta: "Découvrir le séjour",
    bookLabel: "Demander mon séjour",
    secondary: { href: "/custom-surf", label: "Ajouter du surf : Custom Surf" },
  },
  "custom-surf": {
    subtitle: "The Original Stay, avec le surf que tu choisis.",
    summary:
      "Pars de The Original Stay et ajoute les activités surf éligibles d'Imsouane Surf Academy, au tarif public de l'activité.",
    facts: [
      { term: "Base", detail: "The Original Stay" },
      { term: "Surf", detail: "Les activités choisies" },
      { term: "Facturation", detail: "Activités à part" },
    ],
    imageAlt:
      "Un surfeur debout sur une petite vague ridée par le vent à Imsouane, deux autres repartant à la rame derrière lui.",
    cta: "Découvrir Custom Surf",
    bookLabel: "Demander mon séjour",
    secondary: { href: "/upgrade", label: "Déjà réservé ?" },
  },
  foundation: {
    subtitle: "Prends des vagues. Comprends pourquoi. Continue à progresser.",
    summary:
      "Un programme de sept nuits pour surfeurs débutants et intermédiaires, en groupes de niveau. Les modalités et l'ouverture restent à confirmer.",
    facts: [
      { term: "Niveau", detail: "Débutants & intermédiaires" },
      { term: "Format", detail: "7 nuits, demi-pension" },
      { term: "Statut", detail: "Ouverture à confirmer" },
    ],
    imageAlt:
      "Un surfeur descend la face d'une droite propre à Imsouane pendant que le reste du groupe attend au line-up.",
    cta: "Découvrir le programme",
    bookLabel: "Parler de Foundation",
    secondary: { href: "/coaching", label: "Notre méthode" },
  },
  "golden-lines": {
    subtitle: "Un programme longboard sur une droite longue et patiente.",
    summary:
      "Le concept longboard : la grâce plutôt que la puissance, et la marche jusqu'au nose. Les modalités et les éditions restent à confirmer.",
    facts: [
      { term: "Discipline", detail: "Longboard" },
      { term: "Pour", detail: "Qui lit déjà une vague verte" },
      { term: "Statut", detail: "Éditions à confirmer" },
    ],
    imageAlt:
      "Un surfeur porte un longboard blanc à simple dérive sur le sable mouillé, doré par le soleil bas.",
    cta: "Découvrir Golden Lines",
    bookLabel: "Parler de Golden Lines",
    secondary: { href: "/#surf", label: "Retour à l'Academy" },
  },
};

/**
 * The four products, in the reader's language: the French copy laid over
 * the English, and every link pointed at the same page in that language.
 */
export function localizedPackages(locale: Locale = "en"): PackageSummary[] {
  if (locale === "en") return PACKAGES;
  return PACKAGES.map((entry) => {
    const merged = { ...entry, ...FRENCH[entry.slug] };
    return {
      ...merged,
      href: localizeHref(merged.href, locale),
      secondary: {
        ...merged.secondary,
        href: localizeHref(merged.secondary.href, locale),
      },
    };
  });
}

/**
 * One package by its route segment.
 *
 * Throws rather than returning `undefined`: every caller is a page that is
 * prerendered at build time, so a slug that does not exist should stop the
 * build with its own name in the message, not render a page without a hero.
 */
export function packageBySlug(
  slug: string,
  locale: Locale = "en",
): PackageSummary {
  const found = localizedPackages(locale).find((entry) => entry.slug === slug);
  if (!found) throw new Error(`Unknown package slug: ${slug}`);
  return found;
}

/** The others, for the foot of a product's own page. */
export function otherPackages(slug: string, locale: Locale = "en") {
  return localizedPackages(locale).filter((entry) => entry.slug !== slug);
}

/**
 * A euro amount as the booking engine quotes it.
 *
 * Some rates land on whole euros and some carry centimes, and neither should
 * be dressed as the other: 540 reads as "€540", while 435.6 has to reach the
 * page as "€435.60" rather than the "€435.6" a plain number would print.
 */
export function formatPrice(amount: number): string {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
}

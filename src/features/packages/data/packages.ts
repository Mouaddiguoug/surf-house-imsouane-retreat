/**
 * The three packages, as everything outside their own sections sees them.
 *
 * Each package owns a page now, and the home page shows the three as cards
 * instead of running all three sections end to end. Both of those need the
 * same handful of facts — the number, the name, the one-line pitch, the shape
 * of the stay — so they live here rather than being read back out of the
 * sections, which are long-form and built to be read rather than summarised.
 *
 * Every line is lifted from the section it belongs to. Nothing here is a new
 * claim about what a week includes: if a fact is not already promised further
 * down the page it is not in this file.
 */

import type { Locale } from "@/lib/i18n/locale";

export type PackageFact = {
  /** "Level", "Format" — mono, uppercase, the quiet half of the pair. */
  term: string;
  detail: string;
};

export type PackageSummary = {
  /** The route segment. */
  slug: string;
  href: string;
  /** "01". The card's anchor, and how the sections already number themselves. */
  index: string;
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
  /** The card's own call to action. Only two of the three are weeks. */
  cta: string;
  /** What the book button says on this package's page. */
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
  rates:
    | { unit: "week"; from: number }
    | { unit: "stay"; from: number; nights: number };
};

export const PACKAGES: PackageSummary[] = [
  {
    slug: "the-foundation",
    href: "/packages/the-foundation",
    index: "01",
    name: "The Foundation",
    title: "Surf, Roots & Reset",
    subtitle: "Catch waves. Understand why. Keep growing.",
    summary:
      "Seven nights of structured coaching in your own level group, with yoga, surfskate and half board at the house.",
    facts: [
      { term: "Level", detail: "Beginner & Intermediate" },
      { term: "Format", detail: "7 nights, half board" },
      { term: "Arrival", detail: "Saturday or Sunday" },
    ],
    image: "/assets/surf_1.jpg",
    imageAlt:
      "A surfer trimming down the face of a clean right-hander at Imsouane while the rest of the group waits in the lineup.",
    // The surfer rides high in this frame: centred, the crop leaves him up
    // against the top edge. A third of the way down puts him mid-band.
    imagePosition: "50% 33%",
    cta: "See the week",
    bookLabel: "View dates & availability",
    secondary: { href: "/coaching", label: "How we coach" },
    rates: { unit: "week", from: 590 },
  },
  {
    slug: "the-masterclass",
    href: "/packages/the-masterclass",
    index: "02",
    name: "The Masterclass",
    title: "Classic Longboard",
    subtitle: "Seven nights on a single fin.",
    summary:
      "Imsouane is the long, patient right the log was designed for. Grace over power, and the walk to the nose.",
    facts: [
      { term: "Level", detail: "Reads a green wave" },
      { term: "Format", detail: "7 nights, single fin" },
      { term: "Rhythm", detail: "Sunday to Friday" },
    ],
    image: "/assets/surf_2.jpg",
    imageAlt:
      "A surfer carrying a white single-fin longboard across wet sand lit gold by the low sun.",
    cta: "See the week",
    bookLabel: "Book the Masterclass",
    secondary: { href: "/#surf-level", label: "What's my surf level" },
    rates: {
      unit: "week",
      from: 469.8,
    },
  },
  {
    slug: "the-original-stay",
    href: "/packages/the-original-stay",
    index: "03",
    name: "The Original Stay",
    title: "Your Home. Your Flow.",
    subtitle: "Come for the waves. Stay for the feeling.",
    summary:
      "Your room, breakfast and dinner, and a daily Sunset Tea. No compulsory surf lessons, no fixed schedule.",
    facts: [
      { term: "Stay", detail: "From three nights" },
      { term: "Arrival", detail: "Flexible" },
      { term: "Meals", detail: "Half board" },
    ],
    image: "/assets/surf_3.jpg",
    imageAlt:
      "A surfer waiting out the back on a longboard in glassy water, looking back over one shoulder, the village stacked along the cliff behind in the last of the light.",
    cta: "Explore the stay",
    bookLabel: "Request your stay",
    secondary: { href: "/house#the-rooms", label: "Explore our rooms" },
    rates: {
      unit: "stay",
      from: 45,
      nights: 3,
    },
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
 * The cards and heroes in French. The Foundation and The Original Stay have
 * their own French pages, so their cards point there; the Masterclass has
 * none yet, so its card is translated but still opens the English page.
 * Where the house's French copy keeps an English line — "Your Home. Your
 * Flow." — so does this.
 */
const FRENCH: Record<string, Partial<PackageCopy>> = {
  "the-foundation": {
    href: "/fr/packages/the-foundation",
    subtitle: "Prenez des vagues. Comprenez pourquoi. Continuez à progresser.",
    summary:
      "Sept nuits de surf encadré dans un groupe adapté à votre niveau, avec yoga, surfskate et demi-pension à la maison.",
    facts: [
      { term: "Niveau", detail: "Débutants & intermédiaires" },
      { term: "Format", detail: "7 nuits, demi-pension" },
      { term: "Arrivée", detail: "Samedi ou dimanche" },
    ],
    imageAlt:
      "Un surfeur descend la face d'une droite propre à Imsouane pendant que le reste du groupe attend au line-up.",
    cta: "Voir la semaine",
    bookLabel: "Voir les dates et disponibilités",
    secondary: { href: "/coaching", label: "Notre méthode" },
  },
  "the-masterclass": {
    subtitle: "Sept nuits sur une simple dérive.",
    summary:
      "Imsouane est la droite longue et patiente pour laquelle le longboard a été dessiné. La grâce plutôt que la puissance, et la marche jusqu'au nose.",
    facts: [
      { term: "Niveau", detail: "Lit déjà une vague verte" },
      { term: "Format", detail: "7 nuits, simple dérive" },
      { term: "Rythme", detail: "Du dimanche au vendredi" },
    ],
    imageAlt:
      "Un surfeur porte un longboard blanc à simple dérive sur le sable mouillé, doré par le soleil bas.",
    cta: "Voir la semaine",
  },
  "the-original-stay": {
    href: "/fr/packages/the-original-stay",
    summary:
      "Votre chambre, le petit-déjeuner et le dîner, et notre Sunset Tea quotidien. Pas de surf camp obligatoire, pas de programme imposé.",
    facts: [
      { term: "Séjour", detail: "À partir de trois nuits" },
      { term: "Arrivée", detail: "Flexible" },
      { term: "Repas", detail: "Demi-pension" },
    ],
    imageAlt:
      "Un surfeur attend au large sur un longboard, dans une eau lisse, regardant par-dessus son épaule, le village accroché à la falaise derrière lui dans la dernière lumière.",
    cta: "Découvrir le séjour",
    bookLabel: "Demander mon séjour",
    secondary: { href: "/house#the-rooms", label: "Découvrir les hébergements" },
  },
};

/** The three packages, in the reader's language. */
export function localizedPackages(locale: Locale = "en"): PackageSummary[] {
  if (locale === "en") return PACKAGES;
  return PACKAGES.map((entry) => ({ ...entry, ...FRENCH[entry.slug] }));
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

/** The other two, for the foot of a package's own page. */
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

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
  /**
   * The specialist week inverts to ink, the way its own section always has —
   * it is a different proposition and it should not look like the other two.
   */
  invert?: boolean;
  /** The card's own call to action. Only two of the three are weeks. */
  cta: string;
  /** What the book button says on this package's page. */
  bookLabel: string;
  /** The page's one link out, beside the book button. */
  secondary: { href: string; label: string };
};

export const PACKAGES: PackageSummary[] = [
  {
    slug: "the-foundation",
    href: "/packages/the-foundation",
    index: "01",
    name: "The Foundation",
    title: "Surf, Roots & Reset",
    subtitle: "An academy week for beginners and improvers.",
    summary:
      "Five coached days on the ISA method that change how you read the ocean, held up by the village around you.",
    facts: [
      { term: "Level", detail: "Beginner & improver" },
      { term: "Format", detail: "7 nights, fixed dates" },
      { term: "Arrival", detail: "Saturday or Sunday" },
    ],
    image: "/assets/surf_1.jpg",
    imageAlt:
      "A surfer trimming down the face of a clean right-hander at Imsouane while the rest of the group waits in the lineup.",
    // The surfer rides high in this frame: centred, the crop leaves him up
    // against the top edge. A third of the way down puts him mid-band.
    imagePosition: "50% 33%",
    cta: "See the week",
    bookLabel: "Book the Foundation",
    secondary: { href: "/coaching", label: "How we coach" },
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
    invert: true,
    cta: "See the week",
    bookLabel: "Book the Masterclass",
    secondary: { href: "/#surf-level", label: "What's my surf level" },
  },
  {
    slug: "the-custom-retreat",
    href: "/packages/the-custom-retreat",
    index: "03",
    name: "The Custom Retreat",
    /*
     * The one package whose name is not also a title. Its section led with
     * "The Custom Retreat" over "Bed, breakfast & board — then build the rest
     * yourself", which left the card saying the name twice and the page
     * saying it again under the hero. The subtitle had a title in it all
     * along; this splits it in two and the section now leads with the same
     * pair.
     */
    title: "Bed, breakfast & board",
    subtitle: "Then build the rest yourself.",
    summary:
      "Your stay, your rules. The house and the quiver, without the timetable.",
    facts: [
      { term: "Stay", detail: "From two nights" },
      { term: "Arrival", detail: "Any day" },
      { term: "Included", detail: "Bed, breakfast & board" },
    ],
    image: "/assets/surf_3.jpg",
    imageAlt:
      "A surfer waiting out the back on a longboard in glassy water, looking back over one shoulder, the village stacked along the cliff behind in the last of the light.",
    cta: "See what you can build",
    bookLabel: "Build your stay",
    secondary: { href: "/#is-this-trip-for-me", label: "Is this trip for me" },
  },
];

/**
 * One package by its route segment.
 *
 * Throws rather than returning `undefined`: every caller is a page that is
 * prerendered at build time, so a slug that does not exist should stop the
 * build with its own name in the message, not render a page without a hero.
 */
export function packageBySlug(slug: string): PackageSummary {
  const found = PACKAGES.find((entry) => entry.slug === slug);
  if (!found) throw new Error(`Unknown package slug: ${slug}`);
  return found;
}

/** The other two, for the foot of a package's own page. */
export function otherPackages(slug: string) {
  return PACKAGES.filter((entry) => entry.slug !== slug);
}

/**
 * Primary navigation.
 *
 * The three labels are the three words of the house's name, in order, so the
 * nav reads as the wordmark. Kept here rather than inline in the navbar so the
 * mobile drawer, the desktop bar and the footer all stay in step.
 *
 * They are hash targets while the site is a single page; swapping them for
 * real routes later is a one-line change here.
 */
export const NAV_LINKS = [
  { href: "#surf", label: "Surf" },
  { href: "#house", label: "House" },
  { href: "#imsouane", label: "Imsouane" },
] as const;

/**
 * The drawer's own menu.
 *
 * Deliberately not the same list as `NAV_LINKS`. On desktop the bar already
 * shows those three, so repeating them behind the burger would make the drawer
 * a duplicate rather than a way in to the deeper pages. The drawer shows these
 * groups on every screen and adds the primary three only below `md`, where the
 * bar has hidden them.
 */
export const MENU_GROUPS = [
  {
    id: "packages",
    label: "Packages",
    links: [
      { href: "#the-foundation", label: "The Foundation" },
      { href: "#the-masterclass", label: "The Masterclass" },
      { href: "#the-custom", label: "The Custom Retreat" },
    ],
  },
  {
    id: "house",
    label: "The house",
    links: [
      { href: "#house", label: "The Rooftop" },
      { href: "#rooms", label: "The Rooms" },
      { href: "#living", label: "The Living Room" },
    ],
  },
  {
    id: "house",
    label: "The house",
    links: [
      { href: "#house", label: "The Rooftop" },
      { href: "#the-rooms", label: "The Rooms" },
      { href: "#the-living-space", label: "The Living Space" },
    ],
  },
  {
    id: "coaching",
    label: "Coaching",
    links: [
      { href: "#how-we-coach", label: "How We Coach" },
      { href: "#surf-level", label: "What's My Surf Level" },
      { href: "#is-this-trip-for-me", label: "Is This Trip For Me" },
    ],
  },
] as const;

/** Where every "Book now" call to action points. */
export const BOOK_HREF = "#book";

/** Where every "Get in touch" call to action points. */
export const CONTACT_HREF = "#contact";

/**
 * Primary navigation.
 *
 * The three labels are the three words of the house's name, in order, so the
 * nav reads as the wordmark. Kept here rather than inline in the navbar so the
 * mobile drawer, the desktop bar and the footer all stay in step.
 *
 * Every hash target is written from the root (`/#surf`, not `#surf`) so the
 * same link works from any page: on the home page Next treats it as a scroll,
 * anywhere else as a navigation home that lands on the section.
 */
export const NAV_LINKS = [
  { href: "/#surf", label: "Surf" },
  { href: "/house", label: "House" },
  { href: "/imsouane", label: "Imsouane" },
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
      { href: "/#the-foundation", label: "The Foundation" },
      { href: "/#the-masterclass", label: "The Masterclass" },
      { href: "/#the-custom", label: "The Custom Retreat" },
    ],
  },
  {
    id: "house",
    label: "The house",
    links: [
      { href: "/house", label: "The Rooftop" },
      { href: "/house#the-rooms", label: "The Rooms" },
      { href: "/house#the-living-space", label: "The Living Space" },
    ],
  },
  {
    id: "coaching",
    label: "Coaching",
    links: [
      { href: "/coaching", label: "How We Coach" },
      { href: "/#surf-level", label: "What's My Surf Level" },
      { href: "/#is-this-trip-for-me", label: "Is This Trip For Me" },
    ],
  },
] as const;

/**
 * The menu, as columns: the three primary destinations followed by the
 * deeper groups. The sheet behind the burger and the footer both render
 * this, so a new page appears in both at once and neither can drift.
 */
export const MENU_COLUMNS = [
  { id: "site", label: "The site", links: NAV_LINKS },
  ...MENU_GROUPS,
];

/**
 * The booking section, for inline text links ("dates live in the calendar").
 * Buttons do not use it: every "Book" button is a `BookButton`, which opens
 * the booking dialog in place instead of scrolling to the section.
 */
export const BOOK_HREF = "/#book";

/** Where every "Get in touch" call to action points. */
export const CONTACT_HREF = "/#contact";

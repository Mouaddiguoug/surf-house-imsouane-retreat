/**
 * Bookinglayer, the booking engine the house sells through.
 *
 * Unlike the widget this replaced, nothing of Bookinglayer's runs on this
 * site: the reader picks a package here, and we hand them to Bookinglayer
 * with that choice already made. That keeps the part a guest has to
 * understand — what am I buying — on the house's own pages, in the house's
 * own words, and leaves dates,
 * availability and the card to the engine that owns them.
 *
 * `SHOP_URL` is the only thing that has to be filled in for the flow to
 * work, and it is deliberately `null` until someone pastes the real one: a
 * booking button that goes nowhere is worse than one that says it is not
 * ready yet, and a payment provider reviewing this site will click it.
 */
export const BOOKINGLAYER = {
  /**
   * The shop's own origin — `https://<shop>.bookinglayer.io`, or the custom
   * domain if one is set up. No trailing slash.
   */
  shopUrl: "https://imsouane-surf-house.bookinglayer.com/en" as string | null,

  /**
   * The path each package opens, appended to `shopUrl`.
   *
   * One product per package. There used to be two — a non-refundable and a
   * semi-flexible rate — and the site made the reader choose between them
   * before handing over; the shop dropped the split, so the choice went too.
   * Leave a value `null` and that package falls back to the shop's front
   * page, which still works — it just makes the guest pick the package
   * again. All three are `null` until the shop's new product links are in.
   */
  paths: {
    "original-stay": null as string | null,
    "custom-surf": null as string | null,
  },
} as const;

/** True when the shop URL has not been set, so the dialog can say so. */
export function isBookingReady(): boolean {
  return Boolean(BOOKINGLAYER.shopUrl);
}

/**
 * Where a given package should send the reader.
 *
 * Falls back to the shop's front page when the package has no deep link
 * yet, and returns `null` when there is no shop at all — the caller reads
 * that as "not ready" rather than rendering a dead link.
 */
export function bookingUrl(slug: string): string | null {
  const { shopUrl, paths } = BOOKINGLAYER;
  if (!shopUrl) return null;
  const path = paths[slug as keyof typeof paths] ?? null;
  return path ? `${shopUrl}${path}` : shopUrl;
}

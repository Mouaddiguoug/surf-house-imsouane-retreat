/**
 * Bookinglayer, the booking engine the house sells through.
 *
 * Unlike the widget this replaced, nothing of Bookinglayer's runs on this
 * site: the reader picks a package and a rate plan here, and we hand them to
 * Bookinglayer with that choice already made. That keeps the part a guest
 * has to understand — what am I buying, and what happens if I cancel — on
 * the house's own pages, in the house's own words, and leaves dates,
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
   * The path each package's rate plan opens, appended to `shopUrl`.
   *
   * Bookinglayer gives every package and every rate plan an id; the deep
   * link is what the engine shows when you open a package from the shop's
   * own listing. Leave a value `null` and that option falls back to the
   * shop's front page, which still works — it just makes the guest pick the
   * package again.
   */
  paths: {
    "the-foundation": {
      "non-refundable":
        "/product/surf-roots-and-reset-best-rate-non-refundable" as
          string | null,
      "semi-flexible": "/product/surf-roots-and-reset-semi-flexible" as
        string | null,
    },
    "the-masterclass": {
      "non-refundable":
        "/product/classic-longboard-best-rate-non-refundable-1" as
          string | null,
      "semi-flexible": "/product/classic-longboard-semi-flexible" as
        string | null,
    },
    "the-custom-retreat": {
      "non-refundable": "/product/the-custom-retreat-best-rate-save-13-1" as
        string | null,
      "semi-flexible": "/product/the-custom-retreat-semi-flexible-1" as
        string | null,
    },
  },
} as const;

export type RatePlanId = "non-refundable" | "semi-flexible";

/** True when the shop URL has not been set, so the dialog can say so. */
export function isBookingReady(): boolean {
  return Boolean(BOOKINGLAYER.shopUrl);
}

/**
 * Where a given package and rate plan should send the reader.
 *
 * Falls back to the shop's front page when that pairing has no deep link
 * yet, and returns `null` when there is no shop at all — the dialog reads
 * that as "not ready" rather than rendering a dead link.
 */
export function bookingUrl(slug: string, plan: RatePlanId): string | null {
  const { shopUrl, paths } = BOOKINGLAYER;
  if (!shopUrl) return null;
  const path = paths[slug as keyof typeof paths]?.[plan] ?? null;
  return path ? `${shopUrl}${path}` : shopUrl;
}

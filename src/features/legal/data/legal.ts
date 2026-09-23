/**
 * The facts the legal pages are built from.
 *
 * Everything here is a commitment to a customer and, for the commercial
 * terms, a commitment Stripe checks against the booking engine: the
 * cancellation policy shown on the site has to match the policy attached to
 * the Cloudbeds rate plans, word for word. The terms below are transcribed
 * from the house's own rate-plan document rather than invented; what only the
 * house can supply is still `null`, and the pages render a visible marker
 * where one is missing. A wrong number here is worse than an obvious gap —
 * the gap gets filled, the wrong number gets honoured.
 */
export type Pending = null;

/**
 * The two rate plans the booking engine sells, and the terms attached to
 * each. Their names and conditions must match the Cloudbeds policies
 * (`Non-Refundable`, `Semi-Flexible`) exactly.
 */
export const RATE_PLANS = [
  {
    id: "non-refundable",
    name: "Non-refundable",
    tagline: "The lowest rate we publish. Paid in full at booking, and final.",
    payment:
      "The full price of the stay is charged to your card at the moment you book.",
    cancellation:
      "The booking cannot be cancelled, modified or refunded, whatever the reason.",
    noShow: "The full amount is retained.",
    /** Only the seven-night packages carry the goodwill date change. */
    change:
      "On a seven-night package, dates may be moved once at no charge if you ask more than 30 days before arrival and we have room on the week you want.",
  },
  {
    id: "semi-flexible",
    name: "Semi-flexible",
    tagline: "A deposit now, the balance when you arrive.",
    payment:
      "A 30% deposit is charged at booking. The remaining 70% is due at check-in, payable by card, in euros or in dirhams.",
    cancellation: null,
    noShow: "The full amount of the booking is charged.",
    change: null,
    /** The window differs by what was booked, so it is stated per product. */
    windows: [
      {
        applies: "Seven-night packages",
        free: "Cancel more than 30 days before arrival and your deposit is refunded in full, or held as a credit valid for one year — your choice.",
        late: "Cancel 30 days or less before arrival and the deposit is retained, against the coach, the room and the kitchen already committed to your week.",
      },
      {
        applies: "The Custom Retreat, and any bed-and-breakfast stay",
        free: "Cancel more than 10 days before arrival and your deposit is refunded in full.",
        late: "Cancel 10 days or less before arrival and the deposit is retained.",
      },
    ],
  },
] as const;

export const LEGAL = {
  /**
   * The entity Stripe knows. For a Stripe Atlas company this is the US
   * corporation, not the Moroccan operation, and the name must match the
   * Stripe account exactly — including any Inc. or LLC suffix.
   *
   * Only the name is held here now. The registration number, registered
   * office and publisher were carried by the Legal Notice, which has been
   * removed; nothing else on the site asks for them.
   */
  entity: {
    name: "Imsouane Surf House" as string | Pending,
  },

  /**
   * How long a released refund takes to reach a statement. Stripe's own
   * figure, and the one the house's compliance note proposes.
   */
  refundTime: "5 to 10 business days" as string | Pending,

  /**
   * The currency the booking engine charges in.
   *
   * The rate-plan document prices every package and every night in euros,
   * and that is what this site states. The live Cloudbeds engine was last
   * seen quoting MAD — the two must agree before a Stripe review, or the
   * site is advertising a currency the customer is not charged in.
   */
  currency: "EUR",

  /** When the support inbox is read, for the contact page and the footer. */
  supportHours: "24/7" as string | Pending,

  /** Last substantive review of these pages. */
  updated: "2026-09-23",
} as const;

/** True when every value a page needs has been supplied. */
export function isPending(value: string | Pending): value is Pending {
  return value === null;
}

import type { Metadata } from "next";
import Link from "next/link";

import {
  Fact,
  LegalPage,
  ToConfirm,
} from "@/features/legal/components/legal-page";
import { LEGAL, RATE_PLANS, isPending } from "@/features/legal/data/legal";
import { CONTACT_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description:
    "How cancellations, refunds and changes of date work at Imsouane Surf House, including surf conditions, force majeure and how long a refund takes to reach your card.",
  alternates: { canonical: "/legal/refunds" },
  openGraph: { url: "/legal/refunds" },
};

export default function RefundsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cancellation & Refund Policy"
      summary="What happens if your plans change, if ours do, or if the ocean has other ideas."
    >
      <h2>The two rate plans</h2>
      <p>
        Every stay is sold on one of two rate plans, and the one you chose is
        named on your confirmation. They differ in what you pay up front and in
        what happens if you cancel — the cheaper rate is cheaper precisely
        because it is final.
      </p>

      {RATE_PLANS.map((plan) => (
        <section key={plan.id}>
          <h3>{plan.name}</h3>
          <p>{plan.tagline}</p>
          <ul>
            <li>
              <strong>Payment.</strong> {plan.payment}
            </li>
            {plan.cancellation && (
              <li>
                <strong>Cancellation.</strong> {plan.cancellation}
              </li>
            )}
            {"windows" in plan &&
              plan.windows.map((window) => (
                <li key={window.applies}>
                  <strong>{window.applies}.</strong> {window.free} {window.late}
                </li>
              ))}
            <li>
              <strong>No-show.</strong> {plan.noShow}
            </li>
            {plan.change && (
              <li>
                <strong>Changing dates.</strong> {plan.change}
              </li>
            )}
          </ul>
        </section>
      ))}

      <p>
        To cancel or change a booking, reply to your confirmation email or write
        to us at{" "}
        <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>. We
        confirm every cancellation in writing; if you have not had that
        confirmation, the booking has not been cancelled.
      </p>

      <h2>How a refund is paid</h2>
      <p>
        Refunds go back to the card used for the booking. We do not refund to a
        different card, to a bank account, or in cash. Once we release a refund
        it usually reaches your statement in{" "}
        <Fact
          value={LEGAL.refundTime}
          describe="the refund processing time quoted by the payment provider"
        />
        , though the final step belongs to your bank rather than to us.
      </p>
      <p>
        All amounts are charged and refunded in {LEGAL.currency}. If your card
        is held in another currency, your bank sets the exchange rate on both
        the charge and the refund, and the two rates may differ — that
        difference is your bank&rsquo;s, not a deduction by us.
      </p>

      <h2>Surf conditions</h2>
      <p>
        We sell a week at a surf house, not a guaranteed wave. Imsouane is a
        reliable right-hand point, but conditions change: a flat spell, a storm
        swell, or an onshore wind can make a session unsafe or pointless.
      </p>
      <p>
        When that happens the session is not cancelled, it is moved: surf skate
        on land, video and theory, a different spot along the coast if one is
        working, or a session shifted to another day of the week. A week
        affected by conditions is not refundable on those grounds, because the
        coaching, the board, the room and the board still arrive as promised.
      </p>

      <h2>If we cancel</h2>
      <p>
        If we cancel a booking for any reason within our control — overbooking,
        a closure, a coach we cannot replace — you are refunded in full,
        including any deposit, with no deduction.
      </p>

      <h2>Force majeure</h2>
      <p>
        Neither of us is liable for failing to perform where the cause is
        outside reasonable control: government restrictions, border or airport
        closures, natural disaster, civil unrest, or an interruption of water or
        power at the house. Where that prevents a stay, we will offer a credit
        for a future stay or a refund of amounts paid, less any costs already
        committed on your behalf and evidenced to you.
      </p>
      <p>
        A cancelled or missed flight is not force majeure on our side. Travel
        insurance is the right cover for that, and we ask every guest to hold it
        — see the <Link href="/legal/terms">Terms &amp; Conditions</Link>.
      </p>

      <h2>Questions before you book</h2>
      <p>
        If anything here is unclear, ask before you pay rather than after:{" "}
        <Link href={CONTACT_HREF}>get in touch</Link> and we will answer in
        writing.{" "}
        {isPending(LEGAL.supportHours) ? (
          <ToConfirm>the hours the inbox is answered</ToConfirm>
        ) : (
          <>We read the inbox {LEGAL.supportHours}.</>
        )}
      </p>
    </LegalPage>
  );
}

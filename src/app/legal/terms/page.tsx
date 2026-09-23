import type { Metadata } from "next";
import Link from "next/link";

import { Fact, LegalPage } from "@/features/legal/components/legal-page";
import { LEGAL } from "@/features/legal/data/legal";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms of booking and staying at Imsouane Surf House: what we provide, what is expected of you, surf-specific risk, insurance, and how bookings are confirmed.",
  alternates: { canonical: "/legal/terms" },
  openGraph: { url: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      summary="The agreement between you and the house when you book a stay, a week, or a session."
    >
      <h2>Who you are contracting with</h2>
      <p>
        These terms are between you and{" "}
        <Fact
          value={LEGAL.entity.name}
          describe="the registered legal name of the operating entity"
        />
        , which operates Imsouane Surf House at {SITE.streetAddress},{" "}
        {SITE.locality} {SITE.postalCode}, Morocco. Booking a stay means you
        accept these terms and the{" "}
        <Link href="/legal/refunds">Cancellation &amp; Refund Policy</Link>.
      </p>

      <h2>Booking and confirmation</h2>
      <p>
        Bookings are made through our booking engine, which is operated for us
        by Cloudbeds. A booking exists only once you receive a confirmation
        email carrying a reservation number — not when a payment leaves your
        card, and not when a date is held in the calendar.
      </p>
      <p>
        That confirmation email is your receipt and your proof of booking. It
        lists your reservation number, your dates, the room or package booked,
        the amount paid, the amount outstanding if any, and the address and
        contact details of the house. If it has not arrived within an hour,
        check your spam folder and then write to{" "}
        <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>.
      </p>

      <h2>Prices and payment</h2>
      <p>
        All prices are shown and charged in {LEGAL.currency}, and the price you
        see in the booking engine at the moment of booking is the price that
        applies. Card payment is processed inside Cloudbeds&rsquo; secure
        environment by a PCI-compliant payment provider; your card details are
        never entered on, stored by, or transmitted through this website.
      </p>
      <p>
        What you pay at booking depends on the rate plan you choose. On the{" "}
        <strong>non-refundable</strong> rate the full price is charged
        immediately. On the <strong>semi-flexible</strong> rate a 30% deposit is
        charged at booking and the 70% balance falls due at check-in, payable by
        card, in euros or in dirhams. Full terms are in the{" "}
        <Link href="/legal/refunds">Cancellation &amp; Refund Policy</Link>.
      </p>

      <h2>What is included</h2>
      <p>
        What each package includes is set out on its own page, and the
        confirmation email records what you actually booked. Anything not listed
        there — flights, transfers, travel insurance, additional sessions,
        treatments, and purchases at the house — is not included.
      </p>

      <h2>Surfing, risk, and your fitness to take part</h2>
      <p>
        Surfing is a sport carried out in open water, in changing conditions,
        and it carries an inherent risk of injury. By taking part you
        acknowledge that risk. You agree that:
      </p>
      <ul>
        <li>
          you have declared any medical condition, injury, or medication that
          could affect your safety in the water, and you are fit to take part;
        </li>
        <li>
          you can swim unaided, in open water, and you have told us honestly
          what your surfing level is;
        </li>
        <li>
          you will follow the instructions of the coaches and lifeguards, in and
          out of the water, and the surf etiquette explained on the first day;
        </li>
        <li>
          you will not surf under the influence of alcohol or drugs, and the
          coaches may withdraw you from a session on those grounds without a
          refund.
        </li>
      </ul>
      <p>
        Coaches may change, shorten, move, or cancel a session where conditions
        or safety require it. Nothing in these terms excludes liability for
        death or personal injury caused by our negligence, or for anything else
        that cannot lawfully be excluded.
      </p>

      <h2>Insurance</h2>
      <p>
        <strong>
          Travel and accident insurance is a condition of your booking.
        </strong>{" "}
        Your policy must cover medical treatment and repatriation in Morocco and
        must cover surfing as an activity — many standard policies exclude it or
        charge extra for it. We may ask to see your policy details. We do not
        insure your trip, your belongings, or your cancellation risk.
      </p>

      <h2>Equipment and damage</h2>
      <p>
        Boards, wetsuits and other equipment are lent to you in working
        condition and are to be returned in the same condition, fair wear and
        tear aside. You are responsible for loss or damage caused by misuse or
        neglect, and for damage to the house or its rooms beyond normal use.
      </p>

      <h2>Behaviour at the house</h2>
      <p>
        The house is shared. We may end a stay without refund for behaviour that
        puts others at risk, for harassment of guests or staff, or for repeated
        disregard of the house&rsquo;s quiet hours and rules. Illegal drugs are
        not permitted on the property.
      </p>

      <h2>Photography</h2>
      <p>
        Sessions are filmed as part of the coaching. Those clips are for your
        review. If we would like to use an image or a clip of you publicly, we
        will ask you first, and you can decline or withdraw consent at any time
        by writing to{" "}
        <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>.
      </p>

      <h2>Liability</h2>
      <p>
        Subject to the paragraph on surfing above, our liability arising out of
        a booking is limited to the total amount you paid for that booking. We
        are not liable for indirect or consequential loss, nor for loss of
        personal property at the house, which is your responsibility.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by Moroccan law, and the courts of Morocco have
        jurisdiction over any dispute, save where the law of your country of
        residence gives you a right you cannot be deprived of by contract.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. The version that applies to your booking is
        the one published on the date you booked, and the date of the current
        version is shown at the top of this page.
      </p>
    </LegalPage>
  );
}

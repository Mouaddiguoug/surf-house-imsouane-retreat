import type { Metadata } from "next";
import { Fact, LegalPage } from "@/features/legal/components/legal-page";
import { LEGAL } from "@/features/legal/data/legal";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal data Imsouane Surf House collects, why, who processes it, how long it is kept, and the rights you have over it under the GDPR and CCPA.",
  alternates: { canonical: "/legal/privacy" },
  openGraph: { url: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      summary="What we collect, why we collect it, who else touches it, and how to get it back or deleted."
    >
      <h2>The short version</h2>
      <p>
        We collect what a booking or an enquiry needs and nothing else. We do
        not sell your data, we do not run advertising trackers, and we never see
        your card number.
      </p>

      <h2>What we collect</h2>
      <h3>When you write to us</h3>
      <p>
        The contact form asks for your first and last name, your email address,
        an optional phone number, and your message. That goes to the
        house&rsquo;s own inbox by email so that a person can answer it. Your IP
        address is held in memory very briefly to stop the form being used for
        spam, and is not written to a database or kept afterwards.
      </p>
      <h3>When you book</h3>
      <p>
        Bookings are handled by Cloudbeds, our property management and booking
        system. What you enter there — your name, contact details, dates, stay
        preferences and payment — is processed by Cloudbeds and its payment
        provider on our behalf. Card details are entered inside their
        PCI-compliant environment; they do not pass through this website and we
        never hold them.
      </p>
      <h3>When you simply read the site</h3>
      <p>
        We run no analytics and set no advertising or tracking cookies. Our
        hosting provider keeps standard server logs, including IP addresses, for
        security and reliability. Opening the village map loads map tiles from
        OpenFreeMap, which necessarily sees your IP address in order to send
        them.
      </p>

      <h2>Why we are allowed to hold it</h2>
      <ul>
        <li>
          <strong>To perform a contract</strong> — everything needed to take,
          confirm and deliver your booking.
        </li>
        <li>
          <strong>Legitimate interests</strong> — answering an enquiry,
          protecting the site from abuse, and keeping our records straight.
        </li>
        <li>
          <strong>Legal obligation</strong> — accounting and tax records we are
          required to keep.
        </li>
      </ul>

      <h2>Who else processes it</h2>
      <dl>
        <dt>Cloudbeds</dt>
        <dd>
          Booking engine and property management system, including payment
          processing through its PCI-compliant provider.
        </dd>
        <dt>Vercel</dt>
        <dd>Hosting for this website, including server logs.</dd>
        <dt>Our email provider</dt>
        <dd>
          Delivery and storage of enquiries sent through the contact form.
        </dd>
        <dt>OpenFreeMap</dt>
        <dd>Map tiles, on the Imsouane page only.</dd>
      </dl>
      <p>
        Each of these acts on our instructions, or as an independent controller
        for its own infrastructure. We do not sell or share your personal
        information, and we have not done so in the preceding twelve months.
      </p>

      <h2>Leaving Morocco and the EU</h2>
      <p>
        The house is in Morocco and our providers are largely in the United
        States and the European Union, so your data may be transferred outside
        your own country. Where that involves personal data from the EU or the
        UK, those transfers rely on the standard contractual clauses in our
        providers&rsquo; data-processing terms.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          <strong>Enquiries</strong> — kept while we are talking, then for up to
          two years in case you come back to us.
        </li>
        <li>
          <strong>Bookings</strong> — kept for as long as accounting and tax law
          requires, which is longer than we would otherwise keep them.
        </li>
        <li>
          <strong>Session footage</strong> — recorded for your review during the
          week and deleted afterwards unless you have asked us to keep or send
          it.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Wherever you live, you can ask us for a copy of what we hold about you,
        ask us to correct it, or ask us to delete it. If the GDPR applies to
        you, you also have the right to restrict or object to processing, the
        right to portability, and the right to complain to your national data
        protection authority. If the CCPA applies to you, you have the right to
        know, to delete, to correct, and not to be discriminated against for
        exercising them.
      </p>
      <p>
        Write to{" "}
        <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a> and we
        will answer within 30 days. We may need to confirm who you are before
        releasing anything.
      </p>

      <h2>Cookies</h2>
      <p>
        This website sets no cookies of its own, and no analytics or advertising
        cookies. The booking engine may set cookies that are strictly necessary
        for a booking in progress — remembering your dates and the contents of
        your basket while you complete it.
      </p>

      <h2>Children</h2>
      <p>
        The site is not directed at children, and we do not knowingly collect
        their data. Guests under 18 must be booked and accompanied by a
        responsible adult.
      </p>

      <h2>Who is responsible, and how to reach us</h2>
      <p>
        The data controller is{" "}
        <Fact
          value={LEGAL.entity.name}
          describe="the registered name of the operating entity"
        />
        , which operates Imsouane Surf House. Contact us at{" "}
        <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a> or by
        post at {SITE.streetAddress}, {SITE.locality} {SITE.postalCode},
        Morocco. We read the inbox {LEGAL.supportHours}.
      </p>
    </LegalPage>
  );
}

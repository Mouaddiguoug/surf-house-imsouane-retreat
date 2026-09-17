import { PACKAGES } from "@/features/packages/data/packages";
import { SITE } from "@/lib/constants/site";

/**
 * What the site tells Google about itself, in schema.org terms.
 *
 * A `LodgingBusiness` rather than a `SportsActivityLocation`: the house is
 * the thing with an address, a phone and a listing, and the surfing is what
 * it offers. Google's local results key on this type — it is what earns the
 * knowledge panel, the map-pack card and the rich result with the photo.
 *
 * `sameAs` and `hasMap` both point at the Business Profile, which is the
 * single most important link on the page: it is how Google reconciles this
 * site with the listing that already holds the reviews. Name, phone and
 * street line here must match that listing exactly — a mismatch is read as
 * two different businesses.
 *
 * The packages ride along as `makesOffer` without prices. Prices live in
 * Cloudbeds and change by season; a stale number in structured data is a
 * policy violation, a missing one is merely a missing rich result.
 */
export function StructuredData() {
  const image = `${SITE.url}/opengraph-image.jpg`;

  const lodging = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE.url}/#house`,
    name: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    image,
    telephone: SITE.contact.phone.e164,
    email: SITE.contact.email,
    currenciesAccepted: "MAD",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.locality,
      postalCode: SITE.postalCode,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coordinates.latitude,
      longitude: SITE.coordinates.longitude,
    },
    hasMap: SITE.googleMapsUrl,
    sameAs: [
      SITE.googleMapsUrl,
      `https://www.instagram.com/${SITE.contact.instagram}`,
    ],
    makesOffer: PACKAGES.map((entry) => ({
      "@type": "Offer",
      name: `${entry.name} — ${entry.title}`,
      description: entry.summary,
      url: `${SITE.url}${entry.href}`,
      image: `${SITE.url}${entry.href}/opengraph-image.jpg`,
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": `${SITE.url}/#house` },
    inLanguage: "en",
  };

  // `dangerouslySetInnerHTML` is the documented way to emit JSON-LD from
  // React: children would be HTML-escaped and the block would not parse.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodging) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

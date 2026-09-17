/**
 * Facts about the house that show up in metadata, structured data and the
 * footer. One source, so a phone number never drifts between three files.
 */
export const SITE = {
  name: "Surf House Imsouane",
  tagline: "A surf and yoga retreat on Morocco's longest right-hand wave.",
  /** The canonical origin — `www`, because that is what the DNS resolves to. */
  url: "https://www.imsouanesurfhouse.com",
  locality: "Imsouane",
  region: "Souss-Massa",
  country: "MA",
  /** As written on the Business Profile — the two must match to the letter. */
  streetAddress: "N97",
  postalCode: "80043",
  /**
   * The Google Business Profile. The `cid` form is the stable one — the long
   * `/maps/place/...` URL carries session state and changes — and it is what
   * structured data should point at so Google ties the site to the listing.
   */
  googleMapsUrl: "https://maps.google.com/?cid=17012313075251465422",
  /**
   * The house itself: the map pin and the structured data. These are the
   * Business Profile's own coordinates, copied rather than re-measured, so
   * the site and the listing put the house in the same place.
   */
  coordinates: { latitude: 30.8418106, longitude: -9.8182047 },
  timeZone: "Africa/Casablanca",
  /**
   * The three ways to reach a person at the house. `display` is how the
   * number is written on the page; `e164` is what the tel: link dials and
   * what WhatsApp wants — digits only, country code first, no leading zero.
   */
  contact: {
    phone: { display: "+212 688-144646", e164: "+212688144646" },
    email: "imsouanesurfhouse@gmail.com",
    instagram: "imsouanesurfhouse",
  },
} as const;

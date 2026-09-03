/**
 * Facts about the house that show up in metadata, structured data and the
 * footer. One source, so a phone number never drifts between three files.
 */
export const SITE = {
  name: "Surf House Imsouane",
  tagline: "A surf and yoga retreat on Morocco's longest right-hand wave.",
  locality: "Imsouane",
  region: "Souss-Massa",
  country: "MA",
  /** The house itself — the map pin, and structured data later. */
  coordinates: { latitude: 30.842243508529783, longitude: -9.818011610103921 },
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

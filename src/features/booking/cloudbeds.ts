/**
 * Cloudbeds Booking Engine — Immersive Experience 2.0.
 *
 * The engine ships as a script that registers two web components; the site
 * uses `<cb-immersive-experience mode="standard">` inside its own dialog
 * rather than Cloudbeds' `<cb-book-now-button>`, so the trigger stays a house
 * button and the popup keeps the house chrome. Cloudbeds' one hard rule is
 * that the tag must not sit inside an iframe — a dialog is a plain div, so
 * that holds.
 */
export const CLOUDBEDS_IMMERSIVE_SCRIPT_URL =
  "https://static1.cloudbeds.com/booking-engine/latest/static/js/immersive-experience/cb-immersive-experience.js";

/** The custom element the script registers. */
export const CLOUDBEDS_IMMERSIVE_TAG = "cb-immersive-experience";

/**
 * The hosted booking engine — the same flow the embed renders, on Cloudbeds'
 * own domain. Used as the way out when the script fails to load.
 */
export function bookingEngineUrl(propertyCode: string) {
  return `https://hotels.cloudbeds.com/reservation/${propertyCode}`;
}

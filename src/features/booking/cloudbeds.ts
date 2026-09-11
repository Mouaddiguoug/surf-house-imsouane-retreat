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
 * CSS for the embedded engine, added to the document the way Cloudbeds'
 * customization guide asks: the custom CSS field in the PMS does not reach the
 * Immersive Experience, and the tag carries `data-cb-immersive-experience-root`
 * so their own tooling can tell it apart from the site's styles.
 *
 * The embed lays itself out against the *viewport*, not against whatever
 * element it is placed in: the landing hero is sized in `dvh`, and the date
 * picker is a `position: fixed` popover in a portal appended to the end of
 * `<body>`, anchored to the viewport and out of reach of any container we
 * could give it. That is where Cloudbeds' rule comes from — standard mode must
 * not sit inside a container with a fixed or maximum height — and it is why
 * the booking dialog is the whole viewport rather than a centred panel.
 *
 * The full viewport alone leaves one thing unfixed. The embed centres the
 * search card in a 700px hero, where the hosted engine pins it 80px from the
 * hero's top; measured against the live engine that puts the card 367px down,
 * and the 493px date picker then fits neither above it nor below it, so it
 * lands at `top: -14px` — its weekday row cut off by the top of the screen.
 * Capping the hero lifts the card enough for the picker to open downwards: it
 * measures fully inside the viewport at 1440×900 (221–714) and at 1280×712
 * (196–689).
 *
 * The cap stops at 1024px, because that is where the engine's search card
 * stops being a single row. Below it the card stacks into four and stands
 * 322px tall, which a capped hero is too short to hold — it spills over the
 * section beneath it — and there is nothing to win by capping anyway: at phone
 * widths the date picker is not a popover at all but a sheet over the whole
 * screen, and at 768px it already opens with room to spare.
 *
 * The padding keeps the engine's own language and currency controls clear of
 * the dialog's close button, at every width.
 */
export const CLOUDBEDS_IMMERSIVE_CSS = `
@media (min-width: 1024px) {
  :is(#cb-bookingengine, .cb-bookingengine-root) .cb-landing-page {
    height: min(700px, 26dvh) !important;
    min-height: 0 !important;
  }
}

:is(#cb-bookingengine, .cb-bookingengine-root) .cb-header {
  padding-inline-end: 3.75rem;
}
`;

/**
 * The hosted booking engine — the same flow the embed renders, on Cloudbeds'
 * own domain. Used as the way out when the script fails to load.
 */
export function bookingEngineUrl(propertyCode: string) {
  return `https://hotels.cloudbeds.com/reservation/${propertyCode}`;
}

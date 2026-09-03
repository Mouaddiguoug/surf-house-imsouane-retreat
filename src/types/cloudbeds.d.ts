import type * as React from "react";

/**
 * Cloudbeds Immersive Experience 2.0 web components.
 *
 * Registered by `cb-immersive-experience.js` (see
 * `src/features/booking/cloudbeds.ts`). Attributes are the ones the
 * Cloudbeds article documents; everything is a string because custom-element
 * attributes always are, and "yes"/"no" is Cloudbeds' own boolean convention.
 */
type CloudbedsImmersiveAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  "property-code": string;
  mode?: "standard" | "popup";
  /** ISO-4217, e.g. "EUR". Defaults to the property's currency. */
  currency?: string;
  /** ISO 639-1, or "auto-detect". Defaults to the property's language. */
  lang?: string;
  "hide-custom-header"?: "yes" | "no";
  "hide-custom-footer"?: "yes" | "no";
  "hide-property-info"?: "yes" | "no";
  "disable-css-title-reset"?: "yes" | "no";
  "ignore-search-params"?: "yes" | "no";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "cb-immersive-experience": CloudbedsImmersiveAttributes;
    }
  }
}

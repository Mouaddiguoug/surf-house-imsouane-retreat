import { Mail, Phone } from "lucide-react";

import { InstagramIcon } from "@/components/shared/brand-icons";
import { SITE } from "@/lib/constants/site";
import type { Locale } from "@/lib/i18n/locale";

const { phone, email, instagram } = SITE.contact;

/**
 * The three direct lines to the house, as data, so the contact section and
 * the menu sheet render the same numbers from the same place. Each entry
 * is one link: the icon is decorative, `prefix` names the channel for a
 * screen reader, and `label` is the thing itself — the number, the handle,
 * the address — so there is nothing to translate before dialling.
 */
const PREFIX = {
  en: { phone: "Call or WhatsApp", instagram: "Instagram", email: "Email" },
  fr: { phone: "Appel ou WhatsApp", instagram: "Instagram", email: "E-mail" },
} as const;

/** The three channels, with the screen-reader prefix in the reader's language. */
export function contactChannels(locale: Locale = "en") {
  const prefix = PREFIX[locale];
  return [
    {
      icon: Phone,
      prefix: prefix.phone,
      label: phone.display,
      href: `tel:${phone.e164}`,
      external: false,
    },
    {
      icon: InstagramIcon,
      prefix: prefix.instagram,
      label: `@${instagram}`,
      href: `https://www.instagram.com/${instagram}`,
      external: true,
    },
    {
      icon: Mail,
      prefix: prefix.email,
      label: email,
      href: `mailto:${email}`,
      external: false,
    },
  ] as const;
}

export const CONTACT_CHANNELS = contactChannels("en");

/**
 * A WhatsApp chat with the house, for the calls to action that name
 * WhatsApp outright. `wa.me` wants the number as digits only, so the `+`
 * comes off the E.164 form.
 */
export const WHATSAPP_HREF = `https://wa.me/${phone.e164.replace(/^\+/, "")}`;

import { Mail, Phone } from "lucide-react";

import { InstagramIcon } from "@/components/shared/brand-icons";
import { SITE } from "@/lib/constants/site";

const { phone, email, instagram } = SITE.contact;

/**
 * The three direct lines to the house, as data, so the contact section and
 * the menu sheet render the same numbers from the same place. Each entry
 * is one link: the icon is decorative, `prefix` names the channel for a
 * screen reader, and `label` is the thing itself — the number, the handle,
 * the address — so there is nothing to translate before dialling.
 */
export const CONTACT_CHANNELS = [
  {
    icon: Phone,
    prefix: "Call or WhatsApp",
    label: phone.display,
    href: `tel:${phone.e164}`,
    external: false,
  },
  {
    icon: InstagramIcon,
    prefix: "Instagram",
    label: `@${instagram}`,
    href: `https://www.instagram.com/${instagram}`,
    external: true,
  },
  {
    icon: Mail,
    prefix: "Email",
    label: email,
    href: `mailto:${email}`,
    external: false,
  },
] as const;

/**
 * A WhatsApp chat with the house, for the calls to action that name
 * WhatsApp outright. `wa.me` wants the number as digits only, so the `+`
 * comes off the E.164 form.
 */
export const WHATSAPP_HREF = `https://wa.me/${phone.e164.replace(/^\+/, "")}`;

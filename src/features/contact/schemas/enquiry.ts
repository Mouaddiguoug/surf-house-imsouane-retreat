import { z } from "zod";

/** An optional leading +, then 6–20 digits with the usual separators around them. */
const PHONE_PATTERN = /^\+?[\s.\-()]*(?:\d[\s.\-()]*){6,20}$/;

/**
 * A message from the "Get in touch" form.
 *
 * Shared by the form (through `zodResolver`) and by the API layer, so the
 * shape the server receives is the shape the form validated. Messages are
 * whole sentences on purpose — they sit beside the field, in the house's
 * voice, and say what to do rather than what went wrong.
 */
export const enquirySchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Tell us your first name.")
    .max(80, "Keep it under 80 characters."),
  lastName: z
    .string()
    .trim()
    .min(1, "And your last name.")
    .max(80, "Keep it under 80 characters."),
  email: z.email("That email address does not look right."),
  /**
   * Optional: most questions are answered by email, but a group or a
   * last-minute booking is easier by phone or WhatsApp. Loose on purpose —
   * digits, spaces, dots, dashes, brackets and a leading + — because guests
   * write numbers in a dozen national formats.
   */
  phone: z
    .string()
    .trim()
    .max(30, "Keep it under 30 characters.")
    .refine(
      (value) => value === "" || PHONE_PATTERN.test(value),
      "That phone number does not look right — include the country code.",
    ),
  message: z
    .string()
    .trim()
    .min(
      20,
      "Give us a little more to go on — dates, how many of you, anything.",
    )
    .max(2000, "Keep it under 2,000 characters; we can go longer by email."),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

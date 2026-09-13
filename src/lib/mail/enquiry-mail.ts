import "server-only";

import type { EnquiryInput } from "@/features/contact/schemas/enquiry";
import { getTransporter, readMailConfig } from "@/lib/mail/mailer";
import { SITE } from "@/lib/constants/site";

/**
 * Turns a validated enquiry into the message that lands in the house's inbox.
 */

/** Everything a guest typed is untrusted text in an HTML document. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Collapses whitespace for anything that goes in a header.
 *
 * A newline inside a subject line is how header injection starts, and the
 * schema trims the ends of a name without touching the middle.
 */
function headerSafe(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export type SendResult =
  { ok: true } | { ok: false; reason: "unconfigured" | "send-failed" };

export async function sendEnquiryMail(
  enquiry: EnquiryInput,
): Promise<SendResult> {
  const result = readMailConfig();
  if (!result.ok) {
    console.error(
      `[enquiry] mail is not configured; missing ${result.missing.join(", ")}`,
    );
    return { ok: false, reason: "unconfigured" };
  }

  const { config } = result;
  const name = headerSafe(`${enquiry.firstName} ${enquiry.lastName}`);
  const phone = enquiry.phone.trim();

  const lines = [
    `From:    ${name}`,
    `Email:   ${enquiry.email}`,
    `Phone:   ${phone || "—"}`,
    "",
    enquiry.message,
  ];

  try {
    await getTransporter(config).sendMail({
      to: config.to,
      // The envelope sender has to be a mailbox we are allowed to send as;
      // most providers reject anything else. The guest's address goes in
      // `replyTo` instead, so hitting reply in the inbox answers the guest
      // rather than the house.
      from: `${SITE.name} <${config.from}>`,
      replyTo: `${name} <${enquiry.email}>`,
      subject: `Enquiry — ${name}`,
      text: lines.join("\n"),
      html: `
        <table cellpadding="0" cellspacing="0" style="font-family: system-ui, sans-serif; font-size: 15px; line-height: 1.6;">
          <tr><td style="padding-right: 16px; color: #6d5f56;">From</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding-right: 16px; color: #6d5f56;">Email</td><td><a href="mailto:${escapeHtml(enquiry.email)}">${escapeHtml(enquiry.email)}</a></td></tr>
          <tr><td style="padding-right: 16px; color: #6d5f56;">Phone</td><td>${phone ? escapeHtml(phone) : "—"}</td></tr>
        </table>
        <p style="font-family: system-ui, sans-serif; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(enquiry.message)}</p>
      `,
    });
    return { ok: true };
  } catch (error) {
    // The reason stays in the server log: it can name the host, the mailbox,
    // or the authentication failure, and none of that belongs in a response
    // to whoever just filled in the form.
    console.error("[enquiry] send failed", error);
    return { ok: false, reason: "send-failed" };
  }
}

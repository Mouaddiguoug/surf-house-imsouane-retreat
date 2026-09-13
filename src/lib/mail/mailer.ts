import "server-only";

import { createTransport, type Transporter } from "nodemailer";

/**
 * The SMTP transport, and the one place the mail credentials are read.
 *
 * `server-only` at the top is the guard that matters: none of these variables
 * carry the `NEXT_PUBLIC_` prefix, so they never reach the browser on their
 * own, but an accidental import from a client component would be a build
 * error rather than a leak. Nothing outside `src/app/api` should import this.
 *
 * The transporter is made once and kept for the life of the process. Creating
 * one per request would open a new SMTP connection every time; nodemailer's
 * pool reuses them, which matters on a form that can be submitted twice in a
 * second by an impatient reader.
 */
export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  /** Where enquiries land. */
  to: string;
  /** The mailbox we send as — with most providers this has to be `user`. */
  from: string;
};

/**
 * Reads the environment, or explains what is missing.
 *
 * Returns a reason rather than throwing so the route can answer a reader
 * politely and log the real cause once, instead of turning a missing variable
 * into a stack trace on every submission.
 */
export function readMailConfig():
  { ok: true; config: MailConfig } | { ok: false; missing: string[] } {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO ?? user;

  const missing = [
    ["SMTP_HOST", host],
    ["SMTP_USER", user],
    ["SMTP_PASS", pass],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name as string);

  if (missing.length > 0 || !host || !user || !pass || !to) {
    return { ok: false, missing };
  }

  // 465 is implicit TLS; 587 and 25 start in the clear and upgrade with
  // STARTTLS, which is what `secure: false` means to nodemailer.
  const port = Number(process.env.SMTP_PORT ?? 587);

  return {
    ok: true,
    config: {
      host,
      port,
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === "true"
        : port === 465,
      user,
      pass,
      to,
      from: process.env.MAIL_FROM ?? user,
    },
  };
}

let transporter: Transporter | null = null;

export function getTransporter(config: MailConfig): Transporter {
  transporter ??= createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    pool: true,
    maxConnections: 2,
  });
  return transporter;
}

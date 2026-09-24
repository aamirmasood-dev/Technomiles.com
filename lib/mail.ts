// Server-only: imported solely from app/contact/actions.ts ("use server").
import type { ContactValues } from "./contact";

export class MailNotConfiguredError extends Error {
  constructor() {
    super("Contact email is not configured (SMTP_* environment variables are missing).");
  }
}

/**
 * Sends a contact-form submission to CONTACT_TO (default info@technomiles.com).
 *
 * TODO(connectivity): implement delivery through the owner's Zoho Mail SMTP account using a small
 * client on Node's built-in `node:tls` (no extra packages). Expected env vars — see .env.example:
 *   SMTP_HOST (smtp.zoho.com | .eu | .in | .com.au), SMTP_PORT (465), SMTP_USER, SMTP_PASS (app password),
 *   CONTACT_TO, CONTACT_FROM (must be the Zoho mailbox). Reply-To = the visitor's email.
 *
 * Until then: in development the message is logged to the terminal and treated as sent;
 * in production the form shows the "couldn't send" error so no enquiry is silently lost.
 */
export async function sendContactMail(v: ContactValues): Promise<void> {
  const configured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  if (!configured) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] SMTP not configured — logging submission instead of sending:\n", v);
      return;
    }
    throw new MailNotConfiguredError();
  }

  // SMTP delivery is added in the connectivity step.
  throw new MailNotConfiguredError();
}

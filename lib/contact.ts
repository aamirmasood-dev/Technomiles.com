import { contactPage, services } from "@/content";

/** Contact-form validation (the site is a static export, so this runs in the browser). */

export const CONTACT_FIELDS = ["name", "email", "phone", "service", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Hidden spam-trap field: humans never see or fill it. */
export const HONEYPOT = "website";

export const SERVICE_OPTIONS = [contactPage.form.fields.service.default, ...services.map((s) => s.title)];

/**
 * Optional form backend (e.g. Formspree, Web3Forms, a Zoho Forms webhook) that accepts a JSON POST.
 * Without it, submissions open the visitor's email app pre-filled to the company address.
 */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()\-.]{7,20}$/;

export function readValues(fd: FormData): ContactValues {
  const get = (k: ContactField) => String(fd.get(k) ?? "").trim();
  return { name: get("name"), email: get("email"), phone: get("phone"), service: get("service"), message: get("message") };
}

export function validateContact(v: ContactValues): ContactErrors {
  const msg = contactPage.form.errors;
  const errors: ContactErrors = {};
  if (v.name.length < 2 || v.name.length > 100) errors.name = msg.name;
  if (!EMAIL_RE.test(v.email) || v.email.length > 200) errors.email = msg.email;
  if (v.phone && !PHONE_RE.test(v.phone)) errors.phone = msg.phone;
  if (v.message.length > 5000) errors.message = msg.message;
  return errors;
}

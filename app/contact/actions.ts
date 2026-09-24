"use server";

import { contactPage } from "@/content";
import { HONEYPOT, readValues, validateContact, type ContactState } from "@/lib/contact";
import { sendContactMail } from "@/lib/mail";

export async function submitContact(_prev: ContactState, fd: FormData): Promise<ContactState> {
  // Spam trap: bots fill every field. Pretend it worked, send nothing.
  if (String(fd.get(HONEYPOT) ?? "").trim() !== "") return { status: "success" };

  const values = readValues(fd);
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  try {
    await sendContactMail(values);
    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return { status: "error", values, message: contactPage.form.errors.generic };
  }
}

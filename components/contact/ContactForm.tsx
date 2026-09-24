"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { company, contactPage } from "@/content";
import {
  FORM_ENDPOINT,
  HONEYPOT,
  SERVICE_OPTIONS,
  readValues,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/contact";
import { Icon } from "@/components/ui/Icon";
import s from "./contact.module.css";

const copy = contactPage.form;
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

/** Hands the enquiry to the visitor's email app, addressed to the company inbox. */
function openMailto(v: ContactValues) {
  const L = copy.mailto.labels;
  const body = [
    `${L.name}: ${v.name}`,
    `${L.email}: ${v.email}`,
    v.phone && `${L.phone}: ${v.phone}`,
    `${L.service}: ${v.service}`,
    "",
    v.message && `${L.message}:\n${v.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  const subject = `${copy.mailto.subject} — ${v.name}`;
  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Form({ onDone }: { onDone: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});

  if (status === "sent" || status === "mailto") {
    const mailto = status === "mailto";
    return (
      <div className={s.sent} role="status">
        <div className={"okpop core " + s.ok}>
          <Icon name={mailto ? "mail" : "check"} size={48} strokeWidth={2.4} style={{ color: "#fff" }} />
        </div>
        <h2 className={"disp " + s.sentH2}>{mailto ? copy.mailto.title : copy.success.title}</h2>
        <p className={s.sentP}>
          {mailto ? (
            <>
              {copy.mailto.text} <a href={`mailto:${company.email}`}>{company.email}</a>.
            </>
          ) : (
            copy.success.text
          )}
        </p>
        <button type="button" className={"btn btn-ghost mag " + s.again} onClick={onDone}>
          {copy.success.again}
        </button>
      </div>
    );
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Spam trap: bots fill every field. Pretend it worked, send nothing.
    if (String(fd.get(HONEYPOT) ?? "").trim() !== "") {
      setStatus("sent");
      return;
    }
    const values = readValues(fd);
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    if (!FORM_ENDPOINT) {
      openMailto(values);
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, _subject: `${copy.mailto.subject} — ${values.name}` }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  // Clear a field's error as soon as it's edited.
  const clear = (k: ContactField) => {
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };
  const f = copy.fields;
  const err = (k: ContactField) =>
    errors[k] ? (
      <span id={`c-${k}-err`} className={s.err}>
        {errors[k]}
      </span>
    ) : null;
  const a11y = (k: ContactField) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `c-${k}-err` : undefined,
    onInput: () => clear(k),
  });
  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className={s.form}>
      <div className={s.formHead}>
        <span className={"mono " + s.eyebrow}>{copy.eyebrow}</span>
        <h2 className={"disp " + s.formH2}>{copy.title}</h2>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div className={s.hp} aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={s.grid2}>
        <div className="fld">
          <label htmlFor="c-name">{f.name.label}</label>
          <input id="c-name" name="name" className="field" type="text" placeholder={f.name.placeholder} autoComplete="name" required {...a11y("name")} />
          {err("name")}
        </div>
        <div className="fld">
          <label htmlFor="c-email">{f.email.label}</label>
          <input id="c-email" name="email" className="field" type="email" placeholder={f.email.placeholder} autoComplete="email" required {...a11y("email")} />
          {err("email")}
        </div>
        <div className="fld">
          <label htmlFor="c-phone">{f.phone.label}</label>
          <input id="c-phone" name="phone" className="field" type="tel" placeholder={f.phone.placeholder} autoComplete="tel" {...a11y("phone")} />
          {err("phone")}
        </div>
        <div className="fld">
          <label htmlFor="c-service">{f.service.label}</label>
          <select id="c-service" name="service" className="field" defaultValue={SERVICE_OPTIONS[0]}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="fld">
        <label htmlFor="c-message">{f.message.label}</label>
        <textarea id="c-message" name="message" className="field" placeholder={f.message.placeholder} maxLength={5000} {...a11y("message")} />
        {err("message")}
      </div>

      {status === "error" && (
        <p className={s.formErr} role="alert">
          {copy.errors.generic}
        </p>
      )}

      <div className={s.submitRow}>
        <span className={s.consent}>
          {copy.consent} <Link href="/privacy-policy">{copy.consentLink}</Link>.
        </span>
        <button className={"btn btn-red mag " + s.submit} type="submit" disabled={sending} aria-busy={sending}>
          {sending ? copy.sending : copy.submit} <Icon name="arrow" />
        </button>
      </div>
    </form>
  );
}

/** The form remounts (fresh state) when "Send another" is clicked. */
export function ContactForm() {
  const [n, setN] = useState(0);
  return <Form key={n} onDone={() => setN((x) => x + 1)} />;
}

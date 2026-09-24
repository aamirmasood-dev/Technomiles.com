"use client";

import Link from "next/link";
import { useActionState, useState, type FormEvent } from "react";
import { contactPage } from "@/content";
import { submitContact } from "@/app/contact/actions";
import {
  HONEYPOT,
  SERVICE_OPTIONS,
  readValues,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactState,
} from "@/lib/contact";
import { Icon } from "@/components/ui/Icon";
import s from "./contact.module.css";

const copy = contactPage.form;
const INITIAL: ContactState = { status: "idle" };

function Form({ onDone }: { onDone: () => void }) {
  const [state, action, pending] = useActionState(submitContact, INITIAL);
  const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);

  if (state.status === "success") {
    return (
      <div className={s.sent} role="status">
        <div className={"okpop core " + s.ok}>
          <Icon name="check" size={48} strokeWidth={2.4} style={{ color: "#fff" }} />
        </div>
        <h2 className={"disp " + s.sentH2}>{copy.success.title}</h2>
        <p className={s.sentP}>{copy.success.text}</p>
        <button type="button" className={"btn btn-ghost mag " + s.again} onClick={onDone}>
          {copy.success.again}
        </button>
      </div>
    );
  }

  const errors: ContactErrors = clientErrors ?? state.errors ?? {};
  const v = state.values;

  // Instant validation; the Server Action re-validates regardless.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const found = validateContact(readValues(new FormData(e.currentTarget)));
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      setClientErrors(found);
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    } else {
      setClientErrors(null);
    }
  };
  // Clear a field's error as soon as it's edited.
  const clear = (k: ContactField) => {
    if (clientErrors?.[k]) setClientErrors({ ...clientErrors, [k]: undefined });
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

  return (
    <form action={action} onSubmit={onSubmit} noValidate className={s.form}>
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
          <input id="c-name" name="name" className="field" type="text" placeholder={f.name.placeholder} autoComplete="name" required defaultValue={v?.name} {...a11y("name")} />
          {err("name")}
        </div>
        <div className="fld">
          <label htmlFor="c-email">{f.email.label}</label>
          <input id="c-email" name="email" className="field" type="email" placeholder={f.email.placeholder} autoComplete="email" required defaultValue={v?.email} {...a11y("email")} />
          {err("email")}
        </div>
        <div className="fld">
          <label htmlFor="c-phone">{f.phone.label}</label>
          <input id="c-phone" name="phone" className="field" type="tel" placeholder={f.phone.placeholder} autoComplete="tel" defaultValue={v?.phone} {...a11y("phone")} />
          {err("phone")}
        </div>
        <div className="fld">
          <label htmlFor="c-service">{f.service.label}</label>
          <select id="c-service" name="service" className="field" defaultValue={v?.service || SERVICE_OPTIONS[0]}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="fld">
        <label htmlFor="c-message">{f.message.label}</label>
        <textarea id="c-message" name="message" className="field" placeholder={f.message.placeholder} maxLength={5000} defaultValue={v?.message} {...a11y("message")} />
        {err("message")}
      </div>

      {state.status === "error" && state.message && (
        <p className={s.formErr} role="alert">
          {state.message}
        </p>
      )}

      <div className={s.submitRow}>
        <span className={s.consent}>
          {copy.consent} <Link href="/privacy-policy">{copy.consentLink}</Link>.
        </span>
        <button className={"btn btn-red mag " + s.submit} type="submit" disabled={pending} aria-busy={pending}>
          {pending ? copy.sending : copy.submit} <Icon name="arrow" />
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

import Link from "next/link";
import { company, cta, telHref } from "@/content";
import { Icon } from "@/components/ui/Icon";
import s from "./CtaSection.module.css";

/** "Let's build what's next." — on every page except /contact. */
export function CtaSection() {
  return (
    <section className={s.cta} aria-labelledby="cta-title">
      <div className={s.halo} aria-hidden="true" />
      <div className={"grid-bg " + s.grid} aria-hidden="true" />
      <div className={s.inner}>
        <div className="h-meta" data-rv="wipe">
          <b />
          {cta.eyebrow}
        </div>
        <div className={s.row}>
          <h2 id="cta-title" data-rv="up" className="disp cta-big">
            {cta.title}
            <br />
            <span className="o">{cta.titleAccent}</span>
          </h2>
          <Link className="ring-btn mag" href="/contact" aria-label={cta.ringLabel} data-rv="scale">
            <svg className="rt" viewBox="0 0 220 220" aria-hidden="true">
              <defs>
                <path id="cta-ring-path" d="M110 110 m-92 0 a92 92 0 1 1 184 0 a92 92 0 1 1 -184 0" />
              </defs>
              <text fontFamily="JetBrains Mono, monospace" fontSize="13" letterSpacing="5.2" fill="var(--fg)" className="mono">
                <textPath href="#cta-ring-path">{cta.ringText}</textPath>
              </text>
            </svg>
            <span className="rc">
              <Icon name="arrow" size={40} strokeWidth={2} />
            </span>
          </Link>
        </div>
        <div data-rv="up" className={s.cards}>
          <a className="info" href={`mailto:${company.email}`}>
            <span className="ii">
              <Icon name="mail" size={22} strokeWidth={1.8} />
            </span>
            <span className={s.cardText}>
              <span className="mono">{cta.emailLabel}</span>
              <span>{company.email}</span>
            </span>
          </a>
          <a className="info" href={telHref(company.phones[0])}>
            <span className="ii">
              <Icon name="phone" size={22} strokeWidth={1.8} />
            </span>
            <span className={s.cardText}>
              <span className="mono">{cta.phoneLabel}</span>
              <span>{company.phones[0]}</span>
            </span>
          </a>
          <Link className="info" href="/contact">
            <span className="ii">
              <Icon name="pin" size={22} strokeWidth={1.8} />
            </span>
            <span className={s.cardText}>
              <span className="mono">{cta.visitLabel}</span>
              <span>{company.addressShort}</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

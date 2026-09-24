import Link from "next/link";
import { company, footer, services, telHref } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { LogoSlot } from "@/components/ui/LogoSlot";
import s from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div data-rv="up" className={s.cols}>
          <div className={s.brand}>
            <LogoSlot />
            <p>{footer.tagline}</p>
          </div>
          <nav className={s.col} aria-label="Services">
            <span className="mono">SERVICES</span>
            {services.map((svc) => (
              <Link key={svc.slug} className="foot-a" href={svc.route}>
                {svc.title}
              </Link>
            ))}
          </nav>
          <nav className={s.col} aria-label="Company">
            <span className="mono">COMPANY</span>
            {footer.company.map((l) => (
              <Link key={l.href} className="foot-a" href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <nav className={s.col} aria-label="Legal">
            <span className="mono">LEGAL</span>
            {footer.legal.map((l) => (
              <Link key={l.href} className="foot-a" href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className={s.col}>
            <span className="mono">CONTACT</span>
            <a className="foot-a" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            {company.phones.map((p) => (
              <a key={p} className="foot-a" href={telHref(p)}>
                {p}
              </a>
            ))}
            <address className={s.addr}>{company.address}</address>
          </div>
        </div>
        <div className={s.bar}>
          <span>{footer.copyright}</span>
          <a className={"foot-a " + s.top} href="#top">
            Back to top
            <Icon name="arrowUp" size={16} />
          </a>
        </div>
      </div>
      <div className={"disp big-word " + s.word} aria-hidden="true">
        TECHNOMILES
      </div>
    </footer>
  );
}

import Link from "next/link";
import type { CSSProperties } from "react";
import { home, services } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { ACCENT_VAR } from "@/lib/theme";
import s from "./hero.module.css";

/** Calm, static hero: clear headline + a "What we do" panel that doubles as service navigation. */
export function Hero() {
  const { hero, heroSub } = home;
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={"grid-bg " + s.grid} aria-hidden="true" />
      <div className={s.glow} aria-hidden="true" />
      <div className={s.inner}>
        <div className={s.copy}>
          <div className="in1 h-meta">
            <b />
            {hero.meta}
          </div>
          <h1 id="hero-title" className={"in2 disp " + s.title}>
            {hero.title} <span className={s.accent}>{hero.titleAccent}</span>
          </h1>
          <p className={"in3 " + s.lead}>{heroSub}</p>
          <div className={"in3 " + s.btns}>
            <Link className="btn btn-red mag" href="/contact">
              {hero.ctaPrimary} <Icon name="arrow" />
            </Link>
            <a className="btn btn-ghost mag" href="#services">
              {hero.ctaSecondary}
            </a>
          </div>
          <span className={"in3 mono " + s.status}>
            <span className="live" aria-hidden="true" />
            {hero.status}
          </span>
        </div>

        <nav className={"in4 " + s.panel} aria-label={hero.panelLabel}>
          <div className={"mono " + s.panelHead}>
            <span>{hero.panelLabel}</span>
            <span>{hero.panelCount}</span>
          </div>
          <ul className={s.list}>
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link href={svc.route} className={s.row} style={{ "--c": ACCENT_VAR[svc.slug] } as CSSProperties}>
                  <span className={"mono " + s.num}>{svc.number}</span>
                  <span className={s.ic} aria-hidden="true">
                    <Icon name={svc.slug} size={20} strokeWidth={1.8} />
                  </span>
                  <span className={s.rowText}>
                    <span className={s.rowTitle}>{svc.title}</span>
                    <span className={s.rowLine}>{svc.menuLine}</span>
                  </span>
                  <Icon name="arrow" className={s.rowArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

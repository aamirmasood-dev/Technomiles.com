import type { ReactNode } from "react";
import { Crumb } from "@/components/ui/Crumb";
import { MouseParallax } from "@/components/fx/MouseParallax";
import s from "./PageHero.module.css";

interface PageHeroProps {
  crumb: string;
  trail?: { label: string; href: string }[];
  title: string;
  /** Red glitching word at the end of the title. */
  titleAccent: string;
  lead: ReactNode;
  /** Buttons, search box, etc. under the lead. */
  children?: ReactNode;
  /** Content of the red core orb on the right. */
  core: ReactNode;
}

/** Inner-page hero (About, Contact, FAQ): breadcrumb, glitch title, lead, and the ringed "core" orb. */
export function PageHero({ crumb, trail, title, titleAccent, lead, children, core }: PageHeroProps) {
  return (
    <section className={s.hero}>
      <div className={"grid-bg " + s.grid} aria-hidden="true" />
      <div className="hero-sweep" aria-hidden="true" />
      <div className={s.glow} aria-hidden="true" />
      <div className={s.inner}>
        <div className={s.copy}>
          <Crumb current={crumb} trail={trail} className="in1" />
          <h1 className={"in2 disp " + s.title}>
            {title}{" "}
            <span className="glitch" data-text={titleAccent} style={{ color: "var(--red)" }}>
              {titleAccent}
            </span>
          </h1>
          <p className={"in3 " + s.lead}>{lead}</p>
          {children && <div className="in3">{children}</div>}
        </div>
        <div className={"in4 " + s.orbWrap} aria-hidden="true">
          <MouseParallax className={s.orb}>
            <div className={s.ring1} />
            <div className={"spin " + s.ring2} />
            <div className={"spinr " + s.ring3}>
              <span className={s.sat1} />
              <span className={s.sat2} />
            </div>
            <div className={"core " + s.core} data-cur="view">
              {core}
            </div>
          </MouseParallax>
        </div>
      </div>
    </section>
  );
}

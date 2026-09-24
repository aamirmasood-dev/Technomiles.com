import type { CSSProperties } from "react";
import { home } from "@/content";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IntroWords } from "./IntroWords";
import s from "./home.module.css";

export function Intro() {
  const copy = home.sections.intro;
  return (
    <section id="about" className={s.intro} aria-label={copy.label}>
      <div className={s.introInner}>
        <div className={s.introRow}>
          <div className={s.introSide}>
            <SectionLabel>{copy.label}</SectionLabel>
            <ArrowLink href="/about" data-rv="up">
              {copy.link}
            </ArrowLink>
          </div>
          <IntroWords text={home.intro} highlight={home.introHighlightWords} sectionId="about" />
        </div>
        <div className={s.facts}>
          {home.facts.map((f, i) => (
            <div key={f.label} className={s.fact + " tilt"} data-rv="up" style={{ "--d": `${i * 0.1}s` } as CSSProperties}>
              <span className={`disp ${s.factV}` + (i === 0 ? ` ${s.first}` : "")}>{f.value}</span>
              <span className={"mono " + s.factL}>{f.label.toUpperCase()}</span>
              <span className={s.factT}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { CSSProperties } from "react";
import { home } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import s from "./process.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Five-step process on a static timeline (the line fills once in view); a vertical list on mobile. */
export function Process() {
  const steps = home.process;
  const copy = home.sections.process;
  return (
    <section id="process" className={s.process} aria-labelledby="process-title">
      <div className={"grid-bg " + s.grid} aria-hidden="true" />
      <div className={s.inner}>
        <div className={s.head}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="process-title" data-rv="up" className={"disp " + s.h2}>
            {copy.title} <span style={{ color: "var(--red)" }}>{copy.titleAccent}</span>
          </h2>
        </div>

        <div data-rv="up" className={s.timeline}>
          <div className="step-line" aria-hidden="true">
            <span />
          </div>
          <ol className={s.steps}>
            {steps.map((st, i) => (
              <li key={st.title} className={"step " + s.step} style={{ "--d": `${i * 0.08}s` } as CSSProperties}>
                <span className="step-dot" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <div className={s.body}>
                  <span className={"mono " + s.stepNo}>
                    STEP {pad(i + 1)}/{pad(steps.length)}
                  </span>
                  <h3 className={"disp " + s.t}>{st.title}</h3>
                  <p className={s.d}>{st.text}</p>
                  <div className={s.chips}>
                    {st.chips.map((c) => (
                      <i key={c}>{c}</i>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Link data-rv="up" href="/contact" className={s.final}>
          <span className={"mono " + s.finalLbl}>{copy.finalLabel}</span>
          <span className={"disp " + s.finalTitle}>{copy.finalTitle}</span>
          <span className={s.finalCta}>
            {copy.finalCta} <Icon name="arrow" />
          </span>
        </Link>
      </div>
    </section>
  );
}

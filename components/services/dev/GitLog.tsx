import type { CSSProperties } from "react";
import { servicePageExtras } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import s from "./dev.module.css";

const extras = servicePageExtras["custom-development"];
const copy = extras.copy.process;

/** Process as a `git log`: one commit per stage, HEAD = ongoing support. */
export function GitLog() {
  return (
    <section className={s.git} aria-labelledby="git-title">
      <div className={"grid-bg " + s.gitGrid} aria-hidden="true" />
      <div className={s.gitInner}>
        <div className={s.col}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="git-title" data-rv="up" className={"disp " + s.gitH2}>
            {copy.title}
          </h2>
          <p data-rv="up" className={s.gitP}>
            {copy.text}
          </p>
        </div>
        <div data-rv="up" className={s.log}>
          <div className={"mono " + s.logHead}>
            <span>{copy.command}</span>
            <span>{copy.branch}</span>
          </div>
          <ol className={s.logBody}>
            <span className={s.rail} aria-hidden="true" />
            {extras.commits.map((c, i) => (
              <li key={c.hash} className={s.cm} data-rv="left" style={{ "--d": `${i * 0.1}s` } as CSSProperties}>
                <span className={s.cmDot + (c.hash === "HEAD" ? ` ${s.head}` : "")} aria-hidden="true" />
                <span className={"mono " + s.cmH}>{c.hash}</span>
                <span className={"mono " + s.cmT}>{c.type}:</span>
                <span className={s.cmM}>{c.message}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

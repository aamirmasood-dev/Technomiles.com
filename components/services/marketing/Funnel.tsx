import type { CSSProperties } from "react";
import { servicePageExtras } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./marketing.module.css";

const extras = servicePageExtras["social-media-marketing"];
const copy = extras.copy.funnel;
/** Bar widths narrow down the funnel (design: 100 / 82 / 64 / 46%). */
const WIDTHS = [100, 82, 64, 46];

export function Funnel() {
  return (
    <section className={`${v.section} ${v.dark}`} style={{ borderBottom: 0 }} aria-labelledby="funnel-title">
      <div className={"grid-bg " + v.bgGrid} aria-hidden="true" />
      <div className={v.inner}>
        <div className={v.col}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="funnel-title" data-rv="up" className={"disp " + v.h2}>
            {copy.title}
          </h2>
        </div>
        <ol className={s.funnel}>
          {extras.funnel.map((st, i) => (
            <li key={st.stage} className={s.fn} data-rv="wipe" style={{ "--d": `${i * 0.15}s` } as CSSProperties}>
              <div className={s.fnBarWrap}>
                <div className={s.fnBar} style={{ width: `${WIDTHS[i] ?? 50}%` }}>
                  <span className="disp">{st.stage}</span>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>
              <div className={s.fnText}>
                <span>{st.text}</span>
                <span className="mono">{st.channels.toUpperCase()}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

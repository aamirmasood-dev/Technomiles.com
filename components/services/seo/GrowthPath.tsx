import type { CSSProperties } from "react";
import { servicePageExtras } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./seo.module.css";

const extras = servicePageExtras.seo;
const copy = extras.copy.path;
/** Milestone positions on the curve and pillar bar lengths, from the design. */
const MS_POS = [
  { left: "14%", top: "82%" },
  { left: "38%", top: "66%" },
  { left: "62%", top: "42%" },
  { left: "86%", top: "18%" },
];
const PIL_W = [70, 90, 80, 60, 75, 85];

export function GrowthPath() {
  const n = extras.pillars.length;
  return (
    <section className={`${v.section} ${v.dark}`} style={{ borderBottom: 0 }} aria-labelledby="path-title">
      <div className={"grid-bg " + v.bgGrid} aria-hidden="true" />
      <div className={v.inner}>
        <div className={v.col}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="path-title" data-rv="up" className={"disp " + v.h2}>
            {copy.title}
          </h2>
        </div>

        <div data-rv="up" data-cur="view" className={s.chart}>
          <svg className={s.chartSvg} viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="seo-growth" x1="0" x2="1">
                <stop offset="0" stopColor="#E0192F" />
                <stop offset="1" stopColor="var(--lime)" />
              </linearGradient>
            </defs>
            <path className={s.gpath} d="M40 350 C160 340 200 320 280 300 S400 260 480 230 S600 170 700 140 S860 80 960 50" fill="none" stroke="url(#seo-growth)" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <ol className={s.milestones}>
            {extras.growthMilestones.map((m, i) => (
              <li key={m.title} className={s.ms} style={MS_POS[i]}>
                <span className={s.md} aria-hidden="true" />
                <div className={s.mt2}>
                  <div className="disp">{m.title}</div>
                  <div>{m.text}</div>
                </div>
              </li>
            ))}
          </ol>
          <span className={"mono " + s.axis} style={{ left: 24, top: 20 }} aria-hidden="true">
            {copy.yLabel}
          </span>
          <span className={"mono " + s.axis} style={{ right: 24, bottom: 16 }} aria-hidden="true">
            {copy.xLabel}
          </span>
        </div>

        <div className={s.pillars}>
          {extras.pillars.map((p, i) => (
            <div key={p.title} data-rv="up" style={{ "--d": `${(i % 3) * 0.1}s` } as CSSProperties}>
              <div className={`tilt card ${s.pil}`}>
                <span className="mono">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
                <h3 className="disp" style={{ margin: 0 }}>
                  {p.title}
                </h3>
                <span>{p.text}</span>
                <span className={s.pilBar} aria-hidden="true">
                  <span style={{ width: `${PIL_W[i] ?? 70}%` }} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

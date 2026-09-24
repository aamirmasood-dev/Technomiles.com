import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { getService, servicePageExtras } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./design.module.css";

const svc = getService("design-studio");
const copy = servicePageExtras["design-studio"].copy.disciplines;

/* Decorative art per discipline, in content order (from the design). */
const ART: { art: ReactNode; bg?: string; column?: boolean; bottom?: boolean }[] = [
  {
    art: (
      <>
        <span className={`${s.cc1} ${s.a}`} style={{ borderColor: "var(--red)" }} />
        <span className={`${s.cc1} ${s.b}`} />
        <span className={s.cross} style={{ width: 380, height: 1 }} />
        <span className={s.cross} style={{ height: 260, width: 1 }} />
        <span className={"disp " + s.bigAa}>Aa</span>
      </>
    ),
  },
  {
    art: (
      <>
        <span className={`${s.st} ${s.a}`} style={{ width: 170, height: 230, background: "#F4F1EC" }}>
          <span style={{ position: "absolute", left: 16, top: 16, width: 30, height: 30, borderRadius: "50%", background: "var(--red)" }} />
        </span>
        <span className={`${s.st} ${s.b}`} style={{ width: 180, height: 100, background: "#141418", border: "1px solid rgba(var(--ink),.15)" }}>
          <span style={{ position: "absolute", left: 14, bottom: 14, width: 60, height: 6, borderRadius: 3, background: "var(--red)" }} />
        </span>
      </>
    ),
  },
  {
    bg: "var(--surface-2)",
    art: (
      <>
        <span className={s.phLight} />
        <span className={s.bottle} />
        <span className={s.shadow} />
      </>
    ),
  },
  {
    column: true,
    art: (
      <>
        <span className={"core " + s.play2}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className={s.track}>
          <span className={s.scrub} />
        </span>
      </>
    ),
  },
  {
    bottom: true,
    art: (
      <>
        <svg style={{ position: "absolute", top: 40, width: "70%", height: 140 }} viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d="M0 95 Q50 -30 100 95 T200 95" fill="none" stroke="rgba(var(--ink),.18)" strokeWidth="1.5" strokeDasharray="4 5" />
        </svg>
        <span className={s.ball} />
      </>
    ),
  },
  {
    art: (
      <div className={s.frame}>
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className={s.cell} />
        ))}
        <span className={s.corner} style={{ left: -2, top: -2, borderLeftWidth: 3, borderTopWidth: 3 }} />
        <span className={s.corner} style={{ right: -2, top: -2, borderRightWidth: 3, borderTopWidth: 3 }} />
        <span className={s.corner} style={{ left: -2, bottom: -2, borderLeftWidth: 3, borderBottomWidth: 3 }} />
        <span className={s.corner} style={{ right: -2, bottom: -2, borderRightWidth: 3, borderBottomWidth: 3 }} />
        <span className={"mono " + s.rec}>
          <span className="blink" />
          REC
        </span>
      </div>
    ),
  },
];

/** Grid spans and stagger from the design (the brief card sits in the last slot). */
const LAYOUT = [
  { span: true, d: 0 },
  { d: 0.1 },
  { d: 0 },
  { d: 0.1 },
  { d: 0.2 },
  { span: true, d: 0 },
];

export function Disciplines() {
  return (
    <section className={v.section} aria-labelledby="disc-title">
      <div className={v.inner}>
        <div className={v.head}>
          <div className={v.col}>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="disc-title" data-rv="left" className={`disp ${v.h2} ${s.h2light}`}>
              {copy.title}
              <br />
              <span className={s.h2out}>{copy.titleAccent}</span>
            </h2>
          </div>
          <p data-rv="right" className={v.headP}>
            {copy.text}
          </p>
        </div>
        <div className={s.tiles}>
          {svc.included.map((item, i) => {
            const a = ART[i];
            return (
              <div key={item.title} data-rv="scale" className={LAYOUT[i]?.span ? s.span2 : undefined} style={{ "--d": `${LAYOUT[i]?.d ?? 0}s` } as CSSProperties}>
                <div className={s.tile} data-cur="view" tabIndex={0}>
                  <div
                    className={s.art}
                    aria-hidden="true"
                    style={{
                      background: a?.bg,
                      flexDirection: a?.column ? "column" : undefined,
                      gap: a?.column ? 26 : undefined,
                      alignItems: a?.bottom ? "flex-end" : undefined,
                      paddingBottom: a?.bottom ? 130 : undefined,
                    }}
                  >
                    {a?.art}
                  </div>
                  <div className={s.cap}>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="disp" style={{ margin: 0 }}>
                      {copy.tileTitles[i] ?? item.title}
                    </h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div data-rv="scale" style={{ "--d": ".1s" } as CSSProperties}>
            <Link className={`${s.tile} ${s.brief}`} href="/contact">
              <span className="mono">{copy.brief.label}</span>
              <span className={s.briefBody}>
                <span className="disp">{copy.brief.title}</span>
                <span>
                  {copy.brief.cta} <Icon name="arrow" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

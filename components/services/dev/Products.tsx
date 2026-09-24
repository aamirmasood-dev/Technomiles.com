import type { CSSProperties, ReactNode } from "react";
import { servicePageExtras } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import s from "./dev.module.css";

const extras = servicePageExtras["custom-development"];
const copy = extras.copy.products;
const v = (i: number) => ({ "--i": i }) as CSSProperties;

/* Mini app previews, one per product (decorative), in content order. */
const VISUALS: (() => ReactNode)[] = [
  () => (
    <div className={s.bars}>
      {[40, 65, 50, 80, 60, 92, 72].map((h, i) => (
        <span key={i} className={s.mb} style={{ height: `${h}%`, ...v(i) }} />
      ))}
    </div>
  ),
  () => (
    <div className={s.progress}>
      {[100, 76, 48, 22].map((w, i) => (
        <div key={i}>
          <div className={s.mg} style={{ width: `${w}%`, ...v(i) }} />
        </div>
      ))}
    </div>
  ),
  () => (
    <div className={s.tiles}>
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className={s.mt + (i === 5 ? ` ${s.hot}` : "")} />
      ))}
    </div>
  ),
  () => (
    <svg className={s.chart} viewBox="0 0 200 80" preserveAspectRatio="none">
      <path className={s.ml} d="M0 70 C30 60 50 66 80 44 S130 40 150 26 S185 18 200 8" fill="none" stroke="var(--acc2)" strokeWidth="2.5" />
      <path className={s.ml} d="M0 76 C40 72 70 74 100 62 S160 56 200 46" fill="none" stroke="var(--red)" strokeWidth="2.5" />
    </svg>
  ),
  () => (
    <div className={s.site}>
      <span className={s.sk} style={{ height: 6, width: "30%" }} />
      <span className={s.sk} style={{ height: 12, width: "80%", marginTop: 6, background: "rgba(var(--ink),.18)" }} />
      <span className={s.sk} style={{ height: 12, width: "55%", background: "var(--red)" }} />
      <div className={s.siteCards}>
        <span className={s.sk} />
        <span className={s.sk} />
        <span className={s.sk} />
      </div>
    </div>
  ),
  () => (
    <div className={s.desk}>
      <div className={s.deskScreen}>
        <span className={s.sk} />
        <span className={s.sk} style={{ background: "color-mix(in oklab, var(--acc2) 35%, transparent)" }} />
      </div>
      <span className={s.deskStand} />
    </div>
  ),
];

/** Grid spans and stagger from the design: 2-1-1 / 1-2-1. */
const LAYOUT = [
  { span: true, d: 0 },
  { d: 0.1 },
  { d: 0.2 },
  { d: 0 },
  { span: true, d: 0.1 },
  { d: 0.2 },
];

export function Products() {
  return (
    <section className={s.products} aria-labelledby="products-title">
      <div className={s.inner}>
        <div className={s.col}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="products-title" data-rv="up" className={"disp " + s.h2}>
            {copy.title}
            <br />
            <span className="fillhov">{copy.titleAccent}</span>
          </h2>
        </div>
        <div className={s.appGrid}>
          {extras.products.map((p, i) => {
            const Vis = VISUALS[i];
            return (
              <div key={p.title} data-rv="scale" className={LAYOUT[i]?.span ? s.span2 : undefined} style={{ "--d": `${LAYOUT[i]?.d ?? 0}s` } as CSSProperties}>
                <div className={"tilt " + s.app}>
                  <div className={s.appBar} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <em className="mono">{copy.apps[i]}</em>
                  </div>
                  <div className={s.appBody} aria-hidden="true">
                    {Vis && <Vis />}
                  </div>
                  <div className={s.appCopy}>
                    <h3 className="disp">{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

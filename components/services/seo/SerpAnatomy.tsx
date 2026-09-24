"use client";

import { useState, type CSSProperties } from "react";
import { servicePageExtras } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./seo.module.css";

const extras = servicePageExtras.seo;
const copy = extras.copy.serp;
const HOT = extras.serpHotspots;

/** Highlight zones and pin positions (% of the result card), from the design. */
const ZONES: CSSProperties[] = [
  { left: "4%", top: "30%", width: "80%", height: "12%" },
  { left: "4%", top: "13%", width: "60%", height: "12%" },
  { left: "4%", top: "44%", width: "92%", height: "17%" },
  { left: "4%", top: "63%", width: "60%", height: "9%" },
  { left: "4%", top: "76%", width: "92%", height: "20%" },
];
const PINS: CSSProperties[] = [
  { left: "88%", top: "36%" },
  { left: "68%", top: "19%" },
  { left: "97%", top: "52%" },
  { left: "68%", top: "67%" },
  { left: "97%", top: "86%" },
];

export function SerpAnatomy() {
  const [sp, setSp] = useState(0);
  const cur = HOT[sp];
  return (
    <section className={v.section} aria-labelledby="serp-title">
      <div className={v.inner}>
        <div className={v.col}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="serp-title" data-rv="up" className={"disp " + v.h2}>
            {copy.title}
            <br />
            <span className="fillhov">{copy.titleAccent}</span>
          </h2>
        </div>
        <div className={s.anatomy}>
          <div data-rv="scan" className={s.page}>
            <div className={s.pQuery} aria-hidden="true">
              {extras.copy.hero.query}
            </div>
            <div className={s.pCrumb} aria-hidden="true">
              <span />
              <span>{copy.breadcrumb}</span>
            </div>
            <div className={s.pTitle} aria-hidden="true">
              {copy.resultTitle}
            </div>
            <div className={s.pDesc} aria-hidden="true">
              {copy.resultDesc}
            </div>
            <div className={s.pRating} aria-hidden="true">
              <span>★★★★★</span>
              <span>{copy.rating}</span>
            </div>
            <div className={s.pLocal} aria-hidden="true">
              <span className={s.pMap}>
                <span />
              </span>
              <div className={s.pLocalText}>
                <span>{copy.localName}</span>
                <span>{copy.localMeta}</span>
              </div>
            </div>
            {ZONES.map((z, i) => (
              <span key={i} className={s.sz + (i === sp ? ` ${s.on}` : "")} style={z} aria-hidden="true" />
            ))}
            {HOT.map((h, i) => (
              <button key={h.title} type="button" className={s.shs + (i === sp ? ` ${s.on}` : "")} style={PINS[i]} aria-label={h.title} aria-pressed={i === sp} onClick={() => setSp(i)}>
                {i + 1}
              </button>
            ))}
          </div>
          <div data-rv="right" className={s.detail} aria-live="polite">
            <span className="mono">{cur.tag}</span>
            <h3 className="disp">{cur.title}</h3>
            <p>{cur.text}</p>
            <div className={s.dots}>
              {HOT.map((h, i) => (
                <button
                  key={h.title}
                  type="button"
                  className={`${s.shs} ${s.static}` + (i === sp ? ` ${s.on}` : "")}
                  aria-label={`${copy.dotLabel} ${i + 1}: ${h.title}`}
                  aria-pressed={i === sp}
                  onClick={() => setSp(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

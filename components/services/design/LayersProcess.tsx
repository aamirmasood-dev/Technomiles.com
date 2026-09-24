"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { servicePageExtras } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./design.module.css";

const extras = servicePageExtras["design-studio"];
const copy = extras.copy.layers;
const LAYERS = extras.processLayers;
const delay = (sec: number) => ({ animationDelay: `${sec}s` }) as CSSProperties;

/* Canvas view per layer (decorative), from the design. */
const VIEWS: ReactNode[] = [
  <div key="brief" className={s.briefLines}>
    <span className={`${s.pop} ${s.sk}`} style={{ height: 18, width: "50%", background: "rgba(var(--ink),.3)" }} />
    <span className={`${s.pop} ${s.sk}`} style={{ height: 10, width: "100%", ...delay(0.05) }} />
    <span className={`${s.pop} ${s.sk}`} style={{ height: 10, width: "92%", ...delay(0.1) }} />
    <span className={`${s.pop} ${s.sk}`} style={{ height: 10, width: "80%", ...delay(0.15) }} />
    <span className={`${s.pop} ${s.sk}`} style={{ height: 10, width: "60%", background: "var(--red)", ...delay(0.2) }} />
  </div>,
  <div key="mood" className={s.mood}>
    {["#E0192F", "#F4F1EC", "var(--line-strong)", "var(--amber)", "#5B8CFF", "#141418"].map((c, i) => (
      <span key={c} className={s.pop} style={{ background: c, ...delay(i * 0.06) }} />
    ))}
  </div>,
  <div key="concepts" className={s.concepts}>
    {[
      { l: "A", r: "50%" },
      { l: "B", r: "18px" },
      { l: "C", r: "50% 0" },
    ].map((c, i) => (
      <span key={c.l} className={`${s.pop} ${s.concept}`} style={{ borderRadius: c.r, ...delay(i * 0.1) }}>
        {c.l}
      </span>
    ))}
  </div>,
  <svg key="refine" className={s.pop} width="260" height="200" viewBox="0 0 260 200">
    <path d="M30 170 C30 40 230 40 230 170" fill="none" stroke="var(--fg)" strokeWidth="3" />
    <line x1="30" y1="170" x2="30" y2="60" stroke="#5B8CFF" strokeWidth="1.5" />
    <line x1="230" y1="170" x2="230" y2="60" stroke="#5B8CFF" strokeWidth="1.5" />
    <rect x="24" y="164" width="12" height="12" fill="#fff" stroke="#5B8CFF" strokeWidth="1.5" />
    <rect x="224" y="164" width="12" height="12" fill="#fff" stroke="#5B8CFF" strokeWidth="1.5" />
    <circle cx="30" cy="60" r="6" fill="#5B8CFF" />
    <circle cx="230" cy="60" r="6" fill="#5B8CFF" />
    <circle cx="130" cy="110" r="22" fill="var(--red)" />
  </svg>,
  <div key="deliver" className={s.files}>
    {[".SVG", ".PNG", ".PDF", ".AI"].map((f, i) => (
      <span key={f} className={`${s.pop} ${s.file}`} style={delay(i * 0.08)}>
        <span />
        {f}
      </span>
    ))}
  </div>,
];

/** Design process as a design-tool layers panel: pick a layer, the canvas and caption change. */
export function LayersProcess() {
  const [l, setL] = useState(0);
  return (
    <section className={`${v.section} ${v.dark}`} aria-labelledby="layers-title">
      <div className={v.inner}>
        <div className={v.col}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="layers-title" data-rv="up" className={"disp " + v.h2}>
            {copy.title}
          </h2>
        </div>
        <div data-rv="scale" className={s.layersPanel}>
          <div className={s.layerList}>
            <span className="mono">{copy.panelLabel}</span>
            {LAYERS.map((x, i) => (
              <button key={x.title} type="button" className={s.lyr + (i === l ? ` ${s.on}` : "")} aria-pressed={i === l} onClick={() => setL(i)}>
                <Icon name="eye" size={18} strokeWidth={2} className={s.ey} />
                <span className={"mono " + s.lyrN}>{String(i + 1).padStart(2, "0")}</span>
                {x.title}
              </button>
            ))}
          </div>
          <div>
            <div className={s.canvas} data-cur="view" aria-hidden="true">
              <div key={l} className={s.lv}>
                {VIEWS[l]}
              </div>
            </div>
            <div className={s.layerInfo} aria-live="polite">
              <span className="disp">{LAYERS[l].title}</span>
              <span>{LAYERS[l].text}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

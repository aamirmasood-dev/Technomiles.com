"use client";

import Link from "next/link";
import { useState } from "react";
import { servicePageExtras } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import s from "./dev.module.css";

const extras = servicePageExtras["custom-development"];
const copy = extras.copy.configurator;
const ALL = extras.configuratorModules;

/** Modules placed evenly on a circle around the hub, starting at 12 o'clock (design radius 38%). */
const POS = ALL.map((_, i) => {
  const a = (i / ALL.length) * Math.PI * 2 - Math.PI / 2;
  const cos = +Math.cos(a).toFixed(4);
  const sin = +Math.sin(a).toFixed(4);
  return { cos, sin, x: +(50 + cos * 38).toFixed(2), y: +(50 + sin * 38).toFixed(2) };
});

export function Configurator() {
  const [on, setOn] = useState<Set<string>>(() => new Set(copy.defaults));
  const toggle = (t: string) =>
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });

  return (
    <section id="configure" className={s.config} aria-labelledby="config-title">
      <div className={s.inner}>
        <div className={s.head}>
          <div className={s.col}>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="config-title" data-rv="left" className={"disp " + s.h2}>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p data-rv="right" className={s.headP}>
            {copy.text}
          </p>
        </div>

        <div data-rv="scale" className={s.panel}>
          <div className={s.modCol}>
            <div className={"mono " + s.modHead}>
              <span>{copy.modulesLabel}</span>
              <span aria-live="polite">
                {on.size} {copy.selected}
              </span>
            </div>
            <div role="group" aria-label={copy.groupLabel} className={s.mods}>
              {ALL.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={s.chipm + (on.has(t) ? ` ${s.on}` : "")}
                  aria-pressed={on.has(t)}
                  onClick={() => toggle(t)}
                >
                  <span className={s.bx}>
                    <Icon name="check" size={12} strokeWidth={3.5} style={{ color: "#fff" }} />
                  </span>
                  {t}
                </button>
              ))}
            </div>
            <div className={s.spacer} />
            <Link className="btn btn-red mag" href="/contact" style={{ alignSelf: "flex-start" }}>
              {copy.cta} <Icon name="arrow" />
            </Link>
          </div>

          <div className={s.diagram} data-cur="view" aria-hidden="true">
            <div className={"grid-bg " + s.diagramGrid} />
            <svg className={s.wires} viewBox="0 0 100 100" preserveAspectRatio="none">
              {ALL.map((t, i) => (
                <line
                  key={t}
                  className={s.wire + (on.has(t) ? ` ${s.on}` : "")}
                  x1="50"
                  y1="50"
                  x2={POS[i].x}
                  y2={POS[i].y}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            <div className={"core " + s.hub}>
              <span className="mono">{copy.hubLabel}</span>
              <span className="disp">{copy.hubTitle}</span>
            </div>
            {ALL.map((t, i) => (
              <span key={t} className={s.node + (on.has(t) ? ` ${s.on}` : "")} style={{ left: `calc(50% + ${POS[i].cos} * var(--orbit))`, top: `calc(50% + ${POS[i].sin} * var(--orbit))` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

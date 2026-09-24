"use client";

import { useState, type CSSProperties } from "react";
import { servicePageExtras } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { resolveFontStack } from "./fonts";
import v from "../svc.module.css";
import s from "./design.module.css";

const extras = servicePageExtras["design-studio"];
const copy = extras.copy.playground;
const PALETTES = extras.palettes;
const TYPES = extras.typePairings.map((t) => ({ ...t, display: resolveFontStack(t.display), body: resolveFontStack(t.body) }));
const MARKS = extras.marks;
/** Mark shapes: Circle, Square, Spark (a leaf rotated 45°). */
const MARK_RADIUS = ["50%", "18%", "50% 0 50% 0"];

/** Live brand playground: name, palette, type pairing and mark update a poster + business card. */
export function Playground() {
  const [name, setName] = useState(copy.defaultName);
  const [p, setP] = useState(0);
  const [t, setT] = useState(0);
  const [m, setM] = useState(0);

  const [c0, c1, c2, c3] = PALETTES[p].colors;
  const type = TYPES[t];
  const mark: CSSProperties = { borderRadius: MARK_RADIUS[m] ?? "50%", transform: `rotate(${m === 2 ? 45 : 0}deg)` };
  const display: CSSProperties = { fontFamily: type.display, fontWeight: +type.weight };
  const body: CSSProperties = { fontFamily: type.body };
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "") || copy.emailFallback;

  return (
    <section id="playground" className={`${v.section} ${s.light}`} aria-labelledby="playground-title">
      <div className={v.inner}>
        <div className={v.head}>
          <div className={v.col}>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="playground-title" data-rv="left" className={`disp ${v.h2} ${s.h2light}`}>
              {copy.title}
            </h2>
          </div>
          <p data-rv="right" className={`${v.headP} ${s.lightP}`}>
            {copy.text}
          </p>
        </div>

        <div data-rv="scale" className={s.play}>
          <div className={s.controls}>
            <div className="fld">
              <label htmlFor="bn" className={s.fldLbl}>
                {copy.nameLabel}
              </label>
              <input id="bn" className={s.bname} type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={18} autoComplete="off" />
            </div>
            <div className={s.group}>
              <span className={"mono " + s.groupLbl} id="pal-lbl">
                {copy.paletteLabel}
              </span>
              <div role="group" aria-labelledby="pal-lbl" className={s.grid2}>
                {PALETTES.map((x, i) => (
                  <button key={x.name} type="button" className={s.pbtn + (i === p ? ` ${s.on}` : "")} aria-pressed={i === p} onClick={() => setP(i)}>
                    <span className={s.sws} aria-hidden="true">
                      <i style={{ background: x.colors[0] }} />
                      <i style={{ background: x.colors[1] }} />
                      <i style={{ background: x.colors[3] }} />
                    </span>
                    {x.name}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.group}>
              <span className={"mono " + s.groupLbl} id="type-lbl">
                {copy.typeLabel}
              </span>
              <div role="group" aria-labelledby="type-lbl" className={s.stack}>
                {TYPES.map((x, i) => (
                  <button key={x.name} type="button" className={s.pbtn + (i === t ? ` ${s.on}` : "")} aria-pressed={i === t} onClick={() => setT(i)}>
                    <span className={s.aa} style={{ fontFamily: x.display, fontWeight: +x.weight }} aria-hidden="true">
                      Aa
                    </span>
                    {x.name}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.group}>
              <span className={"mono " + s.groupLbl} id="mark-lbl">
                {copy.markLabel}
              </span>
              <div role="group" aria-labelledby="mark-lbl" className={s.grid3}>
                {MARKS.map((x, i) => (
                  <button key={x} type="button" className={`${s.pbtn} ${s.center}` + (i === m ? ` ${s.on}` : "")} aria-pressed={i === m} onClick={() => setM(i)}>
                    {x}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`${s.pv} ${s.preview}`} style={{ background: c2 }} data-cur="view" aria-live="polite">
            <div className={`${s.pv} ${s.poster}`} style={{ background: c0, color: c2 }}>
              <span className={`${s.pv} ${s.posterMark}`} style={{ background: c3, ...mark }} aria-hidden="true" />
              <span className={s.mini}>{copy.posterLabel}</span>
              <div className={s.posterCopy}>
                <span className={s.posterName} style={display}>
                  {name}
                </span>
                <span className={s.posterTag} style={body}>
                  {copy.posterTagline}
                </span>
              </div>
            </div>
            <div className={`${s.pv} ${s.card}`} style={{ background: c1, color: c2 }}>
              <div className={s.cardTop}>
                <span className={`${s.pv} ${s.cardMark}`} style={{ background: c0, ...mark }} aria-hidden="true" />
                <span className={s.cardLbl}>{copy.cardLabel}</span>
              </div>
              <div className={s.cardCopy}>
                <span className={s.cardName} style={display}>
                  {name}
                </span>
                <span className={s.cardMail} style={body}>
                  {copy.emailPrefix}
                  {slug}.com
                </span>
              </div>
            </div>
            <div className={s.chips}>
              {PALETTES[p].colors.map((hex, i) => (
                <div key={i} className={s.chip}>
                  <span className={s.pv} style={{ background: hex }} />
                  <span>{hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

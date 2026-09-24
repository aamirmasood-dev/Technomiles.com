"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { servicePageExtras } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProductMock, StoreMock } from "./Mockups";
import v from "../svc.module.css";
import s from "./ecom.module.css";

const extras = servicePageExtras.ecommerce;
const copy = extras.copy.channels;
const CH = extras.channels;

/** Platform tabs (WAI-ARIA tabs: ←/→/Home/End) with a store or marketplace mockup per channel. */
export function Channels() {
  const [ch, setCh] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = CH[ch];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = CH.length;
    const map: Record<string, number> = { ArrowRight: (ch + 1) % n, ArrowLeft: (ch - 1 + n) % n, Home: 0, End: n - 1 };
    if (e.key in map) {
      e.preventDefault();
      setCh(map[e.key]);
      tabs.current[map[e.key]]?.focus();
    }
  };

  return (
    <section id="channels" className={`${v.section} ${v.dark}`} aria-labelledby="channels-title">
      <div className={`${v.inner} ${s.channels}`}>
        <div className={v.head}>
          <div className={v.col}>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="channels-title" data-rv="left" className={"disp " + v.h2}>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p data-rv="right" className={v.headP}>
            {copy.text}
          </p>
        </div>

        <div data-rv="up">
          <div role="tablist" aria-label={copy.tablistLabel} className={s.tabs}>
            {CH.map((x, i) => (
              <button
                key={x.n}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`ch-tab-${i}`}
                aria-selected={i === ch}
                aria-controls="ch-panel"
                tabIndex={i === ch ? 0 : -1}
                className={s.ctab + (i === ch ? ` ${s.on}` : "")}
                onClick={() => setCh(i)}
                onKeyDown={onKey}
              >
                {x.n}
              </button>
            ))}
          </div>
          {/* key remounts the panel so the rise-in replays on each switch */}
          <div key={ch} id="ch-panel" role="tabpanel" aria-labelledby={`ch-tab-${ch}`} className={s.cpanel}>
            <div className={`${s.cpIn} ${s.cpCopy}`}>
              <span className={"mono " + s.kind}>{copy.kinds[c.k]}</span>
              <h3 className={"disp " + s.cpH3}>{c.n}</h3>
              <p className={s.cpP}>{c.d}</p>
              <ul className={s.feats}>
                {c.f.map((f) => (
                  <li key={f} className="feat">
                    <Icon name="check" size={20} strokeWidth={2.4} style={{ color: "var(--acc2)" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${s.cpIn} ${s.mockWrap}`} data-cur="view" aria-hidden="true">
              {c.k === "store" ? <StoreMock /> : <ProductMock />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useId, useState } from "react";
import type { QA } from "@/content";

/**
 * FAQ accordion (".acc"). One item open at a time; the first is open by default, as in the design.
 * Native buttons → keyboard operable; closed panels are `inert` so hidden text isn't focusable.
 */
export function Accordion({ items, defaultOpen = 0 }: { items: QA[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();

  return (
    <div>
      {items.map((f, i) => {
        const on = i === open;
        const qid = `${uid}-q${i}`;
        const aid = `${uid}-a${i}`;
        return (
          <div key={f.q} className={on ? "acc on" : "acc"}>
            <h3 style={{ margin: 0, font: "inherit" }}>
              <button
                id={qid}
                type="button"
                className="acc-q"
                aria-expanded={on}
                aria-controls={aid}
                onClick={() => setOpen(on ? -1 : i)}
              >
                <span className="acc-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="acc-t">{f.q}</span>
                <span className="acc-ic" aria-hidden="true" />
              </button>
            </h3>
            <div id={aid} role="region" aria-labelledby={qid} className="acc-a" inert={!on}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

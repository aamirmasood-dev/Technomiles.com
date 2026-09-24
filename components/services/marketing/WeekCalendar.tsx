"use client";

import { useState } from "react";
import { servicePageExtras } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./marketing.module.css";

const extras = servicePageExtras["social-media-marketing"];
const copy = extras.copy.calendar;
/** Filter dot colours per channel kind (from the design). */
const DOT: Record<string, string> = { all: "var(--fg)", social: "var(--red)", ads: "var(--cyan)", email: "var(--acc2)", sms: "var(--amber)" };

/** Example content week; filter chips dim posts from other channels. */
export function WeekCalendar() {
  const [f, setF] = useState("all");
  return (
    <section id="week" className={v.section} aria-labelledby="week-title">
      <div className={`${v.inner} ${s.calInner}`}>
        <div className={v.head}>
          <div className={v.col}>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="week-title" data-rv="left" className={"disp " + v.h2}>
              {copy.title}
              <br />
              <span className="fillhov">{copy.titleAccent}</span>
            </h2>
          </div>
          <div data-rv="right" role="group" aria-label={copy.filterLabel} className={s.filters}>
            {copy.filters.map((x) => (
              <button key={x.k} type="button" className={s.ftab + (x.k === f ? ` ${s.on}` : "")} aria-pressed={x.k === f} onClick={() => setF(x.k)}>
                <i style={{ background: DOT[x.k] }} aria-hidden="true" />
                {x.t}
              </button>
            ))}
          </div>
        </div>
        <div data-rv="up" className={s.week}>
          {extras.weekCalendar.map((d) => (
            <div key={d.d} className={s.day}>
              <span className={"mono " + s.dayName}>{d.d.toUpperCase()}</span>
              {d.items.map((p, i) => (
                <div key={i} className={`${s.cpost} ${s[p.k] ?? ""}` + (f !== "all" && f !== p.k ? ` ${s.dim}` : "")}>
                  <span className="mono">{p.k.toUpperCase()}</span>
                  {p.t}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p data-rv="up" className={s.note}>
          {copy.note}
        </p>
      </div>
    </section>
  );
}

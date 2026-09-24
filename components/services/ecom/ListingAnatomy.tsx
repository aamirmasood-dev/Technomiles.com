"use client";

import { useState, type CSSProperties } from "react";
import { servicePageExtras } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./ecom.module.css";

const extras = servicePageExtras.ecommerce;
const copy = extras.copy.listing;
const HOT = extras.listingHotspots;

/** Highlight zones and pin positions on the mockup (% of the card), from the design. */
const ZONES: CSSProperties[] = [
  { left: "3%", top: "5%", width: "40%", height: "90%" },
  { left: "47%", top: "5%", width: "50%", height: "18%" },
  { left: "47%", top: "32%", width: "30%", height: "12%" },
  { left: "47%", top: "46%", width: "50%", height: "28%" },
  { left: "47%", top: "24%", width: "30%", height: "8%" },
];
const PINS: CSSProperties[] = [
  { left: "23%", top: "48%" },
  { left: "97%", top: "12%" },
  { left: "80%", top: "38%" },
  { left: "97%", top: "60%" },
  { left: "80%", top: "28%" },
];

const bar = (h: number, w: string) => <span className={s.bar} style={{ height: h, width: w, background: "#CFCAC0" }} />;

export function ListingAnatomy() {
  const [h, setH] = useState(0);
  return (
    <section className={v.section} aria-labelledby="listing-title">
      <div className={v.inner}>
        <div className={v.col}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="listing-title" data-rv="up" className={"disp " + v.h2}>
            {copy.title}
            <br />
            <span className="fillhov">{copy.titleAccent}</span>
          </h2>
        </div>
        <div className={s.anatomy}>
          <div data-rv="scan" className={s.listingWrap}>
            <div className={`${s.sf} ${s.listing}`} aria-hidden="true">
              <div className={s.gallery}>
                <span className={s.photo}>
                  <span />
                </span>
                <div className={s.thumbs}>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={s.details}>
                <span className={s.bar} style={{ height: 14, width: "95%", background: "#141418" }} />
                <span className={s.bar} style={{ height: 14, width: "72%", background: "#141418" }} />
                <span className={s.stars}>★★★★★</span>
                <span className={"disp " + s.price}>{extras.copy.channels.price}</span>
                {bar(8, "60%")}
                <div className={s.bullets}>
                  {bar(8, "92%")}
                  {bar(8, "84%")}
                  {bar(8, "88%")}
                  {bar(8, "70%")}
                </div>
                <div className={s.grow} />
                <span className={s.buy} />
              </div>
            </div>
            {ZONES.map((z, i) => (
              <span key={i} className={s.zone + (i === h ? ` ${s.on}` : "")} style={z} aria-hidden="true" />
            ))}
            {HOT.map((x, i) => (
              <button
                key={x.title}
                type="button"
                className={s.hs + (i === h ? ` ${s.on}` : "")}
                style={PINS[i]}
                aria-label={x.title}
                aria-pressed={i === h}
                onClick={() => setH(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div data-rv="right" className={s.hrows}>
            {HOT.map((x, i) => (
              <button key={x.title} type="button" className={s.hrow + (i === h ? ` ${s.on}` : "")} aria-expanded={i === h} onClick={() => setH(i)}>
                <span className={s.hn}>{i + 1}</span>
                <span className={s.hBody}>
                  <span className="disp">{x.title}</span>
                  <span className={s.hd}>
                    <span>{x.text}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

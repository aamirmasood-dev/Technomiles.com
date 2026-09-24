"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { getService, servicePageExtras, servicePageShared } from "@/content";
import { Crumb } from "@/components/ui/Crumb";
import { Icon } from "@/components/ui/Icon";
import { MouseParallax } from "@/components/fx/MouseParallax";
import { REDUCED_MOTION, matches } from "@/components/fx/media";
import v from "../svc.module.css";
import s from "./seo.module.css";

const svc = getService("seo");
const copy = servicePageExtras.seo.copy.hero;
const WIDTHS = ["70%", "55%", "62%", "48%", "66%"];
const ROW = 74;
const CLIMB_MS = 1400;

/** Rows keep a stable DOM order so `top` transitions animate "yourbusiness.com" climbing to #1. */
const ROWS = [{ t: copy.you, you: true, w: "80%" }, ...copy.others.map((t, i) => ({ t, you: false, w: WIDTHS[i] }))];

export function SeoHero() {
  const [rank, setRank] = useState(5);

  useEffect(() => {
    if (matches(REDUCED_MOTION)) {
      const id = requestAnimationFrame(() => setRank(0));
      return () => cancelAnimationFrame(id);
    }
    const id = setInterval(() => setRank((r) => (r <= 0 ? 5 : r - 1)), CLIMB_MS);
    return () => clearInterval(id);
  }, []);

  // Position of each row: "you" at `rank`, the others fill the remaining slots in order.
  const positions = (() => {
    const out: number[] = [];
    let slot = 0;
    ROWS.forEach((r, i) => {
      if (r.you) out[i] = rank;
      else {
        if (slot === rank) slot++;
        out[i] = slot++;
      }
    });
    return out;
  })();

  return (
    <section className={v.hero}>
      <div className={"grid-bg " + v.heroGrid} aria-hidden="true" />
      <div className="hero-sweep" aria-hidden="true" />
      <div className={v.heroGlow} aria-hidden="true" />
      <div className={`${v.heroInner} ${s.heroInner}`}>
        <div className={v.heroCopy}>
          <Crumb className="in1" current={svc.title.toUpperCase()} trail={[{ label: servicePageShared.crumbServices, href: "/services" }]} />
          <h1 className={"in2 disp " + v.h1}>
            {copy.title} <span style={{ color: "var(--acc2)" }}>{copy.titleAccent}</span>
          </h1>
          <p className={"in3 " + v.lead} style={{ maxWidth: 540 }}>
            {copy.lead}
          </p>
          <div className={"in3 " + v.btns}>
            <Link className="btn btn-red mag" href="/contact">
              {copy.ctaPrimary} <Icon name="arrow" />
            </Link>
            <a className="btn btn-ghost mag" href="#audit">
              {copy.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="in4" style={{ position: "relative" }} aria-hidden="true">
          <MouseParallax className={s.serpWrap}>
            <div data-cur="view" style={{ display: "contents" }}>
              <div className={s.sbar}>
                <Icon name="search" size={20} strokeWidth={2.2} style={{ color: "#141418" }} />
                <span className={s.qtype} style={{ "--qlen": `${copy.query.length}ch` } as CSSProperties}>
                  {copy.query}
                </span>
              </div>
              <ol className={s.results}>
                {ROWS.map((r, i) => (
                  <li key={r.t} className={s.res + (r.you ? ` ${s.you}` : "")} style={{ top: positions[i] * ROW }}>
                    <span className={s.rk}>#{positions[i] + 1}</span>
                    <div className={s.resText}>
                      <span style={{ color: r.you ? "var(--fg)" : "var(--muted)" }}>{r.t}</span>
                      <span className={s.sk} style={{ width: r.w }} />
                    </div>
                    {r.you && <span className={"mono " + s.climb}>{copy.climbing}</span>}
                  </li>
                ))}
              </ol>
            </div>
          </MouseParallax>
        </div>
      </div>
    </section>
  );
}

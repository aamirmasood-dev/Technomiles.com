"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { Testimonial } from "@/content";
import { Icon } from "@/components/ui/Icon";
import s from "./Testimonials.module.css";

const AUTOPLAY_MS = 6500;

export function TestimonialStack({ items, intro }: { items: Testimonial[]; intro: ReactNode }) {
  const n = items.length;
  const [t, setT] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Autoplay; restarts after any manual change. Off for reduced motion and hidden tabs.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const id = setTimeout(() => {
      if (!document.hidden) setT((x) => (x + 1) % n);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [t, paused, n]);

  const go = (i: number, focus = false) => {
    const next = (i + n) % n;
    setT(next);
    if (focus) tabsRef.current[next]?.focus();
  };

  // Roving tabindex for the dot tabs: ←/→, Home, End.
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const map: Record<string, number> = { ArrowRight: t + 1, ArrowLeft: t - 1, Home: 0, End: n - 1 };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  };

  return (
    <div className={s.grid}>
      <div className={s.intro}>
        {intro}
        <div data-rv="up" className={s.controls}>
          <div className="tdots" role="tablist" aria-label="Testimonials">
            {items.map((c, i) => (
              <button
                key={i}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tdot-${i}`}
                aria-selected={i === t}
                aria-controls={`tcard-${i}`}
                aria-label={c.company}
                tabIndex={i === t ? 0 : -1}
                className={i === t ? "tdot on" : "tdot"}
                onClick={() => go(i)}
                onKeyDown={onTabKey}
              >
                {c.initials}
              </button>
            ))}
          </div>
        </div>
        <div data-rv="up" className={s.arrows}>
          <button type="button" className="arrow mag" aria-label="Previous testimonial" onClick={() => go(t - 1)}>
            <Icon name="arrowLeft" size={20} />
          </button>
          <button type="button" className="arrow mag" aria-label="Next testimonial" onClick={() => go(t + 1)}>
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>

      <div
        data-rv="scale"
        className={"stack " + s.stack}
        data-cur="view"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {items.map((c, i) => {
          const off = (i - t + n) % n;
          return (
            <figure
              key={i}
              id={`tcard-${i}`}
              role="tabpanel"
              aria-labelledby={`tdot-${i}`}
              aria-hidden={off !== 0}
              className={`tcd p${off}`}
              style={{ margin: 0 }}
            >
              <svg width="64" height="50" viewBox="0 0 56 44" fill="var(--red)" aria-hidden="true">
                <path d="M0 44V26C0 11 8 2 22 0l2 7c-8 2-12 8-12 15h10v22H0zm32 0V26c0-15 8-24 22-26l2 7c-8 2-12 8-12 15h10v22H32z" />
              </svg>
              <blockquote className="qt">{c.quote}</blockquote>
              <figcaption className={s.cap}>
                <span className="av-ring">
                  <span>{c.initials}</span>
                </span>
                <span className={s.who}>
                  <span className="disp">{c.name}</span>
                  <span>
                    {c.role}, {c.company}
                  </span>
                </span>
                <span className={"mono " + s.count}>
                  <span>{String(i + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { REDUCED_MOTION, matches } from "@/components/fx/media";
import s from "./home.module.css";

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/**
 * Intro paragraph whose words light up one by one while scrolling.
 * Progress is measured on the enclosing section (`sectionId`), as in the design.
 */
export function IntroWords({ text, highlight, sectionId }: { text: string; highlight: string[]; sectionId: string }) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const hl = new Set(highlight);

  useEffect(() => {
    const p = pRef.current;
    const section = document.getElementById(sectionId);
    if (!p || !section) return;
    const ws = Array.from(p.querySelectorAll<HTMLElement>("[data-w]"));
    const light = (n: number) =>
      ws.forEach((w, i) => (i < n ? w.setAttribute("data-lit", "") : w.removeAttribute("data-lit")));

    if (matches(REDUCED_MOTION)) {
      light(ws.length);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -vh || r.top > vh * 2) return;
      light(Math.floor(clamp01((vh * 0.85 - r.top) / (r.height * 0.6)) * ws.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionId]);

  return (
    <p ref={pRef} className={"disp " + s.introText}>
      {words.map((w, i) => (
        <span key={i} data-w="" className={hl.has(w) ? `${s.iw} ${s.hl}` : s.iw}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

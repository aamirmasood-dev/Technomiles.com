"use client";

import { useEffect } from "react";
import { FINE_POINTER, REDUCED_MOTION, matches } from "./media";

/**
 * Magnetic buttons (.mag) and tilt cards (.tilt, which also get --mx/--my for the glare).
 * A single delegated listener for the whole site, applied once per frame.
 */
export function InteractionFx() {
  useEffect(() => {
    if (!matches(FINE_POINTER) || matches(REDUCED_MOTION)) return;
    let magEl: HTMLElement | null = null;
    let tiltEl: HTMLElement | null = null;
    let last: MouseEvent | null = null;
    let raf = 0;

    const apply = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const t = e.target instanceof Element ? e.target : null;

      const m = (t?.closest(".mag") as HTMLElement | null) ?? null;
      if (m !== magEl) {
        if (magEl) magEl.style.transform = "";
        magEl = m;
      }
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
      }

      const c = (t?.closest(".tilt") as HTMLElement | null) ?? null;
      if (c !== tiltEl) {
        if (tiltEl) tiltEl.style.transform = "";
        tiltEl = c;
      }
      if (c) {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        c.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) translateY(-6px)`;
        c.style.setProperty("--mx", `${px * 100}%`);
        c.style.setProperty("--my", `${py * 100}%`);
      }
    };

    const onMove = (e: MouseEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const reset = () => {
      if (magEl) magEl.style.transform = "";
      if (tiltEl) tiltEl.style.transform = "";
      magEl = tiltEl = null;
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) reset();
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      reset();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return null;
}

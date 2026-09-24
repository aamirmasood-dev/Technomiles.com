"use client";

import { useEffect, useState } from "react";
import { LogoSlot } from "@/components/ui/LogoSlot";
import { PRELOADER_KEY } from "@/lib/preloader";

/**
 * Homepage preloader: 000→100% counter, bar, split-panel exit. Shown once per session.
 * On repeat visits an inline <head> script (see app/layout.tsx) adds `pre-skip ready` to <html>
 * before first paint, so it never flashes. When it finishes it adds `ready`, which starts the hero load-in.
 */
export function Preloader() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"run" | "out" | "gone">("run");

  useEffect(() => {
    const root = document.documentElement;
    const finish = () => {
      root.classList.add("ready", "pre-skip");
      try {
        sessionStorage.setItem(PRELOADER_KEY, "1");
      } catch {}
    };
    const skip =
      root.classList.contains("pre-skip") || window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (skip) {
      finish();
      const id = requestAnimationFrame(() => setPhase("gone"));
      return () => cancelAnimationFrame(id);
    }

    root.classList.remove("ready");
    let p = 0;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      p = Math.min(100, p + 2 + Math.floor(Math.random() * 6));
      setPct(p);
      if (p >= 100) {
        clearInterval(iv);
        t1 = setTimeout(() => {
          setPhase("out");
          root.classList.add("ready");
        }, 250);
        t2 = setTimeout(() => {
          setPhase("gone");
          finish();
        }, 1400);
      }
    }, 40);
    return () => {
      clearInterval(iv);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={phase === "out" ? "pre out" : "pre"} aria-hidden="true">
      <div className="half t" />
      <div className="half b" />
      <div className="pc">
        <div style={{ position: "relative", width: 260, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="pre-ring" />
          <LogoSlot width={180} height={56} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div className="disp" style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
            {String(pct).padStart(3, "0")}
            <span style={{ color: "var(--red)" }}>%</span>
          </div>
          <div className="pre-bar">
            <span style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <div className="mono" style={{ fontSize: 12, letterSpacing: ".24em", color: "var(--muted)" }}>
            INITIALIZING<span className="blink">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}

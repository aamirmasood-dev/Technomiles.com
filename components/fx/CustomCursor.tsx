"use client";

import { useEffect, useRef } from "react";
import { FINE_POINTER, REDUCED_MOTION, matches } from "./media";

/**
 * Red dot + lagging ring + soft glow. One rAF loop, one delegated mousemove.
 * Ring states (data-s): "link" over links/buttons, "view" over [data-cur="view"], "down" while pressed.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matches(FINE_POINTER) || matches(REDUCED_MOTION)) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const glow = glowRef.current!;
    const root = document.documentElement;
    root.classList.add("cc");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my, gx = mx, gy = my;
    let raf = 0;

    const setState = (st: string) => {
      if (ring.getAttribute("data-s") !== st) ring.setAttribute("data-s", st);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;
      let st = "";
      const hit = t.closest("[data-cur], a, button, input, select, textarea, label");
      if (hit) {
        const cur = hit.getAttribute("data-cur");
        st = cur && !t.closest("a, button") ? cur : "link";
      }
      if (t.closest("input, textarea, select")) st = "";
      setState(st);
    };
    const onDown = () => setState("down");
    const onUp = (e: MouseEvent) => onMove(e);
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      gx += (mx - gx) * 0.07;
      gy += (my - gy) * 0.07;
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      glow.style.transform = `translate3d(${gx}px,${gy}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("cc");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cur-glow" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true">
        <i />
        <b>VIEW</b>
      </div>
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
    </>
  );
}

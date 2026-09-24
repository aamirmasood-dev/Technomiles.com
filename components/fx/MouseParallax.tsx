"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { FINE_POINTER, REDUCED_MOTION, matches } from "./media";

/** Shifts its content opposite to the mouse (design: ±15px, eased by a CSS transition). Desktop only. */
export function MouseParallax({ children, strength = 30, className, style }: { children: ReactNode; strength?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matches(FINE_POINTER) || matches(REDUCED_MOTION)) return;
    let raf = 0;
    let mx = 0.5;
    let my = 0.5;
    const apply = () => {
      raf = 0;
      if (ref.current) ref.current.style.transform = `translate3d(${(mx - 0.5) * -strength}px,${(my - 0.5) * -strength}px,0)`;
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

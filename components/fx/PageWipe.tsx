"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { wipeLabel } from "@/lib/routes";

/**
 * Red-then-black vertical wipe that plays when an inner page mounts.
 * Rendered from app/template.tsx so it re-runs on every navigation. Not used on "/".
 * Server-rendered visible; a CSS failsafe + <noscript> rule guarantee it never sticks.
 */
export function PageWipe() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"cover" | "leaving" | "done">("cover");

  // Inner pages: hero load-in (.in1–.in4) waits for `ready`, added 800ms in, as in the design.
  useEffect(() => {
    if (pathname === "/") return;
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      root.classList.add("ready");
      const id = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(id);
    }
    root.classList.remove("ready");
    const t1 = setTimeout(() => setPhase("leaving"), 350);
    const t2 = setTimeout(() => root.classList.add("ready"), 800);
    const t3 = setTimeout(() => setPhase("done"), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      root.classList.add("ready");
    };
  }, [pathname]);

  if (pathname === "/" || phase === "done") return null;
  const label = wipeLabel(pathname);

  return (
    <div className={"wipe" + (phase === "leaving" ? " gone" : "")} aria-hidden="true">
      <i className="r" />
      <i className="k">{label && <span className="wipe-t">TECHNOMILES — {label}</span>}</i>
    </div>
  );
}

"use client";

import { useEffect } from "react";

const SELECTOR = "[data-rv]:not([data-in]), .lbl:not([data-in])";

/**
 * Scroll reveals. Adds `.rvon` to <html> once JS runs (so content is never hidden without JS),
 * then one IntersectionObserver sets `data-in` on each [data-rv] / .lbl the first time it enters.
 * A MutationObserver picks up content added later (route changes, lazy sections).
 */
export function RevealRoot() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const seen = new WeakSet<Element>();
    const onEnter: IntersectionObserverCallback = (entries, obs) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.setAttribute("data-in", "");
          obs.unobserve(en.target);
        }
      }
    };
    const rootMargin = "0px 0px -8% 0px";
    const io = new IntersectionObserver(onEnter, { threshold: 0.12, rootMargin });
    // "wipe"/"scan" start fully clipped, and IntersectionObserver honours the target's own
    // clip-path — their visible ratio is always 0, so they need threshold 0 to ever fire.
    const ioClip = new IntersectionObserver(onEnter, { threshold: 0, rootMargin });
    const isClipped = (el: Element) => {
      const v = el.getAttribute("data-rv");
      return v === "wipe" || v === "scan" || el.classList.contains("lbl");
    };
    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          (isClipped(el) ? ioClip : io).observe(el);
        }
      });
    };
    scan();
    root.classList.add("rvon");

    let raf = 0;
    const mo = new MutationObserver(() => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          scan();
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
      ioClip.disconnect();
      root.classList.remove("rvon");
    };
  }, []);

  return null;
}

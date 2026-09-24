"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { THEME_KEY } from "@/lib/theme";
import s from "./ThemeToggle.module.css";

/* The <html> class is the single source of truth; every toggle instance subscribes to it. */
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
};
const getSnapshot = () => document.documentElement.classList.contains("theme-dark");
const getServerSnapshot = () => false;

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("theme-dark", dark);
  // Two theme-color metas: enable the active one, disable the other.
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"][data-theme]').forEach((m) => {
    m.media = m.dataset.theme === (dark ? "dark" : "light") ? "all" : "not all";
  });
}

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const next = !isDark;
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {}
    const apply = () => applyTheme(next);

    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    // Circular reveal from the click point (keyboard clicks start from the button centre).
    const r0 = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || r0.left + r0.width / 2;
    const y = e.clientY || r0.top + r0.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document
      .startViewTransition(() => {
        flushSync(apply);
      })
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(.77,0,.18,1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      className={s.toggle + (className ? " " + className : "")}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onClick}
    >
      <span className={s.knob} aria-hidden="true" />
      <svg className={s.sun} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className={s.moon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}

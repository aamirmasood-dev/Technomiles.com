"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { home, services } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { FINE_POINTER, REDUCED_MOTION, matches } from "@/components/fx/media";
import { ACCENT_VAR } from "@/lib/theme";
import s from "./home.module.css";

/** Orbit-chip positions and bob classes, from the design. */
const CHIP_LAYOUT: { pos: CSSProperties; bob: string }[] = [
  { pos: { left: "7%", top: "22%" }, bob: "bob1" },
  { pos: { right: "8%", top: "18%" }, bob: "bob2" },
  { pos: { left: "4%", top: "56%" }, bob: "bob3" },
  { pos: { right: "4%", top: "52%" }, bob: "bob1" },
  { pos: { left: "22%", top: "8%" }, bob: "bob2" },
];

const ROTATE_MS = 2400;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export function Hero() {
  const { hero, heroRotatingWords: words, heroSub } = home;
  const [rot, setRot] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const eclRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  // Rotating word slot.
  useEffect(() => {
    if (matches(REDUCED_MOTION)) return;
    const id = setInterval(() => setRot((r) => (r + 1) % words.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [words.length]);

  // Scroll-linked exit: text zooms + blurs out, floor sinks, ring rises.
  useEffect(() => {
    if (matches(REDUCED_MOTION)) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const hero = heroRef.current;
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      if (r.bottom < 0) return;
      const p = clamp01(-r.top / r.height);
      const text = textRef.current;
      if (text) {
        text.style.transform = `translate3d(0,${-p * 120}px,0) scale(${1 + p * 0.5})`;
        text.style.opacity = String(1 - p * 1.6);
        text.style.filter = p > 0 ? `blur(${p * 12}px)` : "";
      }
      if (floorRef.current) floorRef.current.style.transform = `translate3d(0,${p * 120}px,0) scaleY(${1 + p * 0.6})`;
      if (eclRef.current) eclRef.current.style.transform = `translate3d(0,${-p * 260}px,0) scale(${1 + p * 1.2})`;
      if (footRef.current) footRef.current.style.opacity = String(1 - p * 3);
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
  }, []);

  // Mouse parallax on the orbiting chips (desktop only).
  useEffect(() => {
    if (!matches(FINE_POINTER) || matches(REDUCED_MOTION)) return;
    let raf = 0;
    let mx = 0.5;
    let my = 0.5;
    const apply = () => {
      raf = 0;
      if (orbRef.current) orbRef.current.style.transform = `translate3d(${(mx - 0.5) * -30}px,${(my - 0.5) * -30}px,0)`;
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
  }, []);

  return (
    <section ref={heroRef} className={s.hWrap} aria-labelledby="hero-title">
      <div className={s.hSky} />
      <div className={"grid-bg " + s.hGrid} />
      <div ref={floorRef} className={s.floor}>
        <div className={s.floorG} />
      </div>
      <div ref={eclRef} className={s.eclipse} />

      <div ref={orbRef} className={s.orbit}>
        {hero.chips.map((chip, i) => {
          const svc = services.find((x) => x.slug === chip.slug)!;
          return (
            <Link
              key={chip.slug}
              href={svc.route}
              className={`${s.orbitChip} ${CHIP_LAYOUT[i].bob}`}
              style={{ ...CHIP_LAYOUT[i].pos, "--c": ACCENT_VAR[svc.slug] } as CSSProperties}
            >
              <i />
              {chip.label}
            </Link>
          );
        })}
      </div>

      <div ref={textRef} className={s.hText}>
        <div className="in1 h-meta">
          <b />
          {hero.meta}
          <b />
        </div>
        <h1 id="hero-title" className={"disp " + s.hTitle}>
          <span className={s.ln}>
            <span>{hero.titleLead}</span>
          </span>
          <span className={`${s.ln} ${s.l2}`}>
            <span>
              {/* Screen readers get a stable sentence; the slot is visual only. */}
              <span className="sr">{words.join(" ").replace(/\.(?=\s)/g, ",")}</span>
              <span className={s.slot} aria-hidden="true">
                <span className={s.slotIn} style={{ transform: `translateY(-${rot * 1.02}em)` }}>
                  {words.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </span>
              </span>
            </span>
          </span>
        </h1>
        <p className={"in3 " + s.hSub}>{heroSub}</p>
        <div className={"in3 " + s.hBtns}>
          <Link className="btn btn-red mag" href="/contact">
            {hero.ctaPrimary} <Icon name="arrow" />
          </Link>
          <a className="btn btn-ghost mag" href="#services">
            {hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Outer fades on scroll; inner runs the load-in (an animation would override inline opacity). */}
      <div ref={footRef} className={s.hFoot}>
        <div className={"in3 " + s.hFootIn}>
          <span className="mono">{hero.scrollHint}</span>
          <span className="mono">
            <span className="live" />
            {hero.status}
          </span>
        </div>
      </div>
    </section>
  );
}

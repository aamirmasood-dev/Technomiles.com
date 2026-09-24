"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import s from "./home.module.css";

const MOBILE = "(max-width:640px)";
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Pinned horizontal process: the section is 340vh tall, the inner `.pin` is sticky, and the
 * track translates with scroll progress. On ≤640px it's a plain vertical list (CSS) and the
 * scroll effect is switched off.
 */
export function Process() {
  const steps = home.process;
  const copy = home.sections.process;
  const total = steps.length;
  const [step, setStep] = useState(1);
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-step]"));
    const mq = window.matchMedia(MOBILE);
    let raf = 0;
    let maxX = 0;
    let current = 0;

    const measure = () => {
      maxX = Math.max(0, track.scrollWidth - window.innerWidth);
    };
    const update = () => {
      raf = 0;
      if (mq.matches) return;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = clamp01(-r.top / (r.height - vh));
      track.style.transform = `translate3d(${-p * maxX}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const st = Math.min(total, Math.max(1, Math.round(p * (total - 1)) + 1));
      if (st !== current) {
        current = st;
        cards.forEach((c, i) => (i === st - 1 ? c.setAttribute("data-on", "") : c.removeAttribute("data-on")));
        setStep(st);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      if (mq.matches) {
        track.style.transform = "";
        cards.forEach((c) => c.removeAttribute("data-on"));
        current = 0;
      }
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    mq.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onResize);
    };
  }, [total]);

  return (
    <section ref={secRef} id="process" className={s.process} aria-labelledby="process-title">
      <div className={s.pin}>
        <div className={"grid-bg " + s.pinGrid} aria-hidden="true" />
        <div className={s.pHead}>
          <div className={s.secHeadL}>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="process-title" className={"disp " + s.pH2}>
              {copy.title} <span style={{ color: "var(--red)" }}>{copy.titleAccent}</span>
            </h2>
          </div>
          <div className={s.pStep} aria-hidden="true">
            <span className="disp">
              {pad(step)}
              <span>/{pad(total)}</span>
            </span>
            <span className="mono">{steps[step - 1].title.toUpperCase()}</span>
          </div>
        </div>

        <ol ref={trackRef} className={s.ptrack} style={{ listStyle: "none", margin: 0 }}>
          <li className={s.pSpacer} aria-hidden="true" />
          {steps.map((st, i) => (
            <li key={st.title} className={s.pcard} data-step="">
              <div className={s.pTop}>
                <span className={"disp " + s.pnum} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span className="mono">
                  STEP {pad(i + 1)}/{pad(total)}
                </span>
              </div>
              <div className={s.pBody}>
                <h3 className={"disp " + s.pT} style={{ margin: 0 }}>
                  {st.title}
                </h3>
                <span className={s.pD}>{st.text}</span>
                <div className={s.pch}>
                  {st.chips.map((c) => (
                    <i key={c}>{c}</i>
                  ))}
                </div>
              </div>
            </li>
          ))}
          <li style={{ display: "contents" }}>
            <Link className={`${s.pcard} ${s.pFinal}`} href="/contact">
              <span className="mono">{copy.finalLabel}</span>
              <div className={s.pFinalBody}>
                <span className="disp">{copy.finalTitle}</span>
                <span>
                  {copy.finalCta} <Icon name="arrow" />
                </span>
              </div>
            </Link>
          </li>
          <li className={s.pSpacerEnd} aria-hidden="true" />
        </ol>

        <div className={s.pbarWrap} aria-hidden="true">
          <div className={s.pbar}>
            <span ref={barRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

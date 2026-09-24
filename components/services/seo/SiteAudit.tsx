"use client";

import { useEffect, useRef, useState } from "react";
import { servicePageExtras } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./seo.module.css";

const extras = servicePageExtras.seo;
const copy = extras.copy.audit;
const CHECKS = extras.auditChecks;
const STEP_MS = 650;
const CIRC = 465; // 2πr for r=74

/** Demo audit: "Run" ticks through the checks and fills the score ring. Nothing is fetched. */
export function SiteAudit() {
  const [done, setDone] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const run = () => {
    if (running) return;
    setDone(0);
    setRunning(true);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDone((d) => {
        const n = d + 1;
        if (n >= CHECKS.length) {
          if (timer.current) clearInterval(timer.current);
          setRunning(false);
          return CHECKS.length;
        }
        return n;
      });
    }, STEP_MS);
  };

  const total = CHECKS.length;
  const label = running ? copy.running : done === total ? copy.again : copy.run;
  const msg = done === total ? copy.msgDone : running ? copy.msgRunning : copy.msgIdle;

  return (
    <section id="audit" className={`${v.section} ${v.dark}`} aria-labelledby="audit-title">
      <div className={s.auditGrid}>
        <div className={s.auditCopy}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="audit-title" data-rv="left" className={"disp " + v.h2}>
            {copy.title}
          </h2>
          <p data-rv="left">{copy.text}</p>
          <span data-rv="left" className={"mono " + s.auditNote}>
            {copy.note}
          </span>
        </div>
        <div data-rv="scan" className={s.auditCard}>
          <div className={s.auditList}>
            <div className={s.urlRow}>
              <label htmlFor="aurl" className="sr">
                {copy.urlLabel}
              </label>
              <input id="aurl" className="field" type="text" defaultValue={copy.urlDefault} />
              <button type="button" className={"btn btn-red mag " + s.runBtn} onClick={run} aria-busy={running}>
                {label}
              </button>
            </div>
            <ul className={s.checks}>
              {CHECKS.map((c, i) => (
                <li key={c} className={s.aud + (i < done ? ` ${s.ok}` : running && i === done ? ` ${s.run}` : "")}>
                  <span className={s.st} aria-hidden="true">
                    <Icon name="check" size={14} strokeWidth={3.5} style={{ color: "var(--bg)" }} />
                  </span>
                  <span>{c}</span>
                  <span className={s.bar} aria-hidden="true">
                    <span />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.score}>
            <div className={s.ringWrap}>
              <svg width="170" height="170" viewBox="0 0 170 170" aria-hidden="true">
                <circle cx="85" cy="85" r="74" fill="none" stroke="rgba(var(--ink),.08)" strokeWidth="10" />
                <circle
                  className={s.ring}
                  cx="85"
                  cy="85"
                  r="74"
                  fill="none"
                  stroke="var(--acc2)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC - (CIRC * done) / total}
                />
              </svg>
              <div className={s.ringText}>
                <span className="disp">
                  {done}/{total}
                </span>
                <span className="mono">{copy.checksLabel}</span>
              </div>
            </div>
            <span className={"mono " + s.auditMsg} role="status">
              {msg}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

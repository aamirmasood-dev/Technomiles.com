import type { CSSProperties } from "react";
import { servicePageExtras } from "@/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./ecom.module.css";

const extras = servicePageExtras.ecommerce;
const copy = extras.copy.journey;
const ICONS: IconName[] = ["loader", "list", "arrow", "clock", "trend"];

export function Journey() {
  return (
    <section className={`${v.section} ${v.dark}`} style={{ borderBottom: 0 }} aria-labelledby="journey-title">
      <div className={"grid-bg " + v.bgGrid} aria-hidden="true" />
      <div className={v.inner}>
        <div className={v.col}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="journey-title" data-rv="up" className={"disp " + v.h2}>
            {copy.title}
          </h2>
        </div>
        <ol className={s.journey}>
          {extras.journey.map((j, i) => (
            <li key={j.title} className={s.jr} data-rv="up" style={{ "--d": `${i * 0.1}s` } as CSSProperties}>
              <div className={s.jrTop}>
                <span className={s.jrI}>
                  <Icon name={ICONS[i] ?? "check"} size={22} strokeWidth={1.8} />
                </span>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <span className={"disp " + s.jrT}>{j.title}</span>
              <span className={s.jrD}>{j.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

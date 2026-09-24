import Link from "next/link";
import { Fragment } from "react";
import { getService, servicePageExtras, servicePageShared } from "@/content";
import { Crumb } from "@/components/ui/Crumb";
import { Icon } from "@/components/ui/Icon";
import { MouseParallax } from "@/components/fx/MouseParallax";
import v from "../svc.module.css";
import s from "./design.module.css";

const svc = getService("design-studio");
const copy = servicePageExtras["design-studio"].copy.hero;

/** Each letter is its own hover target (".lt"); spaces stay plain text. */
function Letters({ text }: { text: string }) {
  return text.split("").map((ch, i) =>
    ch === " " ? (
      <Fragment key={i}> </Fragment>
    ) : (
      <span key={i} className={s.lt}>
        {ch}
      </span>
    ),
  );
}

export function DesignHero() {
  const [l1, l2, l3] = copy.lines;
  return (
    <section className={v.hero}>
      <div className={"grid-bg " + v.heroGrid} aria-hidden="true" />
      <div className={s.heroInner}>
        <div className={"in1 " + s.heroTop}>
          <Crumb current={svc.title.toUpperCase()} trail={[{ label: servicePageShared.crumbServices, href: "/services" }]} />
          <span className="mono">{copy.meta}</span>
        </div>

        <MouseParallax className={"in2 " + s.stage}>
          <div data-cur="view">
            <h1 className={"disp " + s.h1}>
              <span className="sr">{copy.lines.join(" ")}</span>
              <span className={s.word} aria-hidden="true">
                <Letters text={l1} />
              </span>
              <span className={`${s.word} ${s.outline}`} aria-hidden="true">
                <Letters text={l2} />
              </span>
              <span className={s.word} aria-hidden="true">
                <span className={s.sel}>
                  <span className={s.selTag}>{copy.selTag}</span>
                  <span className={s.hd} style={{ left: -20, top: -12 }} />
                  <span className={s.hd} style={{ right: -20, top: -12 }} />
                  <span className={s.hd} style={{ left: -20, bottom: -12 }} />
                  <span className={s.hd} style={{ right: -20, bottom: -12 }} />
                  <span style={{ color: "var(--red)" }}>
                    <Letters text={l3} />
                  </span>
                </span>
              </span>
            </h1>
            <div className={s.cursorX} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--red)">
                <path d="M3 2l7 19 2.5-8.5L21 10z" />
              </svg>
              <span>{copy.cursorLabel}</span>
            </div>
            <svg className={s.pen} width="360" height="220" viewBox="0 0 360 220" aria-hidden="true">
              <path className={s.cv} d="M20 180 C80 20 200 20 240 110 S330 200 340 60" fill="none" stroke="#5B8CFF" strokeWidth="2.5" />
              <circle cx="20" cy="180" r="6" fill="#fff" stroke="#5B8CFF" strokeWidth="2" />
              <circle cx="240" cy="110" r="6" fill="#fff" stroke="#5B8CFF" strokeWidth="2" />
              <circle cx="340" cy="60" r="6" fill="#fff" stroke="#5B8CFF" strokeWidth="2" />
              <line x1="190" y1="60" x2="290" y2="160" stroke="#5B8CFF" strokeWidth="1" opacity=".6" />
              <circle cx="190" cy="60" r="4" fill="#5B8CFF" />
              <circle cx="290" cy="160" r="4" fill="#5B8CFF" />
            </svg>
          </div>
        </MouseParallax>

        <div className={"in3 " + s.heroFoot}>
          <p className={s.heroLead}>
            {svc.lead} {copy.leadSuffix}
          </p>
          <div className={s.heroCta}>
            <div className={s.swatches} aria-hidden="true">
              {["var(--red)", "#F4F1EC", "var(--amber)", "#5B8CFF"].map((c) => (
                <span key={c} className={s.sw} style={{ background: c }} />
              ))}
            </div>
            <Link className="btn btn-red mag" href="/contact">
              {copy.cta} <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

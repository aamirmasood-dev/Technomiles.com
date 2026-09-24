import Link from "next/link";
import { getService, servicePageExtras, servicePageShared } from "@/content";
import { Crumb } from "@/components/ui/Crumb";
import { Icon } from "@/components/ui/Icon";
import { MouseParallax } from "@/components/fx/MouseParallax";
import v from "../svc.module.css";
import s from "./ecom.module.css";

const svc = getService("ecommerce");
const extras = servicePageExtras.ecommerce;
const copy = extras.copy.hero;

function FeedGroup({ hidden }: { hidden?: boolean }) {
  return (
    <div className={s.feedGroup} aria-hidden={hidden || undefined}>
      {extras.activityFeed.map((e, i) => (
        <div key={i} className={s.ev}>
          <span className={s.evB}>{e.badge}</span>
          <div className={s.evText}>
            <span>{e.event}</span>
            <span className="mono">{e.platform.toUpperCase()}</span>
          </div>
          <span className={"mono " + s.evTime}>{e.time}</span>
        </div>
      ))}
    </div>
  );
}

export function EcomHero() {
  return (
    <section className={v.hero}>
      <div className={"grid-bg " + v.heroGrid} aria-hidden="true" />
      <div className="hero-sweep" aria-hidden="true" />
      <div className={v.heroGlow} aria-hidden="true" />
      <div className={`${v.heroInner} ${s.heroInner}`}>
        <div className={v.heroCopy}>
          <Crumb className="in1" current={svc.title.toUpperCase()} trail={[{ label: servicePageShared.crumbServices, href: "/services" }]} />
          <h1 className={"in2 disp " + v.h1}>
            {copy.title}
            <br />
            {copy.titleLine2} <span style={{ color: "var(--acc2)" }}>{copy.titleAccent}</span>
          </h1>
          <p className={"in3 " + v.lead}>{copy.lead}</p>
          <div className={"in3 " + v.btns}>
            <Link className="btn btn-red mag" href="/contact">
              {copy.ctaPrimary} <Icon name="arrow" />
            </Link>
            <a className="btn btn-ghost mag" href="#channels">
              {copy.ctaSecondary}
            </a>
          </div>
          <div className={"in3 " + s.pills}>
            {extras.channels.map((c) => (
              <span key={c.n} className={s.pill}>
                {c.n.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="in4" style={{ position: "relative" }}>
          <MouseParallax className={v.parallax}>
            <div className={"mono " + s.feedHead}>
              <span>{copy.activityLabel}</span>
              <span>
                <span className="live" aria-hidden="true" />
                {copy.live}
              </span>
            </div>
            <div className={s.feed} data-cur="view">
              <div className={s.feedIn}>
                <FeedGroup />
                <FeedGroup hidden />
              </div>
            </div>
          </MouseParallax>
        </div>
      </div>
    </section>
  );
}

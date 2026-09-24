import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { home, services, type ServiceSlug } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ACCENT_VAR } from "@/lib/theme";
import s from "./home.module.css";

/* ---------- mini animations, one per service (decorative) ---------- */

function CodeVis() {
  // Syntax-highlighted code art, verbatim from the design.
  const lines: ReactNode[] = [
    <>
      <span className={s.k1}>import</span>
      <span className={s.k4}> {"{ erp, pos, lms }"} </span>
      <span className={s.k1}>from</span>
      <span className={s.k2}> &apos;@technomiles&apos;</span>
    </>,
    <>
      <span className={s.k1}>const</span>
      <span className={s.k4}> app = </span>
      <span className={s.k3}>build</span>
      <span className={s.k4}>(</span>
      <span className={s.k2}>&apos;your-business&apos;</span>
      <span className={s.k4}>)</span>
    </>,
    <>
      <span className={s.k1}>await</span>
      <span className={s.k4}> app.</span>
      <span className={s.k3}>connect</span>
      <span className={s.k4}>([erp, pos, lms])</span>
    </>,
    <>
      <span className={s.k1}>await</span>
      <span className={s.k4}> app.</span>
      <span className={s.k3}>deploy</span>
      <span className={s.k4}>() </span>
      <span className={s.ok}>{"// ✓ live"}</span>
    </>,
  ];
  return (
    <div className={`${s.vis} ${s.visCode}`}>
      {lines.map((l, i) => (
        <div key={i} className={s.codeL} style={{ "--i": i } as CSSProperties}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          {l}
        </div>
      ))}
    </div>
  );
}

function FeedVis() {
  const feed = [...home.bento.feed, ...home.bento.feed];
  return (
    <div className={s.vis}>
      <div className={s.feedv}>
        <div className={s.feedvIn}>
          {feed.map((f, i) => (
            <div key={i} className={s.fe}>
              <i>{f.badge}</i>
              {f.event}
              <span>{f.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesignVis() {
  return (
    <div className={`${s.vis} ${s.visDesign}`}>
      <span className={`${s.dzC} ${s.dzA}`} />
      <span className={`${s.dzC} ${s.dzB}`} />
      <span className={"disp " + s.dzAa}>Aa</span>
      <div className={s.dzSw}>
        <span style={{ background: "#E0192F" }} />
        <span style={{ background: "#141418" }} />
        <span style={{ background: "var(--amber)" }} />
      </div>
    </div>
  );
}

const HEART = "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z";
const HEARTS = [
  { left: "70%", delay: "0s", size: 20, fill: "var(--red)" },
  { left: "82%", delay: "1.1s", size: 14, fill: "var(--violet)" },
  { left: "76%", delay: "2.2s", size: 18, fill: "var(--fg)" },
  { left: "88%", delay: "0.6s", size: 12, fill: "var(--red)" },
];

function SocialVis() {
  return (
    <div className={`${s.vis} ${s.visSocial}`}>
      <span className={s.socImg} />
      <div className={s.socLines}>
        <div className={s.socHead}>
          <span className={s.socAv} />
          <span className={s.sk} style={{ width: "60%" }} />
        </div>
        <span className={s.sk} style={{ width: "90%" }} />
        <span className={s.sk} style={{ width: "70%" }} />
      </div>
      {HEARTS.map((h, i) => (
        <span key={i} className={s.heart2} style={{ left: h.left, animationDelay: h.delay }}>
          <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill={h.fill} aria-hidden="true">
            <path d={HEART} />
          </svg>
        </span>
      ))}
    </div>
  );
}

const BARS = [18, 26, 22, 38, 34, 52, 66, 96];

function SeoVis() {
  const b = home.bento;
  return (
    <div className={`${s.vis} ${s.visSeo}`}>
      <div className={s.seoCol}>
        <div className={s.seoQ}>
          <Icon name="search" size={16} style={{ color: "#141418" }} />
          {b.seoQuery}
        </div>
        <div className={s.seoR}>
          <span className="mono">#1</span>
          <span>{b.seoDomain}</span>
          <span className="mono">{b.seoTag}</span>
        </div>
      </div>
      <div className={s.rkBars}>
        {BARS.map((h, i) => (
          <span
            key={i}
            className={s.rkBar + (i === BARS.length - 1 ? ` ${s.rkTop}` : "")}
            style={{ height: `${h}%`, "--i": i } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- grid ---------- */

const CARDS: Record<ServiceSlug, { vis: () => ReactNode; span?: string; d: number }> = {
  "custom-development": { vis: CodeVis, span: s.span2c, d: 0 },
  ecommerce: { vis: FeedVis, span: s.span2r, d: 0.1 },
  "design-studio": { vis: DesignVis, d: 0 },
  "social-media-marketing": { vis: SocialVis, d: 0.1 },
  seo: { vis: SeoVis, span: s.span3c, d: 0 },
};

export function ServicesBento() {
  const copy = home.sections.services;
  return (
    <section id="services" className={s.services} aria-labelledby="services-title">
      <div className={s.servicesInner}>
        <div className={s.secHead}>
          <div className={s.secHeadL}>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="services-title" data-rv="left" className={"disp " + s.h2}>
              {copy.title}
              <br />
              <span className="fillhov">{copy.titleAccent}</span>
            </h2>
          </div>
          <p data-rv="right" className={s.secHeadP}>
            {copy.text}
          </p>
        </div>
        <div className={s.bentoGrid}>
          {services.map((svc) => {
            const card = CARDS[svc.slug];
            const Vis = card.vis;
            return (
              <div key={svc.slug} data-rv="scale" className={card.span} style={{ "--d": `${card.d}s` } as CSSProperties}>
                <Link className={`${s.bento} tilt`} href={svc.route} style={{ "--ac": ACCENT_VAR[svc.slug] } as CSSProperties}>
                  <div className={s.bTop}>
                    <span className={s.bn}>
                      {svc.number} — {svc.title.toUpperCase()}
                    </span>
                    <Icon name={svc.slug} size={22} strokeWidth={1.7} />
                  </div>
                  <Vis />
                  <div className={s.bBottom}>
                    <div className={s.bCopy}>
                      <span className={s.bt}>{svc.title}</span>
                      <span className={s.bd}>{svc.homeCardText}</span>
                    </div>
                    <span className={s.bl}>
                      <span className={s.blc}>
                        <Icon name="arrow" />
                      </span>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TeamCard } from "@/components/about/TeamCard";
import s from "@/components/about/about.module.css";

const copy = about.page;

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description: copy.hero.lead,
  path: "/about",
});

/** Value-card icons, in content order (from the design). */
const VALUE_ICONS: IconName[] = ["chat", "shield", "trend"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb={copy.hero.crumb}
        title={copy.hero.title}
        titleAccent={copy.hero.titleAccent}
        lead={copy.hero.lead}
        core={
          <span className={"disp " + s.coreText}>
            {copy.hero.coreLabel}
            <br />
            {copy.hero.foundingYear}
          </span>
        }
      >
        <div className={s.heroBtns}>
          <a className="btn btn-red mag" href="#team">
            {copy.hero.ctaPrimary} <Icon name="arrow" />
          </a>
          <Link className="btn btn-ghost mag" href="/contact">
            {copy.hero.ctaSecondary}
          </Link>
        </div>
      </PageHero>

      <section className={s.story} aria-labelledby="story-title">
        <div className={s.storyRow}>
          <div className={s.col}>
            <SectionLabel>{copy.story.label}</SectionLabel>
          </div>
          <div className={s.storyText}>
            <h2 id="story-title" data-rv="up" className={"disp " + s.storyH2}>
              {copy.story.title}
            </h2>
            <p data-rv="up" className={s.storyP} style={{ "--d": ".1s" } as CSSProperties}>
              {about.story}
            </p>
            <p data-rv="up" className={s.storyP} style={{ "--d": ".2s" } as CSSProperties}>
              {copy.story.today}
            </p>
          </div>
        </div>
        <div className={s.mv}>
          {[
            { label: copy.missionLabel, text: about.mission, color: "var(--red)", d: "0s" },
            { label: copy.visionLabel, text: about.vision, color: "var(--cyan)", d: ".12s" },
          ].map((c) => (
            <div key={c.label} data-rv="scale" style={{ "--d": c.d } as CSSProperties}>
              <div className={"tilt card " + s.mvCard}>
                <span className={"mono " + s.mvLbl} style={{ color: c.color }}>
                  {c.label}
                </span>
                <p className={"disp " + s.mvText}>{c.text}</p>
                <div className={"cap-line " + s.mvLine} style={{ background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className={s.team} aria-labelledby="team-title">
        <div className={"grid-bg " + s.teamGrid} aria-hidden="true" />
        <div className={s.teamInner}>
          <div className={s.head}>
            <div className={s.col}>
              <SectionLabel>{copy.team.label}</SectionLabel>
              <h2 id="team-title" data-rv="left" className={"disp " + s.teamH2}>
                {copy.team.title}
                <br />
                <span className="fillhov">{copy.team.titleAccent}</span>
              </h2>
            </div>
            <p data-rv="right" className={s.headP}>
              {copy.team.text}
            </p>
          </div>
          <div className={s.cards}>
            {about.team.map((m, i) => (
              <TeamCard key={i} m={m} i={i} photoPlaceholder={copy.team.photoPlaceholder} />
            ))}
          </div>
        </div>
      </section>

      <section className={s.values} aria-labelledby="values-title">
        <div className={s.valuesInner}>
          <div className={s.col}>
            <SectionLabel>{copy.values.label}</SectionLabel>
            <h2 id="values-title" data-rv="up" className={"disp " + s.valuesH2}>
              {copy.values.title}
            </h2>
          </div>
          <div className={s.valueGrid}>
            {about.values.map((v, i) => (
              <div key={v.title} data-rv="up" style={{ "--d": `${i * 0.12}s` } as CSSProperties}>
                <div className={"tilt card " + s.valueCard}>
                  <span className="capi">
                    <Icon name={VALUE_ICONS[i] ?? "check"} size={34} strokeWidth={1.6} />
                  </span>
                  <div className={s.valueCopy}>
                    <span className="disp">{v.title}</span>
                    <span>{v.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaSection />
    </>
  );
}

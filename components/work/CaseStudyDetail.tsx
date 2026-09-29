import type { CSSProperties } from "react";
import { caseStudies, caseStudiesPage as copy, testimonials, type CaseStudy } from "@/content";
import { Crumb } from "@/components/ui/Crumb";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CaseCover } from "./CaseCover";
import { CaseStudyCard } from "./CaseStudyCard";
import { ServiceTags } from "./ServiceTags";
import s from "./detail.module.css";

const d = (sec: number) => ({ "--d": `${sec}s` }) as CSSProperties;

/** Single case study: facts, cover, results, story (overview → solution), gallery, client quote, more work. */
export function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  const L = copy.labels;
  const index = caseStudies.findIndex((c) => c.slug === cs.slug);
  const quote = testimonials.find((t) => t.company === cs.testimonialCompany);
  const others = caseStudies.filter((c) => c.slug !== cs.slug);
  const facts: [string, string][] = [
    [L.client, cs.client],
    [L.industry, cs.industry],
    [L.location, cs.location],
    [L.year, cs.year],
    [L.duration, cs.duration],
  ];
  const story: [string, string[]][] = [
    [L.overview, cs.overview],
    [L.challenge, cs.challenge],
    [L.solution, cs.solution],
  ];

  return (
    <>
      <section className={s.hero}>
        <div className={"grid-bg " + s.grid} aria-hidden="true" />
        <div className="hero-sweep" aria-hidden="true" />
        <div className={s.heroInner}>
          <Crumb className="in1" current={cs.client.toUpperCase()} trail={[{ label: copy.hero.crumb, href: "/case-studies" }]} />
          <span className={"in1 mono " + s.kicker}>CASE STUDY — {String(index + 1).padStart(2, "0")}</span>
          <h1 className={"in2 disp " + s.h1}>{cs.title}</h1>
          <p className={"in3 " + s.lead}>{cs.summary}</p>
          <dl className={"in3 " + s.facts}>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            {cs.url && (
              <div className={s.factWide}>
                <dt className="mono">{L.website}</dt>
                <dd>
                  <a className="arrow-link" href={cs.url} target="_blank" rel="noopener noreferrer">
                    {cs.url.replace(/^https?:\/\/(www\.)?/, "")} <Icon name="arrow" />
                  </a>
                </dd>
              </div>
            )}
            <div className={s.factWide}>
              <dt className="mono">{L.services}</dt>
              <dd className={s.tags}>
                <ServiceTags slugs={cs.services} linked />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={s.coverSec}>
        <div data-rv="scan" className={s.coverWrap} data-cur="view">
          <CaseCover initials={cs.initials} src={cs.cover} alt={`${cs.client} website homepage`} tall priority />
        </div>
      </section>

      <section className={s.section} aria-labelledby="results-title">
        <div className={s.inner}>
          <SectionLabel>{L.results}</SectionLabel>
          <h2 id="results-title" className="sr">
            {L.results}
          </h2>
          <div className={s.results}>
            {cs.results.map((r, i) => (
              <div key={i} className={"tilt " + s.result} data-rv="up" style={d(i * 0.1)}>
                <span className={"disp " + s.resultV}>{r.value}</span>
                <span className={s.resultL}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.inner}>
          {story.map(([label, paras]) => (
            <div key={label} className={s.storyRow}>
              <SectionLabel>{label}</SectionLabel>
              <div className={s.storyText} data-rv="up">
                {paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
          <div className={s.storyRow}>
            <SectionLabel>{L.deliverables}</SectionLabel>
            <ul className={s.deliverables} data-rv="up">
              {cs.deliverables.map((x, i) => (
                <li key={i} className="feat">
                  <span className={"mono " + s.delN}>{String(i + 1).padStart(2, "0")}</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.dark}`} aria-labelledby="gallery-title">
        <div className={"grid-bg " + s.grid} aria-hidden="true" />
        <div className={s.inner}>
          <SectionLabel>{L.gallery}</SectionLabel>
          <h2 id="gallery-title" className="sr">
            {L.gallery}
          </h2>
          <div className={s.gallery}>
            {cs.gallery.map((g, i) => (
              <figure key={i} className={s.shot} data-rv="scale" style={d((i % 2) * 0.1)}>
                <CaseCover initials={cs.initials} src={g.src} alt={`${cs.client} — ${g.caption}`} fit={g.fit} className={s.shotImg} />
                <figcaption className={s.caption}>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {quote && (
        <section className={s.section} aria-label={L.testimonial}>
          <div className={s.inner}>
            <SectionLabel>{L.testimonial}</SectionLabel>
            <figure className={s.quote} data-rv="up">
              <svg width="56" height="44" viewBox="0 0 56 44" fill="var(--red)" aria-hidden="true">
                <path d="M0 44V26C0 11 8 2 22 0l2 7c-8 2-12 8-12 15h10v22H0zm32 0V26c0-15 8-24 22-26l2 7c-8 2-12 8-12 15h10v22H32z" />
              </svg>
              <blockquote className={"disp " + s.quoteText}>{quote.quote}</blockquote>
              <figcaption className={s.quoteWho}>
                <span className="av-ring">
                  <span>{quote.initials}</span>
                </span>
                <span>
                  <span className="disp">{quote.name}</span>
                  <span>
                    {quote.role}, {quote.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className={s.section} aria-label={L.more}>
        <div className={s.inner}>
          <div className={s.moreHead}>
            <SectionLabel>{L.more}</SectionLabel>
            <ArrowLink href="/case-studies">{L.all}</ArrowLink>
          </div>
          {others.length > 0 && (
            <div className={s.moreGrid}>
              {others.slice(0, 2).map((c) => (
                <CaseStudyCard key={c.slug} cs={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

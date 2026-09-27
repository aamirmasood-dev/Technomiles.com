import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { caseStudies, caseStudiesPage as copy } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import s from "@/components/work/listing.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Case studies",
  description: copy.hero.lead,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const [first, ...rest] = caseStudies;
  return (
    <>
      <PageHero
        crumb={copy.hero.crumb}
        title={copy.hero.title}
        titleAccent={copy.hero.titleAccent}
        lead={copy.hero.lead}
        core={<span className={"disp " + s.core}>{copy.hero.core}</span>}
      />
      <section className={s.list} aria-label={copy.hero.crumb}>
        <div className={s.inner}>
          {first && (
            <div data-rv="scale">
              <CaseStudyCard cs={first} featured index={0} />
            </div>
          )}
          {rest.length > 0 && (
            <div className={s.grid}>
              {rest.map((cs, i) => (
                <div key={cs.slug} data-rv="up" style={{ "--d": `${(i % 2) * 0.1}s` } as CSSProperties}>
                  <CaseStudyCard cs={cs} index={i + 1} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaSection />
    </>
  );
}

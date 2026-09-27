import { caseStudies, home } from "@/content";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import s from "./work-section.module.css";

/** Homepage "Selected work": the latest case study, featured. */
export function WorkSection() {
  const copy = home.sections.work;
  const featured = caseStudies[0];
  if (!featured) return null;
  return (
    <section id="work" className={s.section} aria-labelledby="work-title">
      <div className={s.inner}>
        <div className={s.head}>
          <div className={s.col}>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="work-title" data-rv="left" className={"disp " + s.h2}>
              {copy.title}
            </h2>
          </div>
          <div className={s.side} data-rv="right">
            <p>{copy.text}</p>
            <ArrowLink href="/case-studies">{copy.link}</ArrowLink>
          </div>
        </div>
        <div data-rv="scale">
          <CaseStudyCard cs={featured} featured />
        </div>
      </div>
    </section>
  );
}

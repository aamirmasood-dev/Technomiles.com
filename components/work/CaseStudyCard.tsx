import Link from "next/link";
import { caseStudiesPage, type CaseStudy } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { CaseCover } from "./CaseCover";
import { ServiceTags } from "./ServiceTags";
import s from "./work.module.css";

/** Case-study teaser. `featured` = wide two-column layout (homepage / first item on the listing). */
export function CaseStudyCard({ cs, featured = false, index }: { cs: CaseStudy; featured?: boolean; index?: number }) {
  return (
    <Link href={`/case-studies/${cs.slug}`} className={`${s.card} ${featured ? s.featured : ""}`} data-cur="view">
      <CaseCover initials={cs.initials} src={cs.cover} alt={`${cs.client} website`} className={s.cardCover} />
      <div className={s.cardBody}>
        <div className={"mono " + s.cardMeta}>
          {index !== undefined && <span>{String(index + 1).padStart(2, "0")}</span>}
          <span>{cs.client.toUpperCase()}</span>
          <span>·</span>
          <span>{cs.industry.toUpperCase()}</span>
        </div>
        <h3 className={"disp " + s.cardTitle}>{cs.title}</h3>
        <p className={s.cardSummary}>{cs.summary}</p>
        <div className={s.tags}>
          <ServiceTags slugs={cs.services} />
        </div>
        {featured && (
          <dl className={s.miniResults}>
            {cs.results.map((r, i) => (
              <div key={i}>
                <dt className="disp">{r.value}</dt>
                <dd>{r.label}</dd>
              </div>
            ))}
          </dl>
        )}
        <span className={s.cardCta}>
          {caseStudiesPage.cardCta}
          <span className={s.cardCtaIc}>
            <Icon name="arrow" />
          </span>
        </span>
      </div>
    </Link>
  );
}

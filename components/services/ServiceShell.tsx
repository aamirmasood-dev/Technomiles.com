import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { getService, servicePageShared as shared, services, type ServiceSlug } from "@/content";
import { serviceJsonLd } from "@/lib/seo";
import { ACCENT_VAR } from "@/lib/theme";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CtaSection } from "@/components/sections/CtaSection";
import s from "./ServiceShell.module.css";

/**
 * Wraps every service page: sets the page's secondary accent (--acc2), then appends the
 * shared tail — service FAQs, "Other services", CTA — and the Service JSON-LD.
 */
export function ServiceShell({ slug, children }: { slug: ServiceSlug; children: ReactNode }) {
  const svc = getService(slug);
  const others = services.filter((x) => x.slug !== slug);
  return (
    <div style={{ "--acc2": ACCENT_VAR[slug] } as CSSProperties}>
      {children}

      <section className={s.faq} aria-labelledby="svc-faq-title">
        <div className={s.faqGrid}>
          <div className={s.col}>
            <SectionLabel>{shared.faqLabel}</SectionLabel>
            <h2 id="svc-faq-title" data-rv="up" className={"disp " + s.faqH2}>
              {svc.faqTitle}
            </h2>
            <ArrowLink href="/faq" data-rv="up" style={{ marginTop: 12 }}>
              {shared.faqLink}
            </ArrowLink>
          </div>
          <div data-rv="up">
            <Accordion items={svc.faqs} />
          </div>
        </div>
      </section>

      <section className={s.others} aria-label={shared.otherLabel}>
        <div className={s.othersInner}>
          <SectionLabel>{shared.otherLabel}</SectionLabel>
          <div className={s.othersGrid}>
            {others.map((o, i) => (
              <Link key={o.slug} className="oth" href={o.route} data-rv="up" style={{ "--d": `${i * 0.1}s` } as CSSProperties}>
                <div className={s.othTop}>
                  <span className="oi">
                    <Icon name={o.slug} size={30} strokeWidth={1.6} />
                  </span>
                  <span className="on-ar">
                    <Icon name="arrow" />
                  </span>
                </div>
                <div className={s.othBody}>
                  <span className="mono mut">{o.number}</span>
                  <span className="disp">{o.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <JsonLd data={serviceJsonLd(svc)} />
    </div>
  );
}

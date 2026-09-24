import Link from "next/link";
import { footer, legalShared as shared, type LegalDoc } from "@/content";
import { Crumb } from "@/components/ui/Crumb";
import { CtaSection } from "@/components/sections/CtaSection";
import { LegalToc } from "./LegalToc";
import s from "./legal.module.css";

/** Shared layout for Privacy / Terms / Refund: hero, sticky scroll-spy TOC, numbered sections, CTA. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section className={s.hero}>
        <div className={"grid-bg " + s.grid} aria-hidden="true" />
        <div className="hero-sweep" aria-hidden="true" />
        <div className={s.heroInner}>
          <Crumb className="in1" current={doc.crumb} trail={[{ label: shared.crumb }]} />
          <h1 className={"in2 disp " + s.h1}>{doc.title}</h1>
          <p className={"in3 " + s.lead}>{doc.lead}</p>
          <div className={"in3 mono " + s.updated}>
            {shared.updatedLabel} · {doc.updated}
          </div>
        </div>
      </section>

      <section className={s.body}>
        <div className={s.grid2}>
          <nav aria-label={shared.tocLabel} data-rv="left" className={s.toc}>
            <span className={"mono " + s.tocLbl}>{shared.tocLabel}</span>
            <LegalToc sections={doc.sections} />
            <div className={s.others}>
              {footer.legal.map((l) => (
                <Link key={l.href} className="arrow-link" href={l.href} style={{ fontSize: 14 }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className={"legal " + s.sections}>
            {doc.sections.map((sec, i) => (
              <section key={sec.id} id={sec.id} data-rv="up" className={s.sec} aria-labelledby={`${sec.id}-h`}>
                <div className={s.secHead}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <h2 id={`${sec.id}-h`}>{sec.heading}</h2>
                </div>
                {sec.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

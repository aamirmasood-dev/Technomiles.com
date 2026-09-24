import { home } from "@/content";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import s from "./home.module.css";

export function FaqTeaser() {
  const copy = home.sections.faq;
  return (
    <section className={s.faq} aria-labelledby="faq-title">
      <div className={s.faqInner}>
        <div className={s.faqSide}>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="faq-title" data-rv="up" className={"disp " + s.faqH2}>
            {copy.title}
          </h2>
          <ArrowLink href="/faq" data-rv="up" style={{ marginTop: 8 }}>
            {copy.link}
          </ArrowLink>
        </div>
        <div data-rv="up">
          <Accordion items={home.faqs} />
        </div>
      </div>
    </section>
  );
}

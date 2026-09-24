import type { Metadata } from "next";
import { faqPage } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqExplorer } from "@/components/faq/FaqExplorer";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description: faqPage.page.hero.lead,
  path: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqPage.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <FaqExplorer />
      <CtaSection />
      <JsonLd data={faqJsonLd} />
    </>
  );
}

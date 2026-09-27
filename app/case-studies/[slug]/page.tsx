import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content";
import { pageMetadata, caseStudyJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { CaseStudyDetail } from "@/components/work/CaseStudyDetail";

// Static export: every case study is pre-rendered; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  if (!cs) return {};
  return pageMetadata({ title: `${cs.client} — Case study`, description: cs.summary, path: `/case-studies/${cs.slug}` });
}

export default async function CaseStudyPage({ params }: Props) {
  const cs = getCaseStudy((await params).slug);
  if (!cs) notFound();
  return (
    <>
      <CaseStudyDetail cs={cs} />
      <CtaSection />
      <JsonLd data={caseStudyJsonLd(cs)} />
    </>
  );
}

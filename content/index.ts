import raw from "./site-content.json";
import type { Service, ServiceSlug, SiteContent } from "./types";

export const content = raw as unknown as SiteContent;

export const {
  company,
  nav,
  footer,
  cta,
  testimonialsSection,
  services,
  home,
  testimonials,
  about,
  faqPage,
  contactPage,
  legal,
  legalShared,
  servicePageExtras,
  servicePageShared,
  sharedProcessSteps,
  notFound,
  caseStudies,
  caseStudiesPage,
  whyUs,
} = content;

export function getService(slug: ServiceSlug): Service {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** "+92 334 547 2255" → "tel:+923345472255" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export type * from "./types";

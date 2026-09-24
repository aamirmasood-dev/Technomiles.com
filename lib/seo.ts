import type { Metadata } from "next";
import { company, type Service } from "@/content";
import { SITE_URL } from "./routes";

export const SITE_NAME = company.name;
const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: `${company.name} — Digital Agency` };

/** Per-page metadata with canonical URL + Open Graph. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  // trailingSlash export: pages live at /about/ etc.
  path = path === "/" ? path : `${path.replace(/\/$/, "")}/`;
  return {
    title,
    description,
    alternates: { canonical: path },
    // Page-level openGraph replaces the parent's, so the shared image (app/opengraph-image.tsx) is re-attached here.
    openGraph: { title, description, url: path, siteName: SITE_NAME, type: "website", locale: "en_GB", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

/** Organization + LocalBusiness, rendered on every page from the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    url: SITE_URL,
    email: company.email,
    telephone: company.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office No 3, Third Floor, 61-E, Usman Plaza, Commercial Area, Chaklala Scheme III",
      addressLocality: "Rawalpindi",
      addressCountry: "PK",
    },
    areaServed: company.markets,
    hasMap: company.mapsUrl,
  };
}

/** Service schema for a /services/* page, linked to the Organization node. */
export function serviceJsonLd(svc: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.lead,
    url: `${SITE_URL}${svc.route}/`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: company.markets,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: svc.title,
      itemListElement: svc.included.map((i) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: i.title, description: i.text },
      })),
    },
  };
}

export function serviceMetadata(svc: Service): Metadata {
  return pageMetadata({ title: svc.title, description: svc.lead, path: svc.route });
}

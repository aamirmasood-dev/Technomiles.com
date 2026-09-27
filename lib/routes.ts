import { caseStudies, services } from "@/content";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://technomiles.com").replace(/\/$/, "");

/** Label shown in the inner-page wipe ("TECHNOMILES — …"), keyed by pathname. */
const WIPE_LABELS: Record<string, string> = {
  "/about": "ABOUT US",
  "/contact": "CONTACT",
  "/faq": "FAQ",
  "/privacy-policy": "PRIVACY POLICY",
  "/terms-and-conditions": "TERMS & CONDITIONS",
  "/refund-policy": "REFUND & CANCELLATION",
  "/case-studies": "CASE STUDIES",
  ...Object.fromEntries(caseStudies.map((c) => [`/case-studies/${c.slug}`, c.client.toUpperCase()])),
  ...Object.fromEntries(services.map((s) => [s.route, s.title.toUpperCase()])),
};

/** "/about/" → "/about" (the static export uses trailing slashes). */
export const normalizePath = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function wipeLabel(pathname: string): string {
  return WIPE_LABELS[normalizePath(pathname)] ?? "";
}

/** Whether a top-level nav item should show as active for the current path. */
export function isNavActive(href: string, rawPath: string): boolean {
  const pathname = normalizePath(rawPath);
  if (href === "/") return pathname === "/";
  if (href.startsWith("/services")) return pathname.startsWith("/services");
  return pathname === href || pathname.startsWith(href + "/");
}

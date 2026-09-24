import type { MetadataRoute } from "next";
import { services } from "@/content";
import { SITE_URL } from "@/lib/routes";

const STATIC_ROUTES = ["/", "/about", "/contact", "/faq", "/privacy-policy", "/terms-and-conditions", "/refund-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [...STATIC_ROUTES, ...services.map((s) => s.route)];
  return routes.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path.includes("policy") || path.includes("terms") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.9 : 0.6,
  }));
}

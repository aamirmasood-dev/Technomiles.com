import type { Metadata } from "next";
import { getService } from "@/content";
import { serviceMetadata } from "@/lib/seo";
import { ServiceShell } from "@/components/services/ServiceShell";
import { SeoHero } from "@/components/services/seo/SeoHero";
import { SiteAudit } from "@/components/services/seo/SiteAudit";
import { SerpAnatomy } from "@/components/services/seo/SerpAnatomy";
import { GrowthPath } from "@/components/services/seo/GrowthPath";

export const metadata: Metadata = serviceMetadata(getService("seo"));

export default function SeoPage() {
  return (
    <ServiceShell slug="seo">
      <SeoHero />
      <SiteAudit />
      <SerpAnatomy />
      <GrowthPath />
    </ServiceShell>
  );
}

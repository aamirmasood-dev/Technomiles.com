import type { Metadata } from "next";
import { getService } from "@/content";
import { serviceMetadata } from "@/lib/seo";
import { ServiceShell } from "@/components/services/ServiceShell";
import { MarketingHero } from "@/components/services/marketing/MarketingHero";
import { ChannelCards } from "@/components/services/marketing/ChannelCards";
import { WeekCalendar } from "@/components/services/marketing/WeekCalendar";
import { Funnel } from "@/components/services/marketing/Funnel";

export const metadata: Metadata = serviceMetadata(getService("social-media-marketing"));

export default function SocialMediaMarketingPage() {
  return (
    <ServiceShell slug="social-media-marketing">
      <MarketingHero />
      <ChannelCards />
      <WeekCalendar />
      <Funnel />
    </ServiceShell>
  );
}

import type { Metadata } from "next";
import { getService } from "@/content";
import { serviceMetadata } from "@/lib/seo";
import { ServiceShell } from "@/components/services/ServiceShell";
import { EcomHero } from "@/components/services/ecom/EcomHero";
import { Channels } from "@/components/services/ecom/Channels";
import { ListingAnatomy } from "@/components/services/ecom/ListingAnatomy";
import { Journey } from "@/components/services/ecom/Journey";

export const metadata: Metadata = serviceMetadata(getService("ecommerce"));

export default function EcommercePage() {
  return (
    <ServiceShell slug="ecommerce">
      <EcomHero />
      <Channels />
      <ListingAnatomy />
      <Journey />
    </ServiceShell>
  );
}

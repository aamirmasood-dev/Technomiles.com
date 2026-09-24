import type { Metadata } from "next";
import { getService } from "@/content";
import { serviceMetadata } from "@/lib/seo";
import { ServiceShell } from "@/components/services/ServiceShell";
import { DevHero } from "@/components/services/dev/DevHero";
import { Configurator } from "@/components/services/dev/Configurator";
import { Products } from "@/components/services/dev/Products";
import { GitLog } from "@/components/services/dev/GitLog";

export const metadata: Metadata = serviceMetadata(getService("custom-development"));

export default function CustomDevelopmentPage() {
  return (
    <ServiceShell slug="custom-development">
      <DevHero />
      <Configurator />
      <Products />
      <GitLog />
    </ServiceShell>
  );
}

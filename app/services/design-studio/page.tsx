import type { Metadata } from "next";
import { getService } from "@/content";
import { serviceMetadata } from "@/lib/seo";
import { ServiceShell } from "@/components/services/ServiceShell";
import { DesignHero } from "@/components/services/design/DesignHero";
import { Playground } from "@/components/services/design/Playground";
import { Disciplines } from "@/components/services/design/Disciplines";
import { LayersProcess } from "@/components/services/design/LayersProcess";
import { playgroundFontVars } from "@/components/services/design/fonts";

export const metadata: Metadata = serviceMetadata(getService("design-studio"));

export default function DesignStudioPage() {
  return (
    <div className={playgroundFontVars}>
      <ServiceShell slug="design-studio">
        <DesignHero />
        <Playground />
        <Disciplines />
        <LayersProcess />
      </ServiceShell>
    </div>
  );
}

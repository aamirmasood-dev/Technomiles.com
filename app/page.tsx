import type { Metadata } from "next";
import { home } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { Preloader } from "@/components/layout/Preloader";
import { CtaSection } from "@/components/sections/CtaSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesBento } from "@/components/home/ServicesBento";
import { Platforms } from "@/components/home/Platforms";
import { Process } from "@/components/home/Process";
import { FaqTeaser } from "@/components/home/FaqTeaser";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Technomiles — Digital Agency", description: home.heroSub, path: "/" }),
  title: { absolute: "Technomiles — Digital Agency" },
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Hero />
      <Intro />
      <ServicesBento />
      <Platforms />
      <Process />
      <Testimonials />
      <FaqTeaser />
      <CtaSection />
    </>
  );
}

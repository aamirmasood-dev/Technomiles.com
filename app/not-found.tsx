import type { Metadata } from "next";
import Link from "next/link";
import { notFound as copy, services } from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import s from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <PageHero
        crumb={copy.crumb}
        title={copy.title}
        titleAccent={copy.titleAccent}
        lead={copy.lead}
        core={<span className={"disp " + s.code}>{copy.code}</span>}
      >
        <div className={s.btns}>
          <Link className="btn btn-red mag" href="/">
            {copy.ctaPrimary} <Icon name="arrow" />
          </Link>
          <Link className="btn btn-ghost mag" href="/contact">
            {copy.ctaSecondary}
          </Link>
        </div>
      </PageHero>
      <section className={s.more} aria-label={copy.servicesLabel}>
        <div className={s.inner}>
          <span className={"mono " + s.lbl}>{copy.servicesLabel}</span>
          <div className={s.chips}>
            {services.map((svc) => (
              <Link key={svc.slug} className="chip" href={svc.route}>
                {svc.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

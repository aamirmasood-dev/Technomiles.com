import Link from "next/link";
import { caseStudiesPage, services, type ServiceSlug } from "@/content";
import s from "./work.module.css";

/** Chips linking to the services used on a project; a visible placeholder until they're confirmed. */
export function ServiceTags({ slugs, linked = false }: { slugs: ServiceSlug[]; linked?: boolean }) {
  if (slugs.length === 0) return <span className={s.tag}>{caseStudiesPage.servicesPlaceholder}</span>;
  return (
    <>
      {slugs.map((slug) => {
        const svc = services.find((x) => x.slug === slug);
        if (!svc) return null;
        return linked ? (
          <Link key={slug} href={svc.route} className={s.tag}>
            {svc.title}
          </Link>
        ) : (
          <span key={slug} className={s.tag}>
            {svc.title}
          </span>
        );
      })}
    </>
  );
}

import Link from "next/link";
import { Fragment } from "react";

/** "HOME / … / CURRENT" breadcrumb (.crumb). `trail` holds the steps between Home and the current page (links when `href` is set). */
export function Crumb({ current, trail = [], className = "" }: { current: string; trail?: { label: string; href?: string }[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={"crumb " + className}>
      <Link href="/">HOME</Link>
      {trail.map((t) => (
        <Fragment key={t.label}>
          <span style={{ color: "var(--line-strong)" }} aria-hidden="true">/</span>
          {t.href ? <Link href={t.href}>{t.label}</Link> : <span>{t.label}</span>}
        </Fragment>
      ))}
      <span style={{ color: "var(--line-strong)" }} aria-hidden="true">/</span>
      <span style={{ color: "var(--red)" }} aria-current="page">
        {current}
      </span>
    </nav>
  );
}

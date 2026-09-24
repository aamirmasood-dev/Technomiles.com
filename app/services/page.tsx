import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content";
import { BASE_PATH } from "@/lib/basePath";

// Static hosting has no server redirects: forward /services/ to the first service page.
const target = services[0].route;

export const metadata: Metadata = {
  title: "Services",
  robots: { index: false },
  alternates: { canonical: target },
};

export default function ServicesIndex() {
  return (
    <section className="wrap" style={{ padding: "160px 40px" }}>
      <meta httpEquiv="refresh" content={`0; url=${BASE_PATH}${target}/`} />
      <p style={{ color: "var(--muted)" }}>
        Redirecting to <Link href={target}>{services[0].title}</Link>…
      </p>
    </section>
  );
}

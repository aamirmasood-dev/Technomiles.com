"use client";

import { useEffect, useState } from "react";
import type { LegalSection } from "@/content";

/** Table of contents with scroll-spy: the section crossing the upper-middle of the viewport is "on". */
export function LegalToc({ sections }: { sections: LegalSection[] }) {
  const [cur, setCur] = useState(sections[0]?.id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const spy = new IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) setCur(en.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, [sections]);

  return (
    <div>
      {sections.map((s) => (
        <a key={s.id} className={s.id === cur ? "toc on" : "toc"} href={`#${s.id}`} aria-current={s.id === cur ? "location" : undefined}>
          {s.heading}
        </a>
      ))}
    </div>
  );
}

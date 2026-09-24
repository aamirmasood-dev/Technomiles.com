"use client";

import { useState } from "react";
import s from "./contact.module.css";

/** Lazy Google Maps embed; stays invisible until loaded so the design's styled map shows meanwhile. */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <iframe
      className={s.mapFrame}
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      onLoad={() => setLoaded(true)}
      style={{ opacity: loaded ? 1 : 0 }}
    />
  );
}

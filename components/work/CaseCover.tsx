import Image from "next/image";
import { caseStudiesPage } from "@/content";
import { asset } from "@/lib/asset";
import s from "./work.module.css";

interface CaseCoverProps {
  initials: string;
  /** Screenshot under /public; without it a striped placeholder with outlined initials is shown. */
  src?: string;
  alt?: string;
  label?: string;
  fit?: "cover" | "contain";
  tall?: boolean;
  priority?: boolean;
  className?: string;
}

/** Image slot for a case study: browser-framed screenshot, or a placeholder. */
export function CaseCover({ initials, src, alt, label, fit = "cover", tall = false, priority = false, className }: CaseCoverProps) {
  const cls = `${s.cover} ${tall ? s.coverTall : ""} ${className ?? ""}`;
  if (src) {
    return (
      <div className={`${cls} ${s.shotFrame}`}>
        <span className={s.chrome} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className={s.imgBox}>
          <Image
            src={asset(src)}
            alt={alt ?? ""}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className={`${s.img} ${fit === "contain" ? s.contain : ""}`}
          />
        </div>
        <span className={s.coverScan} aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className={cls} role="img" aria-label={label ?? caseStudiesPage.imagePlaceholder}>
      <span className={"disp " + s.coverIni} aria-hidden="true">
        {initials}
      </span>
      <span className={"mono " + s.coverLbl} aria-hidden="true">
        {label ?? caseStudiesPage.imagePlaceholder}
      </span>
      <span className={s.coverScan} aria-hidden="true" />
    </div>
  );
}

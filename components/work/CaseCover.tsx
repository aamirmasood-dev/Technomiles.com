import { caseStudiesPage } from "@/content";
import s from "./work.module.css";

/** Image slot for a case study: striped placeholder with outlined initials until real images are supplied. */
export function CaseCover({ initials, label, tall = false, className }: { initials: string; label?: string; tall?: boolean; className?: string }) {
  return (
    <div className={`${s.cover} ${tall ? s.coverTall : ""} ${className ?? ""}`} role="img" aria-label={label ?? caseStudiesPage.imagePlaceholder}>
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

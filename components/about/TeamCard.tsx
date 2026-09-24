import type { CSSProperties } from "react";
import type { TeamMember } from "@/content";
import { Icon } from "@/components/ui/Icon";
import s from "./about.module.css";

const LINKEDIN =
  "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z";

/** Team card: outlined initials; hover/focus runs the scan line and slides up the red bio panel. */
export function TeamCard({ m, i, photoPlaceholder }: { m: TeamMember; i: number; photoPlaceholder: string }) {
  const li = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={LINKEDIN} />
    </svg>
  );
  const mail = <Icon name="mail" size={16} strokeWidth={2} />;
  return (
    <div data-rv="scale" style={{ "--d": `${i * 0.1}s` } as CSSProperties}>
      <div className={"tm " + s.tm} data-cur="view" tabIndex={0} aria-label={`${m.name}, ${m.role}`}>
        <div className="tm-ph">
          <span className="disp tm-in" aria-hidden="true">
            {m.ini}
          </span>
          <span className={"mono " + s.photo}>{photoPlaceholder}</span>
          <span className="tm-scan" aria-hidden="true" />
          <div className="tm-ov">
            <p className={s.bio}>{m.bio}</p>
            <div className={s.socs}>
              {m.linkedin ? (
                <a className="soc" href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}>
                  {li}
                </a>
              ) : (
                <span className="soc" aria-disabled="true" title="[Add LinkedIn URL]">
                  {li}
                </span>
              )}
              {m.email ? (
                <a className="soc" href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}>
                  {mail}
                </a>
              ) : (
                <span className="soc" aria-disabled="true" title="[Add email]">
                  {mail}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={s.tmMeta}>
          <div className={s.tmWho}>
            <span className="disp">{m.name}</span>
            <span>{m.role}</span>
          </div>
          <span className={"mono " + s.tmN}>{String(i + 1).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

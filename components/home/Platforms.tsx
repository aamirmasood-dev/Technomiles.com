import { Fragment } from "react";
import { home } from "@/content";
import { Marquee } from "@/components/ui/Marquee";
import s from "./home.module.css";

export function Platforms() {
  const [l1, l2] = home.sections.platforms.label;
  return (
    <div className={s.platforms}>
      <span className={"mono " + s.platformsLbl}>
        {l1}
        <br /> {l2}
      </span>
      <div className={s.platformsTrack}>
        <Marquee gap={56} groupClassName={s.tech}>
          {home.platforms.map((p) => (
            <Fragment key={p}>
              <span>{p}</span>
              <i />
            </Fragment>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

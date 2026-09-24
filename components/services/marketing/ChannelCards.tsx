import type { CSSProperties, ReactNode } from "react";
import { getService, servicePageExtras } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import v from "../svc.module.css";
import s from "./marketing.module.css";

const svc = getService("social-media-marketing");
const copy = servicePageExtras["social-media-marketing"].copy.channels;
const HEART = "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z";

/** Channel descriptions come from the service's "included" list (social, Google, SMS, email). */
const INCLUDED_INDEX = [1, 2, 3, 4];

const MOCKS: ReactNode[] = [
  <div key="social" className={`${s.mock} ${s.socialMock}`}>
    <div className={s.socialImg} />
    <div className={s.socialLines}>
      <div className={s.postHead}>
        <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(var(--ink),.2)" }} />
        <span className={s.sk} style={{ height: 8, width: 90 }} />
      </div>
      <span className={s.sk} style={{ height: 8, width: "90%" }} />
      <span className={s.sk} style={{ height: 8, width: "70%" }} />
      <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
        <svg className={s.hpop} width="22" height="22" viewBox="0 0 24 24" fill="var(--red)">
          <path d={HEART} />
        </svg>
        <Icon name="chat" size={22} strokeWidth={2} style={{ color: "var(--muted)" }} />
      </div>
    </div>
  </div>,
  <div key="ads" className={s.mock} style={{ gap: 8 }}>
    <div className={s.adQ}>
      <Icon name="search" size={16} strokeWidth={2} style={{ color: "var(--muted)" }} />
      {copy.ad.query}
    </div>
    <span className={"mono " + s.adMeta}>
      <b>{copy.ad.sponsored}</b> · {copy.ad.domain}
    </span>
    <span className={s.adTitle}>{copy.ad.headline}</span>
    <span className={s.sk} style={{ height: 7, width: "92%" }} />
    <span className={s.sk} style={{ height: 7, width: "70%" }} />
  </div>,
  <div key="sms" className={s.mock}>
    {copy.sms.map((m, i) => (
      <span key={i} className={s.bub + (i === 1 ? ` ${s.me}` : "")}>
        {m}
      </span>
    ))}
  </div>,
  <div key="email" className={`${s.mock} ${s.inbox}`}>
    {copy.email.rows.map((r, i) => (
      <div key={r.subject} className={s.mail + (i === 0 ? ` ${s.unread}` : "")}>
        <span />
        <span>{copy.email.sender}</span>
        <span>{r.subject}</span>
        <span className="mono">{r.time}</span>
      </div>
    ))}
  </div>,
];

export function ChannelCards() {
  return (
    <section className={`${v.section} ${v.dark}`} aria-labelledby="mk-channels-title">
      <div className={v.inner}>
        <div className={v.head}>
          <div className={v.col}>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="mk-channels-title" data-rv="left" className={"disp " + v.h2}>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p data-rv="right" className={v.headP}>
            {copy.text}
          </p>
        </div>
        <div className={s.chnGrid}>
          {copy.cards.map((title, i) => (
            <div key={title} data-rv="scale" className={s.chn} data-cur="view" style={{ "--d": `${(i % 2) * 0.1}s` } as CSSProperties}>
              <div aria-hidden="true" style={{ display: "contents" }}>
                {MOCKS[i]}
              </div>
              <div className={s.chnCopy}>
                <h3 className="disp" style={{ margin: 0 }}>
                  {title}
                </h3>
                <span>{svc.included[INCLUDED_INDEX[i]]?.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

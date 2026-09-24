import Link from "next/link";
import type { CSSProperties } from "react";
import { getService, servicePageExtras, servicePageShared } from "@/content";
import { Crumb } from "@/components/ui/Crumb";
import { Icon } from "@/components/ui/Icon";
import { MouseParallax } from "@/components/fx/MouseParallax";
import v from "../svc.module.css";
import s from "./marketing.module.css";

const svc = getService("social-media-marketing");
const copy = servicePageExtras["social-media-marketing"].copy.hero;

const HEART = "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z";
const POST_BG = ["var(--red)", "var(--violet)", "#141418", "var(--amber)"];

function Post({ label, bg }: { label: string; bg: string }) {
  return (
    <div className={s.post}>
      <div className={s.postHead}>
        <span className={s.avatar} />
        <span className={s.sk} style={{ height: 8, width: 70 }} />
      </div>
      <div className={s.postImg} style={{ background: bg }}>
        <span className="disp">{label}</span>
      </div>
      <div className={s.actions}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--red)" stroke="var(--red)" strokeWidth="2">
          <path d={HEART} />
        </svg>
        <Icon name="chat" size={18} strokeWidth={2} />
        <Icon name="send" size={18} strokeWidth={2} />
      </div>
      <span className={s.sk} style={{ height: 7, width: "85%" }} />
    </div>
  );
}

const notif = (pos: CSSProperties, bob: string) => ({ className: `${s.notif} ${bob}`, style: pos });

export function MarketingHero() {
  const posts = [...copy.posts, ...copy.posts];
  return (
    <section className={v.hero}>
      <div className={"grid-bg " + v.heroGrid} aria-hidden="true" />
      <div className="hero-sweep" aria-hidden="true" />
      <div className={v.heroGlow} aria-hidden="true" />
      <div className={`${v.heroInner} ${s.heroInner}`}>
        <div className={v.heroCopy}>
          <Crumb className="in1" current={svc.title.toUpperCase()} trail={[{ label: servicePageShared.crumbServices, href: "/services" }]} />
          <h1 className={`in2 disp ${v.h1} ${s.h1}`}>
            {copy.title}
            <br />
            {copy.titleLine2} <span className={s.grad}>{copy.titleAccent}</span>
          </h1>
          <p className={"in3 " + v.lead}>
            {svc.lead} {copy.leadSuffix}
          </p>
          <div className={"in3 " + v.btns}>
            <Link className="btn btn-red mag" href="/contact">
              {copy.ctaPrimary} <Icon name="arrow" />
            </Link>
            <a className="btn btn-ghost mag" href="#week">
              {copy.ctaSecondary}
            </a>
          </div>
        </div>

        <div className={"in4 " + s.stage} aria-hidden="true">
          <MouseParallax className={s.stageIn}>
            <div className={s.phone} data-cur="view">
              <div className={s.pfeed}>
                {posts.map((p, i) => (
                  <Post key={i} label={p} bg={POST_BG[i % POST_BG.length]} />
                ))}
              </div>
            </div>
            <span className={s.heart} style={{ left: "10%", animationDelay: "0s" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--red)">
                <path d={HEART} />
              </svg>
            </span>
            <span className={s.heart} style={{ left: "30%", animationDelay: "1.2s" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--acc2)">
                <path d={HEART} />
              </svg>
            </span>
            <div {...notif({ left: -150, top: 90 }, "bob1")}>
              <i style={{ background: "var(--red)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                  <path d={HEART} />
                </svg>
              </i>
              {copy.notifs.follower}
            </div>
            <div {...notif({ right: -140, top: 230 }, "bob2")}>
              <i style={{ background: "var(--cyan)", color: "var(--bg)", fontSize: 12, fontWeight: 800 }}>{copy.notifs.adBadge}</i>
              {copy.notifs.campaign}
            </div>
            <div {...notif({ left: -130, bottom: 150 }, "bob3")}>
              <i style={{ background: "var(--acc2)", color: "var(--bg)" }}>
                <Icon name="mail" size={14} strokeWidth={2.4} />
              </i>
              {copy.notifs.email}
            </div>
            <div {...notif({ right: -110, bottom: 70 }, "bob1")}>
              <i style={{ background: "var(--amber)", color: "var(--bg)" }}>
                <Icon name="chat" size={14} strokeWidth={2.4} />
              </i>
              {copy.notifs.sms}
            </div>
          </MouseParallax>
        </div>
      </div>
    </section>
  );
}

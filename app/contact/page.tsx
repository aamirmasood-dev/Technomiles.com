import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { company, contactPage as copy, telHref } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import s from "@/components/contact/contact.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: copy.hero.lead,
  path: "/contact",
});

const d = (sec: number) => ({ "--d": `${sec}s` }) as CSSProperties;
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(copy.map.embedQuery)}&z=16&output=embed`;

export default function ContactPage() {
  const [main, ...others] = company.phones;
  return (
    <>
      <PageHero
        crumb={copy.hero.crumb}
        title={copy.hero.title}
        titleAccent={copy.hero.titleAccent}
        lead={copy.hero.lead}
        core={<Icon name="mail" size={46} strokeWidth={1.6} />}
      />

      <section className={s.main} aria-label="Contact form and details">
        <div className={s.mainGrid}>
          <div data-rv="scan" className={s.formCard}>
            <ContactForm />
          </div>
          <div className={s.infoCol}>
            <div className="info" data-rv="right" style={d(0)}>
              <span className="ii">
                <Icon name="mail" size={22} strokeWidth={1.8} />
              </span>
              <div className={s.infoBody}>
                <span className={"mono " + s.infoLbl}>{copy.info.email}</span>
                <a className={s.infoMain} href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </div>
            </div>
            <div className="info" data-rv="right" style={d(0.1)}>
              <span className="ii">
                <Icon name="phone" size={22} strokeWidth={1.8} />
              </span>
              <div className={s.infoBody}>
                <span className={"mono " + s.infoLbl}>{copy.info.phone}</span>
                <a className={s.infoMain} href={telHref(main)}>
                  {main}
                </a>
                {others.map((p) => (
                  <a key={p} className={s.infoSub} href={telHref(p)}>
                    {p}
                  </a>
                ))}
              </div>
            </div>
            <div className="info" data-rv="right" style={d(0.2)}>
              <span className="ii">
                <Icon name="pin" size={22} strokeWidth={1.8} />
              </span>
              <div className={s.infoBody}>
                <span className={"mono " + s.infoLbl}>{copy.info.office}</span>
                <address className={s.infoText} style={{ fontStyle: "normal" }}>
                  {company.address}
                </address>
              </div>
            </div>
            <div className="info" data-rv="right" style={d(0.3)}>
              <span className="ii">
                <Icon name="clock" size={22} strokeWidth={1.8} />
              </span>
              <div className={s.infoBody}>
                <span className={"mono " + s.infoLbl}>{copy.info.hours}</span>
                <span className={s.infoText}>{copy.info.hoursValue}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.mapSec} aria-label={copy.map.label}>
        <div data-rv="scan" data-cur="view" className={s.map}>
          <div className={s.mapGrid} aria-hidden="true" />
          <svg className={s.mapSvg} viewBox="0 0 1280 440" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 300 C200 280 300 180 520 200 S900 320 1280 240" stroke="rgba(var(--ink),.14)" strokeWidth="18" fill="none" />
            <path d="M640 0 C620 120 700 260 660 440" stroke="rgba(var(--ink),.1)" strokeWidth="12" fill="none" />
            <path d="M0 120 L1280 160" stroke="rgba(var(--ink),.07)" strokeWidth="8" fill="none" />
          </svg>
          <MapEmbed src={MAP_EMBED} title={`Map: ${company.address}`} />
          <div className={s.mapCard}>
            <span className="mono">{copy.map.label}</span>
            <span className="disp">{copy.map.title}</span>
            <span>{copy.map.sub}</span>
            <ArrowLink href={company.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 6 }}>
              {copy.map.link}
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className={s.bannerSec}>
        <div data-rv="up" className={s.banner}>
          <div className={s.bannerCopy}>
            <span className="disp">{copy.faqBanner.title}</span>
            <span>{copy.faqBanner.text}</span>
          </div>
          <Link className="btn btn-ghost mag" href="/faq">
            {copy.faqBanner.cta} <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}

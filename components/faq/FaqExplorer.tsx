"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { faqPage } from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import s from "./faq.module.css";

const copy = faqPage.page;
const ALL = faqPage.items;

/** FAQ hero search + topic chips + filtered accordion (search state is shared, so it's one client island). */
export function FaqExplorer() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);

  const list = useMemo(() => {
    const ql = dq.trim().toLowerCase();
    return ALL.filter((f) => (cat === "All" || f.category === cat) && (!ql || `${f.q} ${f.a}`.toLowerCase().includes(ql)));
  }, [cat, dq]);

  const count = (c: string) => (c === "All" ? ALL.length : ALL.filter((f) => f.category === c).length);
  const resultTxt =
    `${list.length} ${list.length === 1 ? "QUESTION" : "QUESTIONS"}` + (cat !== "All" ? ` · ${cat.toUpperCase()}` : "");

  return (
    <>
      <PageHero
        crumb={copy.hero.crumb}
        title={copy.hero.title}
        titleAccent={copy.hero.titleAccent}
        lead={copy.hero.lead}
        core={<span className={"disp " + s.q}>?</span>}
      >
        <div className={s.search} role="search">
          <label htmlFor="faq-q" className="sr">
            {copy.hero.searchLabel}
          </label>
          <Icon name="search" size={20} strokeWidth={2} className={s.searchIc} style={{ color: "var(--muted)" }} />
          <input
            id="faq-q"
            className={"field " + s.searchInput}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={copy.hero.searchPlaceholder}
            aria-controls="faq-results"
          />
        </div>
      </PageHero>

      <section className={s.body} aria-label="Frequently asked questions">
        <div className={s.grid}>
          <div data-rv="left" className={s.side}>
            <span className={"mono " + s.browse}>{copy.browseLabel}</span>
            <div role="group" aria-label={copy.topicsLabel} className={s.chips}>
              {faqPage.categories.map((c) => (
                <button key={c} type="button" className={c === cat ? "fchip on" : "fchip"} aria-pressed={c === cat} onClick={() => setCat(c)}>
                  {c}
                  <i>{count(c)}</i>
                </button>
              ))}
            </div>
            <div className={"card " + s.ask}>
              <span className="disp">{copy.askCard.title}</span>
              <span>{copy.askCard.text}</span>
              <ArrowLink href="/contact">{copy.askCard.link}</ArrowLink>
            </div>
          </div>

          <div data-rv="up" className={s.results} id="faq-results">
            <div className={s.resultBar}>
              <span className="mono" role="status" aria-live="polite">
                {resultTxt}
              </span>
            </div>
            {list.length > 0 ? (
              <Accordion key={`${cat}|${dq}`} items={list} />
            ) : (
              <div className={s.empty}>
                <span className="disp">{copy.empty.title}</span>
                <span>{copy.empty.text}</span>
                <Link className="btn btn-red mag" href="/contact" style={{ marginTop: 8 }}>
                  {copy.empty.cta} <Icon name="arrow" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

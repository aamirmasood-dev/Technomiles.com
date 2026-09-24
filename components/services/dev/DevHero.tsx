import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { getService, servicePageExtras, servicePageShared } from "@/content";
import { Crumb } from "@/components/ui/Crumb";
import { Icon } from "@/components/ui/Icon";
import { MouseParallax } from "@/components/fx/MouseParallax";
import s from "./dev.module.css";

const svc = getService("custom-development");
const copy = servicePageExtras["custom-development"].copy.hero;

/* Code art for the typing editor — verbatim from the design. */
const K = ({ children }: { children: ReactNode }) => <span className={s.tkK}>{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className={s.tkS}>{children}</span>;
const F = ({ children }: { children: ReactNode }) => <span className={s.tkF}>{children}</span>;
const T = ({ children }: { children: ReactNode }) => <span className={s.tkT}>{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className={s.tkC}>{children}</span>;

const LINES: ReactNode[] = [
  <Fragment key={1}><K>import</K><T>{" { Inventory, Sales } "}</T><K>from</K><S> &apos;@technomiles/erp&apos;</S></Fragment>,
  <Fragment key={2}>{" "}</Fragment>,
  <C key="c">{"// keeps shelves full, automatically"}</C>,
  <Fragment key={3}><K>export async function</K><F> restock</F><T>{"(item) {"}</T></Fragment>,
  <Fragment key={4}><T>{"  "}</T><K>const</K><T> stock = </T><K>await</K><T> Inventory.</T><F>level</F><T>(item.sku)</T></Fragment>,
  <Fragment key={5}><T>{"  "}</T><K>if</K><T>{" (stock < item.minimum) {"}</T></Fragment>,
  <Fragment key={6}><T>{"    "}</T><K>await</K><T> Sales.</T><F>notify</F><T>(</T><S>&apos;Low stock: &apos;</S><T> + item.name)</T></Fragment>,
  <Fragment key={7}><T>{"    "}</T><K>return</K><T> Inventory.</T><F>reorder</F><T>(item, item.batch)</T></Fragment>,
  <T key="close-if">{"  }"}</T>,
  <Fragment key={8}><T>{"  "}</T><K>return</K><T> stock</T></Fragment>,
  <T key="close-fn">{"}"}</T>,
];

const FILES: { name: string; indent: number; on?: boolean }[] = [
  { name: "▾ erp/", indent: 12 },
  { name: "inventory.ts", indent: 28, on: true },
  { name: "sales.ts", indent: 28 },
  { name: "hr.ts", indent: 28 },
  { name: "▸ lms/", indent: 12 },
  { name: "▸ pos/", indent: 12 },
  { name: "▸ finance/", indent: 12 },
  { name: "▸ web/", indent: 12 },
];

export function DevHero() {
  return (
    <section className={s.hero}>
      <div className={"grid-bg " + s.heroGrid} aria-hidden="true" />
      <div className="hero-sweep" aria-hidden="true" />
      <div className={s.heroGlow} aria-hidden="true" />
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <Crumb
            className="in1"
            current={svc.title.toUpperCase()}
            trail={[{ label: servicePageShared.crumbServices, href: "/services" }]}
          />
          <div className={"in1 mono " + s.code}>{copy.code}</div>
          <h1 className={"in2 disp " + s.h1}>
            {copy.title}{" "}
            <span className="glitch" data-text={copy.titleAccent} style={{ color: "var(--red)" }}>
              {copy.titleAccent}
            </span>
          </h1>
          <p className={"in3 " + s.lead}>{svc.lead}</p>
          <div className={"in3 " + s.btns}>
            <Link className="btn btn-red mag" href="/contact">
              {copy.ctaPrimary} <Icon name="arrow" />
            </Link>
            <a className="btn btn-ghost mag" href="#configure">
              {copy.ctaSecondary}
            </a>
          </div>
          <div className={"in3 mono " + s.tags}>
            {copy.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        <div className="in4" style={{ position: "relative" }} aria-hidden="true">
          <MouseParallax className={s.parallax}>
            <div className={s.ide} data-cur="view">
              <div className={s.ideTop}>
                <div className={s.dots}>
                  <i />
                  <i />
                  <i />
                </div>
                <span className={`${s.tabx} ${s.on}`}>inventory.ts</span>
                <span className={s.tabx}>checkout.ts</span>
                <span className={s.tabx}>payroll.ts</span>
              </div>
              <div className={s.ideBody}>
                <div className={s.explorer}>
                  <span className={"mono " + s.explorerLbl}>EXPLORER</span>
                  {FILES.map((f) => (
                    <div key={f.name} className={s.ft + (f.on ? ` ${s.on}` : "")} style={{ paddingLeft: f.indent }}>
                      {f.name}
                    </div>
                  ))}
                </div>
                <div className={s.editor}>
                  {LINES.map((l, i) => (
                    <div key={i} className={s.cl} style={{ "--i": i } as CSSProperties}>
                      <span className={s.ln}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={s.cx}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.terminal}>
                <span className={s.termL} style={{ "--i": 0 } as CSSProperties}>
                  $ npm run build
                </span>
                <span className={s.termL} style={{ "--i": 1 } as CSSProperties}>
                  <b>✓</b> compiled successfully
                </span>
                <span className={s.termL} style={{ "--i": 2 } as CSSProperties}>
                  <b>✓</b> tests passed · deployed to production
                </span>
              </div>
              <div className={"mono " + s.status}>
                <span>⎇ main</span>
                <span>TypeScript · UTF-8 · Ln 5</span>
              </div>
            </div>
          </MouseParallax>
        </div>
      </div>
    </section>
  );
}

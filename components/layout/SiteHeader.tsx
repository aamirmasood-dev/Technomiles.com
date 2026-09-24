"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { company, nav, services, telHref } from "@/content";
import { isNavActive } from "@/lib/routes";
import { Icon } from "@/components/ui/Icon";
import { LogoSlot } from "@/components/ui/LogoSlot";
import { ThemeToggle } from "./ThemeToggle";
import s from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Hide on scroll down, show on scroll up (rAF-throttled, passive).
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const header = headerRef.current;
      const busy = !!header && header.matches(":focus-within, :hover");
      if (y < 120 || busy) setHidden(false);
      else if (Math.abs(y - lastY) > 6) setHidden(y > lastY);
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Mobile menu: lock scroll, close on Escape, return focus to the burger.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header ref={headerRef} className={s.header} data-hide={hidden && !open ? "" : undefined}>
      <nav aria-label="Main" className={s.nav}>
        <Link href="/" aria-label="Technomiles home" className={s.logo}>
          <LogoSlot />
        </Link>

        <div className={s.links}>
          {nav.map((item) =>
            item.dropdown ? (
              <div key={item.href} className="dd">
                <Link
                  className={"nav-a" + (isNavActive(item.href, pathname) ? " act" : "")}
                  href={item.href}
                  data-text={item.label}
                  aria-current={isNavActive(item.href, pathname) ? "page" : undefined}
                >
                  <span>{item.label}</span>
                </Link>
                <Icon name="chevron" size={14} strokeWidth={2.4} />
                <div className="dd-menu">
                  <div className="dd-box">
                    {services.map((svc) => (
                      <Link key={svc.slug} className="dd-i" href={svc.route} aria-current={pathname === svc.route ? "page" : undefined}>
                        <span className="dd-ic">
                          <Icon name={svc.slug} size={20} strokeWidth={1.8} />
                        </span>
                        <span className={s.ddText}>
                          <span className={s.ddTitle}>{svc.title}</span>
                          <span className={s.ddLine}>{svc.homeCardText}</span>
                        </span>
                        <Icon name="arrow" className="dd-ar" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                className={"nav-a" + (isNavActive(item.href, pathname) ? " act" : "")}
                href={item.href}
                data-text={item.label}
                aria-current={isNavActive(item.href, pathname) ? "page" : undefined}
              >
                <span>{item.label}</span>
              </Link>
            ),
          )}
        </div>

        <div className={s.actions}>
          <ThemeToggle className={s.themeDesktop} />
          <Link className={"btn btn-red mag " + s.cta} href="/contact">
            Free consultation
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className={s.burger}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <i />
          <i />
        </button>
      </nav>
    </header>

      <div id="mobile-menu" className={s.menu} hidden={!open}>
        <div className={"grid-bg " + s.menuGrid} aria-hidden="true" />
        <ul className={s.menuList}>
          {nav.map((item, i) => (
            <li key={item.href} style={{ "--i": i } as CSSProperties}>
              <Link
                href={item.href}
                className={"disp " + s.menuLink}
                aria-current={isNavActive(item.href, pathname) ? "page" : undefined}
              >
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
              {item.dropdown && (
                <ul className={s.menuSub}>
                  {services.map((svc) => (
                    <li key={svc.slug}>
                      <Link href={svc.route} className="chip">
                        {svc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className={s.menuFoot} style={{ "--i": nav.length } as CSSProperties}>
          <div className={s.menuActions}>
            <ThemeToggle />
            <Link className="btn btn-red" href="/contact">
              Free consultation <Icon name="arrow" />
            </Link>
          </div>
          <a className="mono" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          <a className="mono" href={telHref(company.phones[0])}>
            {company.phones[0]}
          </a>
        </div>
      </div>
    </>
  );
}

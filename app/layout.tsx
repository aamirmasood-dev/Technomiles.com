import type { Metadata, Viewport } from "next";
import { company, footer } from "@/content";
import { SITE_URL } from "@/lib/routes";
import { organizationJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { InteractionFx } from "@/components/fx/InteractionFx";
import { RevealRoot } from "@/components/fx/RevealRoot";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { JsonLd } from "@/components/ui/JsonLd";
import { PRELOADER_KEY } from "@/lib/preloader";
import { THEME_COLORS, THEME_KEY } from "@/lib/theme";
import { jetbrains, manrope, unbounded } from "./fonts";
import "./globals.css";

// Runs before first paint: restores the saved theme (light is the default; OS preference is ignored)
// and skips the homepage preloader for the rest of the session.
const BOOT_SCRIPT = `(function(){var d=document.documentElement;try{if(localStorage.getItem("${THEME_KEY}")==="dark"){d.classList.add("theme-dark");document.querySelectorAll('meta[name="theme-color"][data-theme]').forEach(function(m){m.media=m.getAttribute("data-theme")==="dark"?"all":"not all"})}}catch(e){}try{if(sessionStorage.getItem("${PRELOADER_KEY}"))d.classList.add("pre-skip","ready")}catch(e){}})()`;
// Without JS: no overlays, and the hero's load-in text is shown immediately.
const NO_JS_CSS = ".wipe,.pre{display:none!important}.in1,.in2,.in3,.in4{opacity:1!important}.ln>span{transform:none!important}";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${company.name} — Digital Agency`, template: `%s — ${company.name}` },
  description: footer.tagline,
  applicationName: company.name,
  openGraph: { siteName: company.name, type: "website", locale: "en_GB" },
};

// theme-color is rendered manually in <head> (one meta per theme, toggled by ThemeToggle).
export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${unbounded.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <head>
        <meta name="theme-color" content={THEME_COLORS.light} data-theme="light" media="all" suppressHydrationWarning />
        <meta name="theme-color" content={THEME_COLORS.dark} data-theme="dark" media="not all" suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <noscript>
          <style>{NO_JS_CSS}</style>
        </noscript>
      </head>
      <body className="site" id="top">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CustomCursor />
        <InteractionFx />
        <RevealRoot />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}

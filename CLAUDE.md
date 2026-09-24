# Technomiles website — Next.js build brief

You are rebuilding **technomiles.com** (currently WordPress) as a fast Next.js site. The design is **final and approved** — your job is to reproduce it faithfully as production code, not to redesign it.

## What's in this folder

| Path | What it is | How to use it |
|---|---|---|
| `design/*.dc.html` | The approved design, one file per page | **Source of truth** for layout, markup, copy, colours, spacing, hover states and animations. Read these before building each page. |
| `styles/global.css` | Shared CSS pulled from the design (tokens, buttons, nav, footer, cursor, reveals, accordion, forms, cards, CTA, testimonials) | Start `app/globals.css` from this. Keep the class names; tidy up, don't restyle. |
| `styles/home.css`, `styles/service-*.css` | Page-specific CSS | Port into CSS Modules (or a scoped stylesheet) for that page. |
| `content/site-content.json` | Every piece of copy and data (services, FAQs, team, testimonials, process, legal text, page-specific data) | Move into `/content` or `/lib/content.ts` as typed data. Pages render from data — **don't hard-code copy in components**. |

### How to read a `.dc.html` design file
They use a small template format. Translate it like this:
- `{{ name }}` → a value computed in the `renderVals()` method in the `<script type="text/x-dc">` block at the bottom → becomes a React prop, state or derived value.
- `<sc-for list="{{items}}" as="item">…</sc-for>` → `items.map(item => …)`.
- `<sc-if value="{{cond}}">…</sc-if>` → `{cond && …}`.
- `onClick="{{handler}}"` → React event handler. `ref="{{xRef}}"` → `useRef`.
- `class Component extends DCLogic` → the page's interactive logic (state, timers, scroll effects). Rewrite as hooks.
- `<script src="./support.js">`, `<x-dc>`, `<helmet>` are design-tool wrappers — ignore them.
- Links like `href="About.dc.html"` map to routes (see the route map below).
- Inline `style="…"` is the design's layout spec. Converting it to CSS Modules/classes is encouraged; values must stay the same.

## Tech stack
- **Next.js (latest, App Router) + TypeScript + React Server Components by default.** Mark only interactive pieces `"use client"`.
- **Styling:** plain CSS, `globals.css` plus CSS Modules. No Tailwind (the design is written in plain CSS; converting it adds risk). No UI kit.
- **Fonts:** `next/font/google` → Unbounded (400/500/700/800), Manrope (400–700), JetBrains Mono (400/500). The Design Studio page also uses DM Serif Display, Syne (600/800) and Space Grotesk (400/600), for its brand playground only. Expose them as CSS variables and keep the `.disp` / `.mono` utility classes.
- **Animation:** hand-written CSS plus small hooks (IntersectionObserver, requestAnimationFrame, scroll listeners). Don't add GSAP or Framer Motion unless something truly can't be done without them. Keep the JS bundle small.
- **Images:** `next/image`. The logo goes in `/public/logo-technomiles.png` (the owner will supply it; use the dashed "TECHNOMILES LOGO" placeholder until then).

## Route map
| Design file | Route |
|---|---|
| home.dc.html | `/` |
| about.dc.html | `/about` |
| contact.dc.html | `/contact` |
| faq.dc.html | `/faq` |
| service-custom-development.dc.html | `/services/custom-development` |
| service-ecommerce.dc.html | `/services/ecommerce` |
| service-design-studio.dc.html | `/services/design-studio` |
| service-social-media-marketing.dc.html | `/services/social-media-marketing` |
| service-seo.dc.html | `/services/seo` |
| privacy-policy.dc.html | `/privacy-policy` |
| terms-and-conditions.dc.html | `/terms-and-conditions` |
| refund-policy.dc.html | `/refund-policy` |

Also add `/services` → redirect to `/services/custom-development` (or a simple index), plus `sitemap.ts`, `robots.ts` and a custom `not-found.tsx` in the same style.

## Design tokens
- Background `#0A0A0D`; deeper sections `#07070A` / `#0D0D11`; cards `#0E0E13` / `#111116`.
- Text `#F2EFEA`; muted `#A09DA6`; dim `#6E6B75`. Borders `rgba(255,255,255,.06–.12)`.
- **Brand red `--red: #E0192F`** (primary; every CTA, highlight and cursor).
- Secondary accent `--acc2`, one per page: Development `#3FD0E0`, E-commerce `#F5B544`, Design `#F4F1EC` (+ `#5B8CFF` tool blue), Marketing `#9B8CFF`, SEO `#B8F25A`. Home and inner pages use cyan `#3FD0E0` sparingly.
- Radii: pills `999px`, cards `20–32px`. Container `max-width: 1280px; padding: 0 40px`.
- Motion easing: `cubic-bezier(.2,.7,.2,1)` (ease-out) and `cubic-bezier(.77,0,.18,1)` (in-out, for wipes and slides).

## Shared components to build (used on every page)
1. **`<SiteHeader>`**: sticky, blurred background, logo, roll-up hover links (`.nav-a` with `data-text`), a **Services dropdown** (5 services with icon + one-liner), and a magnetic "Free consultation" button. It hides on scroll down and shows on scroll up (as on the homepage). Active link state per route.
2. **`<SiteFooter>`**: 5 columns (brand, services, company, legal, contact), bottom bar, giant outlined "TECHNOMILES" wordmark that turns red on hover.
3. **`<CtaSection>`**: the homepage CTA ("Let's build *what's next.*", spinning circular "START A PROJECT" SVG text button, email/phone/visit cards). It goes on every page **except `/contact`**.
4. **`<Testimonials>`**: a 3D stacked card carousel (classes `.tcd p0…p4`). Autoplays every 6.5s, pauses on hover, has initial-dot and arrow controls, and two opposite-direction marquees of client names underneath. Used on `/` and `/about`.
5. **`<CustomCursor>`** (client): red dot, a lagging ring and a soft red glow. The ring grows over links/buttons and becomes a red "VIEW" badge over `[data-cur="view"]`. Only on `(hover:hover) and (pointer:fine)`; hidden on touch. One rAF loop.
6. **Magnetic buttons** (`.mag`) and **tilt cards** (`.tilt`, which set `--mx/--my` for the glare/spotlight): one small client hook shared via event delegation.
7. **`<Reveal>`** / `useReveal`: IntersectionObserver adds `data-in` once. Variants `up | left | right | scale | wipe | scan` (see `[data-rv]` rules in global.css). Stagger with the `--d` CSS variable. The hidden state applies only once JS has mounted (the `.rvon` class on the root), so content is never invisible without JS.
8. **Scroll progress bar** (2px red, top of viewport).
9. **Page transition**: a red-then-black vertical wipe on inner pages (`.wipe`). The **homepage uses the preloader** instead (000→100% counter, bar, split-panel exit), shown **once per session** (use `sessionStorage`), never on every navigation.
10. `<Accordion>`, `<SectionLabel>` (`.lbl` wipe-in label), `<Marquee>`, `<Button>` variants (`btn-red`, `btn-ghost`), `<ArrowLink>`.

## Page notes (details are in each design file)
- **Home:**
  - Hero with an animated 3D perspective grid floor, a glowing eclipse ring, orbiting service chips (mouse parallax) and a rotating word slot (apps → stores → brands → campaigns → rankings).
  - Scroll-linked hero exit: the text zooms and blurs out, the ring rises.
  - Intro paragraph whose words light up one by one while scrolling.
  - Bento grid of the 5 services, each card with a mini animation.
  - Platforms marquee.
  - **Pinned horizontal process** (the section is ~340vh tall, the inner part is `position: sticky`, the track translates with scroll progress).
  - Testimonials, FAQ teaser, CTA.
- **Service pages:** each has its **own** concept. Keep them distinct.
  - Development: typing code editor, module configurator with hub-and-spoke wiring, app-window cards, git-log process.
  - E-commerce: live order feed, platform tabs with store/marketplace mockups, listing-anatomy hotspots, journey.
  - Design: letter-hover editorial hero with design-tool overlays, a **live brand playground** (name input, palettes, type pairings, mark shapes), art tiles, a layers-panel process.
  - Marketing: phone feed with floating hearts, channel mockups, filterable week calendar, funnel.
  - SEO: search results where "yourbusiness.com" climbs to #1, a runnable site-audit demo, SERP-anatomy hotspots, growth path, pillars.
- **About:** story, mission/vision, team cards (hover: scan line + red bio panel), values, testimonials, CTA.
- **Contact:**
  - The form (name, email, phone, service select, message) posts to a **Server Action** that emails `info@technomiles.com` (use Resend or Nodemailer via env vars; leave a clear TODO if keys aren't set).
  - Add validation with inline errors, a honeypot field for spam, a success state as designed, and a map card (swap in a Google Maps embed).
- **FAQ:** live search and category filter chips with counts. Add `FAQPage` JSON-LD.
- **Legal pages:** sticky table of contents with scroll-spy.

## Quality bar
- **Responsive:** the design is desktop-first at 1440px. Build proper tablet (≤1024px) and mobile (≤640px) layouts.
  - Grids collapse to 1 column. Giant display type scales with `clamp()`.
  - The pinned horizontal process becomes a vertical list on mobile.
  - The cursor, magnetic and tilt effects are disabled on touch.
  - The nav becomes a full-screen menu with a staggered reveal.
- **Accessibility:**
  - Real `<button>`/`<a>`, focus-visible styles, `aria-*` as in the design.
  - Tabs and accordions keyboard-operable.
  - Colour contrast ≥ 4.5:1 for body text.
  - `prefers-reduced-motion` disables all non-essential motion.
- **Performance:**
  - Lighthouse ≥ 90 on all categories.
  - Animate only `transform`, `opacity` and `filter`.
  - Scroll handlers are passive and rAF-throttled.
  - No layout thrash; lazy-mount heavy interactive sections.
- **SEO:**
  - Metadata per page via `generateMetadata`, Open Graph image, canonical URLs.
  - JSON-LD: `Organization` / `LocalBusiness` with address and phones on every page, `Service` on service pages, `FAQPage` on FAQ.
- **Code:**
  - Components are small and typed. Content lives in `/content` and is typed.
  - No copy duplicated across pages; shared sections read from the same data.

## Placeholders (keep them visible, don't invent content)
Items marked `[…]` or `PLACEHOLDER` in the content are waiting on the owner:
- the logo file
- testimonial quotes
- team names, roles, bios and photos
- the founding year and story
- office hours and response time
- pricing, timelines and payment methods
- legal dates, notice periods and jurisdiction

Render them as they are. Don't make up facts, stats or reviews.

## Suggested build order
1. Scaffold the project, fonts, `globals.css`, content types, and the layout with `SiteHeader`, `SiteFooter`, `CustomCursor` and the reveal system.
2. Shared sections: `CtaSection`, `Testimonials`, `Accordion`, `Marquee`, page wipe, preloader.
3. Home.
4. About, Contact (with the working form), FAQ.
5. The five service pages, one at a time.
6. Legal pages.
7. Responsive pass, accessibility pass, reduced-motion pass, SEO and JSON-LD, sitemap and robots, Lighthouse fixes.

After each page, run `npm run build` and `npm run lint`, and compare against the matching `design/*.dc.html` file.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

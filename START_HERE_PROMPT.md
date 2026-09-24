# Paste this into Claude Code (VS Code) to start

> Open an empty folder in VS Code, copy this whole handoff folder into it (so `CLAUDE.md`, `design/`, `styles/` and `content/` sit at the project root), then paste the prompt below into Claude Code.

---

I'm rebuilding my agency website, Technomiles, in Next.js. Everything you need is in this folder:

- `CLAUDE.md`: the full build brief (stack, routes, tokens, components, quality bar). Read it first and follow it.
- `design/`: the approved design, one `.dc.html` file per page. This is the source of truth for layout, copy, colours and animations.
- `styles/`: CSS extracted from the design (global plus page-specific).
- `content/site-content.json`: all copy and data.

Please:
1. Read `CLAUDE.md`, then skim `design/home.dc.html` and one service page so you understand the design format.
2. Give me a short plan: folder structure, the list of components, and how you'll handle the shared animations (cursor, reveals, magnetic/tilt, page wipe, preloader). Wait for my OK.
3. Then build in the order given in `CLAUDE.md`, one step at a time. After each step, run `npm run build` and `npm run lint`, fix any errors, and tell me what to check in the browser.

Match the design exactly on desktop, make it fully responsive, and keep every `[placeholder]` visible rather than inventing content. Ask me before adding any new library.

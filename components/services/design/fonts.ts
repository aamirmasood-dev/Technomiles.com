import { DM_Serif_Display, Space_Grotesk, Syne } from "next/font/google";

// Brand-playground-only fonts (Design Studio page). Not preloaded: they're below the fold.
export const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dmserif", display: "swap", preload: false });
export const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap", preload: false });
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-spacegrotesk", display: "swap", preload: false });

export const playgroundFontVars = `${dmSerif.variable} ${syne.variable} ${spaceGrotesk.variable}`;

/** Content names fonts by family ("'Syne', sans-serif"); map them onto the next/font variables. */
const FAMILY_VARS: Record<string, string> = {
  Unbounded: "var(--font-unbounded)",
  Manrope: "var(--font-manrope)",
  "DM Serif Display": "var(--font-dmserif)",
  Syne: "var(--font-syne)",
  "Space Grotesk": "var(--font-spacegrotesk)",
};

export function resolveFontStack(stack: string): string {
  return stack.replace(/'([^']+)'/g, (m, fam: string) => FAMILY_VARS[fam] ?? m);
}

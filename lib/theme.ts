import type { ServiceSlug } from "@/content";

/** localStorage key for the visitor's colour scheme ('light' | 'dark'). Light is the default. */
export const THEME_KEY = "tm-theme";
export const THEME_COLORS = { light: "#F6F4F0", dark: "#0A0A0D" } as const;

/** Per-service accent as a theme token (the content hex values are the dark-theme originals). */
export const ACCENT_VAR: Record<ServiceSlug, string> = {
  "custom-development": "var(--cyan)",
  ecommerce: "var(--amber)",
  "design-studio": "var(--ivory)",
  "social-media-marketing": "var(--violet)",
  seo: "var(--lime)",
};

/** Fine pointer + real hover: desktop mouse/trackpad. Cursor, magnetic and tilt only run here. */
export const FINE_POINTER = "(hover:hover) and (pointer:fine)";
export const REDUCED_MOTION = "(prefers-reduced-motion:reduce)";

export const matches = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches;

import type { CSSProperties, ReactNode } from "react";

/** Red mono eyebrow with the wipe-in dash (".lbl"). */
export function SectionLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div data-rv="wipe" className="lbl mono sec-lbl" style={style}>
      {children}
    </div>
  );
}

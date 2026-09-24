import type { CSSProperties, ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

export type RevealVariant = "up" | "left" | "right" | "scale" | "wipe" | "scan";

type RevealProps<T extends ElementType> = {
  as?: T;
  v?: RevealVariant;
  /** Stagger delay in seconds (sets the --d CSS variable). */
  d?: number;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Server-safe wrapper that renders `data-rv` + `--d`. RevealRoot does the observing. */
export function Reveal<T extends ElementType = "div">({ as, v = "up", d, style, children, ...rest }: RevealProps<T>) {
  const Tag: ElementType = as ?? "div";
  const s = d !== undefined ? ({ "--d": `${d}s`, ...style } as CSSProperties) : style;
  return (
    <Tag data-rv={v} style={s} {...rest}>
      {children}
    </Tag>
  );
}

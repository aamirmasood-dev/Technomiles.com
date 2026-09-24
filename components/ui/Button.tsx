import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "./Icon";

type ButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "red" | "ghost";
  /** Magnetic hover (desktop only). Default true. */
  mag?: boolean;
  arrow?: boolean;
};

/** Pill link-button: `.btn .btn-red` / `.btn .btn-ghost`. */
export function Button({ variant = "red", mag = true, arrow = false, className, children, ...rest }: ButtonProps) {
  const cls = ["btn", `btn-${variant}`, mag && "mag", className].filter(Boolean).join(" ");
  return (
    <Link className={cls} {...rest}>
      {children}
      {arrow && <Icon name="arrow" />}
    </Link>
  );
}

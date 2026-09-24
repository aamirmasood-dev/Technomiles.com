import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "./Icon";

type ArrowLinkProps = ComponentPropsWithoutRef<typeof Link>;

/** Red text link with a sliding arrow (".arrow-link"). */
export function ArrowLink({ children, className, ...rest }: ArrowLinkProps) {
  return (
    <Link className={"arrow-link" + (className ? " " + className : "")} {...rest}>
      {children} <Icon name="arrow" />
    </Link>
  );
}

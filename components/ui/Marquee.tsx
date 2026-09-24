import type { CSSProperties, ReactNode } from "react";

/**
 * Infinite marquee. Children are rendered in two identical groups (the second is aria-hidden)
 * and the track slides by -50%, using the design's `.marq` / `.marq-r` keyframes.
 * Each group carries its own trailing gap so the loop is seamless.
 */
export function Marquee({
  children,
  reverse = false,
  gap = 40,
  duration,
  className,
  groupClassName,
  style,
}: {
  children: ReactNode;
  reverse?: boolean;
  gap?: number;
  /** Override the keyframe duration in seconds (keep px/s equal to the design when the group is longer). */
  duration?: number;
  className?: string;
  groupClassName?: string;
  style?: CSSProperties;
}) {
  const group: CSSProperties = { display: "flex", alignItems: "center", gap, paddingRight: gap, flex: "0 0 auto" };
  return (
    <div className={"marq-wrap" + (className ? " " + className : "")} style={{ overflow: "hidden", ...style }}>
      <div className={reverse ? "marq-r" : "marq"} style={{ display: "flex", width: "max-content", animationDuration: duration ? `${duration}s` : undefined }}>
        <div className={groupClassName} style={group}>
          {children}
        </div>
        <div className={groupClassName} style={group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

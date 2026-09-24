import type { CSSProperties } from "react";

/**
 * Dashed placeholder until the owner supplies /public/logo-technomiles.png.
 * Swap the body for <Image src="/logo-technomiles.png" … /> once the file exists.
 */
export function LogoSlot({ width = 190, height = 48, style }: { width?: number; height?: number; style?: CSSProperties }) {
  return (
    <div className="logo-slot" style={{ width, height, ...style }}>
      TECHNOMILES LOGO
    </div>
  );
}

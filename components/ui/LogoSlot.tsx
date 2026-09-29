import Image from "next/image";
import type { CSSProperties } from "react";
import { company } from "@/content";
import { asset } from "@/lib/asset";

/**
 * Technomiles logo (public/logo-technomiles.png, 150×41, light artwork).
 * In the light theme it's darkened with a CSS filter (.logo-img in globals.css).
 */
export function LogoSlot({ width = 150, style }: { width?: number; height?: number; style?: CSSProperties }) {
  return (
    <Image
      className="logo-img"
      src={asset(company.logo)}
      alt={company.name}
      width={width}
      height={Math.round((width * 41) / 150)}
      priority
      style={style}
    />
  );
}

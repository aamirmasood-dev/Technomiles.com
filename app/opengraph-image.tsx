import { ImageResponse } from "next/og";
import { company, footer, home } from "@/content";

// Default social-share image for every page (1200×630). Uses the system font set by next/og.
export const alt = `${company.name} — Digital Agency`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(224,25,47,.45), #0A0A0D 70%)",
          color: "#F2EFEA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 6, color: "#A09DA6" }}>
          <div style={{ width: 48, height: 2, background: "#E0192F" }} />
          {home.hero.meta}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>{company.name.toUpperCase()}</div>
          <div style={{ fontSize: 36, color: "#A09DA6", maxWidth: 900 }}>{footer.tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#6E6B75" }}>
          <span>{company.email}</span>
          <span style={{ color: "#E0192F" }}>technomiles.com</span>
        </div>
      </div>
    ),
    size,
  );
}

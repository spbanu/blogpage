import { ImageResponse } from "next/og";
import { siteConfig } from "./site";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: dark charcoal, monospace eyebrow, large title. */
export function renderOgImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#15171c",
          color: "#e6e8ec",
          backgroundImage:
            "linear-gradient(to right, #22262e 1px, transparent 1px), linear-gradient(to bottom, #22262e 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              border: "2px solid #3b414d",
              borderRadius: 10,
              color: "#4fd1c5",
              fontSize: 24,
              background: "#1c1f26",
            }}
          >
            B/
          </div>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#a6adbb" }}>
            {siteConfig.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: "#4fd1c5" }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 70, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8a92a2" }}>{footer ?? siteConfig.tagline}</div>
      </div>
    ),
    ogSize,
  );
}

import { renderOgImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Banu Engineering — Real-world engineering. Secure software. Modern .NET. AI-assisted development.";

export default function Image() {
  return renderOgImage({ eyebrow: "Personal Engineering Blog", title: "Building better software, one problem at a time." });
}

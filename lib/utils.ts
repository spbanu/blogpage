import GithubSlugger from "github-slugger";
import type { Heading } from "./types";

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * URL-safe slug for tags and categories that keeps technology names distinct
 * (".NET" → "dotnet", "C#" → "csharp", "ASP.NET Core" → "aspnet-core").
 */
export function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/c#/g, "csharp")
    .replace(/(^|\s)\.net/g, "$1dotnet")
    .replace(/\.net/g, "net")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  timeZone: "UTC",
});

export function formatDate(iso: string, style: "day" | "month" = "day") {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return (style === "month" ? monthFormatter : dateFormatter).format(date);
}

const WORDS_PER_MINUTE = 220;

/** Estimated reading time in minutes. Code blocks count at half weight. */
export function estimateReadingTime(source: string) {
  const code = source.match(/```[\s\S]*?```/g)?.join(" ") ?? "";
  const prose = source.replace(/```[\s\S]*?```/g, " ").replace(/<[^>]+>/g, " ");
  const words = (text: string) => text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round((words(prose) + words(code) / 2) / WORDS_PER_MINUTE));
}

/**
 * Extract h2/h3 headings from an MDX body for the table of contents.
 * Uses the same slugger as rehype-slug so ids match the rendered headings.
 */
export function extractHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of source.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = match[2]!
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[`*_]/g, "")
      .trim();
    headings.push({ depth: match[1]!.length as 2 | 3, text, id: slugger.slug(text) });
  }
  return headings;
}

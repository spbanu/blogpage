import type { SearchItem } from "./types";

function normalize(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

/**
 * Lightweight ranked search across title, tags, category and description.
 * Every query term must match somewhere; title matches rank highest.
 * Kept dependency-free so it can later be swapped for semantic search.
 */
export function searchItems(items: SearchItem[], query: string, limit = 20): SearchItem[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored: Array<{ item: SearchItem; score: number }> = [];

  for (const item of items) {
    const title = normalize(item.title);
    const tags = normalize((item.tags ?? []).join(" "));
    const category = normalize(item.category ?? "");
    const description = normalize(item.description ?? "");

    let score = 0;
    let allMatch = true;
    for (const term of terms) {
      let termScore = 0;
      if (title.startsWith(term)) termScore += 12;
      else if (title.includes(term)) termScore += 8;
      if (tags.includes(term)) termScore += 5;
      if (category.includes(term)) termScore += 4;
      if (description.includes(term)) termScore += 2;
      if (termScore === 0) {
        allMatch = false;
        break;
      }
      score += termScore;
    }
    if (!allMatch) continue;

    // Prefer content over taxonomy entries when scores tie.
    if (item.type === "article" || item.type === "project") score += 1;
    scored.push({ item, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map(({ item }) => item);
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, type ArticleSummary } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArticleGrid } from "@/components/cards/ArticleCard";
import { Pagination } from "@/components/ui/Pagination";
import { SearchIcon } from "@/components/ui/Icons";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most-read", label: "Most Read" },
] as const;
type Sort = (typeof SORTS)[number]["value"];

const PAGE_SIZE = 9;

function matches(article: ArticleSummary, terms: string[]) {
  const haystack = [article.title, article.description, article.category, ...article.tags].join(" ").toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

/**
 * Search, category filter, sorting and pagination for the article index.
 * State lives in the URL (?q=&category=&sort=&page=) so views are shareable.
 */
export function ArticleExplorer({ articles }: { articles: ArticleSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const query = params.get("q") ?? "";
  const categoryParam = params.get("category");
  const category = CATEGORIES.find((c) => c === categoryParam) ?? "All";
  const sort: Sort = SORTS.some((s) => s.value === params.get("sort")) ? (params.get("sort") as Sort) : "newest";
  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);
  const [searchText, setSearchText] = useState(query);

  const update = useCallback(
    (changes: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [key, value] of Object.entries(changes)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      if (!("page" in changes)) next.delete("page");
      const search = next.toString();
      router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const result = articles.filter(
      (article) => (category === "All" || article.category === category) && matches(article, terms),
    );
    return result.sort((a, b) => {
      if (sort === "oldest") return a.publishedAt.localeCompare(b.publishedAt);
      if (sort === "most-read") {
        return (b.views ?? 0) - (a.views ?? 0) || Number(b.featured) - Number(a.featured) || b.publishedAt.localeCompare(a.publishedAt);
      }
      return b.publishedAt.localeCompare(a.publishedAt);
    });
  }, [articles, category, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const article of articles) map.set(article.category, (map.get(article.category) ?? 0) + 1);
    return map;
  }, [articles]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
          <label htmlFor="article-search" className="sr-only">
            Search articles by title, description, tag or category
          </label>
          <input
            id="article-search"
            type="search"
            value={searchText}
            placeholder="Search articles, tags, categories…"
            onChange={(event) => {
              setSearchText(event.target.value);
              update({ q: event.target.value.trim() });
            }}
            className="h-10 w-full rounded-md border border-border bg-elevated pl-9 pr-3 text-sm text-fg placeholder:text-faint focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="article-sort" className="font-mono text-xs text-faint">
            Sort
          </label>
          <select
            id="article-sort"
            value={sort}
            onChange={(event) => update({ sort: event.target.value === "newest" ? null : event.target.value })}
            className="h-10 rounded-md border border-border bg-elevated px-3 text-sm text-fg focus:border-accent focus:outline-none"
          >
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div role="group" aria-label="Filter by category" className="mt-5 flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((option) => {
          const selected = option === category;
          const count = option === "All" ? articles.length : (counts.get(option) ?? 0);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => update({ category: option === "All" ? null : option })}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors",
                selected
                  ? "border-accent bg-accent-soft text-fg"
                  : "border-border text-muted hover:border-border-strong hover:text-fg",
              )}
            >
              {option}
              <span className="font-mono text-[11px] text-faint">{count}</span>
            </button>
          );
        })}
      </div>

      <p role="status" aria-live="polite" className="mt-8 font-mono text-xs text-faint">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {query && <> matching &ldquo;{query}&rdquo;</>}
        {category !== "All" && <> in {category}</>}
      </p>

      <div className="mt-4">
        {visible.length > 0 ? (
          <ArticleGrid articles={visible} headingLevel={2} />
        ) : (
          <div className="rounded-lg border border-dashed border-border p-10 text-center">
            <p className="text-muted">No articles match your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchText("");
                update({ q: null, category: null });
              }}
              className="mt-3 text-sm text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <Pagination
        page={currentPage}
        pageCount={pageCount}
        onChange={(next) => {
          update({ page: next === 1 ? null : String(next) });
          document.getElementById("main-content")?.scrollIntoView();
        }}
        className="mt-10"
      />
    </div>
  );
}

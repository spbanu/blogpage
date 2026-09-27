"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchItem } from "@/lib/types";
import { searchItems } from "@/lib/search";
import { cn } from "@/lib/utils";
import { BoxIcon, CloseIcon, FileIcon, FolderIcon, HashIcon, SearchIcon } from "@/components/ui/Icons";
import { OPEN_SEARCH_EVENT } from "./searchEvents";

const TYPE_META = {
  article: { label: "Article", Icon: FileIcon },
  project: { label: "Project", Icon: BoxIcon },
  tag: { label: "Tag", Icon: HashIcon },
  category: { label: "Category", Icon: FolderIcon },
} as const;

type LoadState = "idle" | "loading" | "ready" | "error";

/**
 * Global search (Ctrl/⌘ + K). The index is a static JSON file generated at
 * build time and fetched only the first time search is opened.
 */
export function SearchDialog() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const loadIndex = useCallback(async () => {
    if (loadState === "loading" || loadState === "ready") return;
    setLoadState("loading");
    try {
      const response = await fetch("/search-index.json");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setIndex((await response.json()) as SearchItem[]);
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, [loadState]);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    inputRef.current?.focus();
    void loadIndex();
  }, [loadIndex]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_SEARCH_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_SEARCH_EVENT, open);
    };
  }, [open, close]);

  const results = useMemo(() => searchItems(index, query), [index, query]);

  const navigate = useCallback(
    (item: SearchItem) => {
      close();
      setQuery("");
      router.push(item.href);
    },
    [close, router],
  );

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      const item = results[active];
      if (item) {
        event.preventDefault();
        navigate(item);
      }
    }
  };

  useEffect(() => {
    document.getElementById(`${listboxId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listboxId]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the site"
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      className="m-0 mx-auto mt-[10vh] w-[calc(100%-2rem)] max-w-2xl rounded-xl border border-border bg-elevated p-0 text-fg shadow-2xl shadow-black/30 backdrop:bg-black/50"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <SearchIcon className="size-5 shrink-0 text-faint" />
        <label htmlFor={`${listboxId}-input`} className="sr-only">
          Search engineering articles
        </label>
        <input
          ref={inputRef}
          id={`${listboxId}-input`}
          type="search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={results[active] ? `${listboxId}-${active}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search engineering articles..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKeyDown}
          className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-faint [&::-webkit-search-cancel-button]:hidden"
        />
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-faint sm:block">
          Esc
        </kbd>
        <button
          type="button"
          onClick={close}
          aria-label="Close search"
          className="rounded p-1 text-faint hover:text-fg sm:hidden"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-2">
        {loadState === "error" && (
          <p className="px-3 py-8 text-center text-sm text-danger">Search is unavailable right now. Please try again.</p>
        )}
        {loadState !== "error" && query.trim() === "" && (
          <p className="px-3 py-8 text-center text-sm text-faint">
            Search articles, projects, tags and categories.
          </p>
        )}
        {loadState === "ready" && query.trim() !== "" && results.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-faint">
            No results for <span className="text-fg">&ldquo;{query}&rdquo;</span>
          </p>
        )}
        {results.length > 0 && (
          <ul id={listboxId} role="listbox" aria-label="Search results" className="space-y-1">
            {results.map((item, i) => {
              const { label, Icon } = TYPE_META[item.type];
              return (
                <li
                  key={`${item.type}-${item.href}`}
                  id={`${listboxId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => navigate(item)}
                  className={cn(
                    "flex cursor-pointer gap-3 rounded-lg px-3 py-2.5",
                    i === active ? "bg-subtle" : "hover:bg-subtle/60",
                  )}
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-faint" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="truncate font-medium text-fg">{item.title}</span>
                      <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-faint">
                        {item.category ?? label}
                      </span>
                    </div>
                    {item.description && <p className="mt-0.5 line-clamp-1 text-sm text-muted">{item.description}</p>}
                    {item.tags && item.tags.length > 0 && (
                      <p className="mt-1 truncate font-mono text-[11px] text-faint">
                        {item.tags.map((tag) => `#${tag}`).join("  ")}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="hidden items-center gap-4 border-t border-border px-4 py-2 font-mono text-[11px] text-faint sm:flex">
        <span>↑↓ navigate</span>
        <span>↵ open</span>
        <span>Ctrl K toggle</span>
      </div>
    </dialog>
  );
}

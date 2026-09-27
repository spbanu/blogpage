"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "@/components/ui/Icons";
import { openSearch } from "./searchEvents";

export function SearchButton({ compact = false, className }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search (Ctrl + K)"
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-md border border-border text-muted hover:border-border-strong hover:text-fg",
          className,
        )}
      >
        <SearchIcon className="size-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search (Ctrl + K)"
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-md border border-border bg-elevated/60 pl-3 pr-1.5 text-sm text-faint transition-colors hover:border-border-strong hover:text-muted",
        className,
      )}
    >
      <SearchIcon className="size-4" />
      <span className="pr-6">Search</span>
      <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px]">Ctrl K</kbd>
    </button>
  );
}

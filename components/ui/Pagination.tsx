import { cn } from "@/lib/utils";

/** Accessible page selector. Stateless — the parent owns the current page. */
export function Pagination({
  page,
  pageCount,
  onChange,
  className,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  className?: string;
}) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const button = "inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 font-mono text-xs transition-colors disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav aria-label="Pagination" className={cn("flex flex-wrap items-center justify-center gap-1.5", className)}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={cn(button, "border-border text-muted hover:border-border-strong hover:text-fg")}
      >
        ← Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          aria-label={`Page ${p}`}
          className={cn(
            button,
            p === page ? "border-accent text-accent" : "border-border text-muted hover:border-border-strong hover:text-fg",
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        className={cn(button, "border-border text-muted hover:border-border-strong hover:text-fg")}
      >
        Next →
      </button>
    </nav>
  );
}

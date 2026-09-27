import Link from "next/link";
import type { ArticleSummary } from "@/lib/types";

/** Previous / next article navigation. */
export function ArticlePager({ previous, next }: { previous?: ArticleSummary; next?: ArticleSummary }) {
  if (!previous && !next) return null;
  return (
    <nav aria-label="More articles" className="grid gap-4 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/articles/${previous.slug}`}
          rel="prev"
          className="group rounded-lg border border-border p-4 transition-colors hover:border-border-strong"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">← Previous</span>
          <span className="mt-1 block font-medium text-fg group-hover:text-accent">{previous.title}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <Link
          href={`/articles/${next.slug}`}
          rel="next"
          className="group rounded-lg border border-border p-4 text-right transition-colors hover:border-border-strong"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Next →</span>
          <span className="mt-1 block font-medium text-fg group-hover:text-accent">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}

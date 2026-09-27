import Link from "next/link";
import type { Series } from "@/lib/taxonomy";
import { getArticleBySlug } from "@/lib/content";
import { cn } from "@/lib/utils";

/** An ordered article series or learning path. Unpublished items are marked as planned. */
export function SeriesList({ series, className }: { series: Series; className?: string }) {
  const published = series.items.filter((item) => item.slug && getArticleBySlug(item.slug)).length;
  const headingId = `series-${series.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section aria-labelledby={headingId} className={cn("rounded-lg border border-border bg-elevated p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 id={headingId} className="text-lg font-semibold tracking-tight text-fg">
          {series.title}
        </h3>
        <p className="font-mono text-xs text-faint">
          {published}/{series.items.length} published
        </p>
      </div>
      <p className="mt-1.5 text-sm text-muted">{series.description}</p>
      <ol className="mt-5 space-y-1">
        {series.items.map((item, index) => {
          const article = item.slug ? getArticleBySlug(item.slug) : undefined;
          const number = String(index + 1).padStart(2, "0");
          return (
            <li key={`${item.title}-${index}`}>
              {article ? (
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex items-baseline gap-3 rounded px-2 py-1.5 hover:bg-subtle"
                >
                  <span className="font-mono text-xs text-accent">{number}</span>
                  <span className="text-sm text-fg group-hover:text-accent">{item.title}</span>
                  <span className="ml-auto shrink-0 font-mono text-[11px] text-faint">{article.readingTime} min</span>
                </Link>
              ) : (
                <div className="flex items-baseline gap-3 px-2 py-1.5">
                  <span className="font-mono text-xs text-faint">{number}</span>
                  <span className="text-sm text-faint">{item.title}</span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-wider text-faint">Planned</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

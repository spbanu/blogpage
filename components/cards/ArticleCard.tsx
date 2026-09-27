import Link from "next/link";
import type { ArticleSummary } from "@/lib/types";
import { cn, formatDate, toSlug } from "@/lib/utils";
import { DifficultyBadge } from "@/components/ui/Badge";

export function ArticleCard({
  article,
  headingLevel = 3,
  className,
}: {
  article: ArticleSummary;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-border bg-elevated p-5 transition-colors hover:border-border-strong",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent">{article.category}</p>
        {article.difficulty && <DifficultyBadge level={article.difficulty} />}
      </div>
      <Heading className="mt-3 text-lg font-semibold leading-snug tracking-tight text-fg">
        <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0 after:rounded-lg">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
            {article.title}
          </span>
        </Link>
      </Heading>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{article.description}</p>
      <div className="mt-auto pt-5">
        {article.tags.length > 0 && (
          <ul className="relative z-10 mb-4 flex flex-wrap gap-1.5" aria-label="Tags">
            {article.tags.slice(0, 3).map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tags/${toSlug(tag)}`}
                  className="font-mono text-[11px] text-faint hover:text-accent"
                >
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="font-mono text-xs text-faint">
          {article.readingTime} min read · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, "month")}</time>
        </p>
      </div>
    </article>
  );
}

export function ArticleGrid({
  articles,
  headingLevel,
  className,
}: {
  articles: ArticleSummary[];
  headingLevel?: 2 | 3;
  className?: string;
}) {
  if (articles.length === 0) {
    return <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted">No articles yet.</p>;
  }
  return (
    <ul className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}

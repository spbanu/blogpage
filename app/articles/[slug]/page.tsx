import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticlePager } from "@/components/article/ArticlePager";
import { Discussion } from "@/components/article/Discussion";
import { Feedback } from "@/components/article/Feedback";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { TableOfContents } from "@/components/article/TableOfContents";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TagList } from "@/components/ui/Tag";
import {
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
  getArticlesBySeries,
  getRelatedArticles,
  toArticleSummary,
} from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { formatDate, toSlug } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const path = `/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author, url: "/about" }],
    keywords: article.tags,
    category: article.category,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: article.title,
      description: article.description,
      siteName: siteConfig.name,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      ...(siteConfig.twitterHandle ? { creator: siteConfig.twitterHandle } : {}),
    },
  };
}

const categoryHome: Record<string, string> = {
  Security: "/security",
  ".NET": "/dotnet",
  "AI Engineering": "/ai",
  "Engineering Experience": "/experience",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const content = await renderMdx(article.content);
  const { previous, next } = getAdjacentArticles(article.slug);
  const related = getRelatedArticles(article);
  const seriesArticles = article.series ? getArticlesBySeries(article.series) : [];

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: article.title, href: `/articles/${article.slug}` },
  ];
  const categoryHref = categoryHome[article.category] ?? `/articles?category=${encodeURIComponent(article.category)}`;

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <Breadcrumb crumbs={crumbs} />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:px-8 xl:gap-20">
        <article className="min-w-0 max-w-3xl">
          <header className="border-b border-border pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={categoryHref}
                className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent hover:text-accent-strong"
              >
                {article.category}
              </Link>
              {article.difficulty && <DifficultyBadge level={article.difficulty} />}
              {article.series && (
                <span className="font-mono text-[11px] text-faint">
                  Series: {article.series}
                  {article.seriesOrder ? ` · Part ${article.seriesOrder}` : ""}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl lg:text-[2.6rem]">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted">{article.description}</p>
            <p className="mt-6 font-mono text-xs text-faint">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {article.readingTime} min
              read
              {article.updatedAt && (
                <>
                  {" "}
                  · Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                </>
              )}
            </p>
            <p className="mt-1 font-mono text-xs text-faint">
              Author:{" "}
              <Link href="/about" rel="author" className="text-muted hover:text-fg">
                {article.author}
              </Link>
            </p>
          </header>

          {article.headings.length > 0 && (
            <details className="mt-8 rounded-lg border border-border bg-elevated px-4 py-3 lg:hidden">
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.2em] text-faint">
                On this page
              </summary>
              <TableOfContents headings={article.headings} className="mt-4" />
            </details>
          )}

          <div
            id="article-body"
            className="prose prose-article mt-10 max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-14 prose-h2:text-2xl prose-h3:text-xl prose-pre:my-0"
          >
            {content}
          </div>

          <footer className="mt-14 space-y-10 border-t border-border pt-10">
            <div>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">Tags</h2>
              <TagList tags={article.tags} />
            </div>

            {seriesArticles.length > 1 && (
              <nav aria-labelledby="series-nav" className="rounded-lg border border-border bg-elevated p-5">
                <h2 id="series-nav" className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                  Series · {article.series}
                </h2>
                <ol className="mt-3 space-y-1.5">
                  {seriesArticles.map((item) => (
                    <li key={item.slug} className="text-sm">
                      {item.slug === article.slug ? (
                        <span aria-current="page" className="text-fg">
                          → {item.title}
                        </span>
                      ) : (
                        <Link href={`/articles/${item.slug}`} className="text-muted hover:text-accent">
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <Feedback slug={article.slug} />
            <ArticlePager
              previous={previous ? toArticleSummary(previous) : undefined}
              next={next ? toArticleSummary(next) : undefined}
            />
          </footer>
        </article>

        <aside className="hidden lg:block" aria-label="Article navigation">
          <div className="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto pb-8">
            <TableOfContents headings={article.headings} />
            <div className="mt-8 border-t border-border pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Category</p>
              <Link href={categoryHref} className="mt-2 inline-block text-sm text-muted hover:text-accent">
                {article.category}
              </Link>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Topics</p>
              <ul className="mt-2 space-y-1">
                {article.tags.slice(0, 5).map((tag) => (
                  <li key={tag}>
                    <Link href={`/tags/${toSlug(tag)}`} className="font-mono text-xs text-faint hover:text-accent">
                      #{tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-4 pt-16 sm:px-6 lg:px-8">
        {related.length > 0 && (
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-6 text-xl font-semibold tracking-tight text-fg">
              Related articles
            </h2>
            <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ArticleCard article={toArticleSummary(item)} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="max-w-3xl">
          <Discussion />
        </div>
      </div>

      <JsonLd data={[articleJsonLd(article), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}

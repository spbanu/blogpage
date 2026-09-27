import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Article preview";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return renderOgImage({
    eyebrow: article ? `${article.category} · ${article.readingTime} min read` : "Article",
    title: article?.title ?? "Banu Engineering",
    footer: article ? `By ${article.author}` : undefined,
  });
}

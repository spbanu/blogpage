import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleGrid } from "@/components/cards/ArticleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllTags, getArticlesByTag, toArticleSummary } from "@/lib/content";
import { breadcrumbJsonLd, sectionMetadata } from "@/lib/seo";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getAllTags().find((t) => t.slug === slug);
  if (!tag) return {};
  return sectionMetadata({
    title: `#${tag.name}`,
    description: `Articles tagged ${tag.name} on Banu Engineering.`,
    path: `/tags/${tag.slug}`,
  });
}

export default async function TagPage({ params }: Props) {
  const { tag: slug } = await params;
  const tag = getAllTags().find((t) => t.slug === slug);
  if (!tag) notFound();
  const articles = getArticlesByTag(slug).map(toArticleSummary);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Tags", href: "/tags" },
    { label: `#${tag.name}`, href: `/tags/${tag.slug}` },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Tag"
        title={`#${tag.name}`}
        subtitle={`${articles.length} ${articles.length === 1 ? "article" : "articles"} tagged ${tag.name}.`}
        crumbs={crumbs}
      />
      <Container className="py-12">
        <ArticleGrid articles={articles} headingLevel={2} />
        <ArrowLink href="/tags" className="mt-10">
          Browse all tags
        </ArrowLink>
      </Container>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

import { Suspense } from "react";
import { ArticleExplorer } from "@/components/article/ArticleExplorer";
import { ArticleGrid } from "@/components/cards/ArticleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getArticleSummaries } from "@/lib/content";
import { breadcrumbJsonLd, sectionMetadata } from "@/lib/seo";

const title = "Engineering Articles";
const description = "Practical notes on software engineering, security, .NET and AI.";

export const metadata = sectionMetadata({ title, description, path: "/articles" });

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
];

export default function ArticlesPage() {
  const articles = getArticleSummaries();
  return (
    <>
      <PageHeader eyebrow="Articles" title={title} subtitle={description} crumbs={crumbs} />
      <Container className="py-12">
        {/* The fallback is the statically rendered list, so content is crawlable without JavaScript. */}
        <Suspense fallback={<ArticleGrid articles={articles} headingLevel={2} />}>
          <ArticleExplorer articles={articles} />
        </Suspense>
      </Container>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

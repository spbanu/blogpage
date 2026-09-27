import { ArticleGrid } from "@/components/cards/ArticleCard";
import { SectionBlock } from "@/components/sections/SectionBlock";
import { SeriesList } from "@/components/sections/SeriesList";
import { TopicList } from "@/components/sections/TopicList";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { getArticlesByCategory, toArticleSummary } from "@/lib/content";
import { breadcrumbJsonLd, sectionMetadata } from "@/lib/seo";
import { advancedCSharpPath, aspNetCorePath, dotnetTopics } from "@/lib/taxonomy";

const title = "Modern .NET Engineering";
const description = "C#, ASP.NET Core, performance, concurrency and architecture — for engineers who ship .NET to production.";

export const metadata = sectionMetadata({ title, description, path: "/dotnet" });

const crumbs = [
  { label: "Home", href: "/" },
  { label: ".NET", href: "/dotnet" },
];

export default function DotnetPage() {
  const articles = getArticlesByCategory(".NET").map(toArticleSummary);
  return (
    <>
      <PageHeader eyebrow=".NET" title={title} subtitle={description} crumbs={crumbs}>
        <TopicList topics={dotnetTopics} label=".NET topics" />
      </PageHeader>

      <SectionBlock
        id="dotnet-paths"
        eyebrow="Learning paths"
        title="Featured Learning Paths"
        description="Ordered topics that build on each other. Published entries are linked; the rest are on the roadmap."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <SeriesList series={advancedCSharpPath} />
          <SeriesList series={aspNetCorePath} />
        </div>
      </SectionBlock>

      <SectionBlock id="dotnet-articles" eyebrow="Articles" title=".NET Articles">
        <ArticleGrid articles={articles} />
      </SectionBlock>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

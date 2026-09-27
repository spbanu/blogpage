import { ArticleGrid } from "@/components/cards/ArticleCard";
import { SectionBlock } from "@/components/sections/SectionBlock";
import { SeriesList } from "@/components/sections/SeriesList";
import { TopicList } from "@/components/sections/TopicList";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { getArticlesByCategory, toArticleSummary } from "@/lib/content";
import { breadcrumbJsonLd, sectionMetadata } from "@/lib/seo";
import { authenticationFundamentals, oauthAndOidc, securityTopics } from "@/lib/taxonomy";

const title = "Security Engineering";
const description = "Understanding how applications authenticate, authorize and protect data.";

export const metadata = sectionMetadata({ title, description, path: "/security" });

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Security", href: "/security" },
];

export default function SecurityPage() {
  const articles = getArticlesByCategory("Security").map(toArticleSummary);
  return (
    <>
      <PageHeader eyebrow="Security" title={title} subtitle={description} crumbs={crumbs}>
        <TopicList topics={securityTopics} label="Security topics" />
      </PageHeader>

      <SectionBlock
        id="security-series"
        eyebrow="Series"
        title="Featured Series"
        description="Structured paths from identity fundamentals to production OAuth flows."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <SeriesList series={authenticationFundamentals} />
          <SeriesList series={oauthAndOidc} />
        </div>
      </SectionBlock>

      <SectionBlock
        id="security-model"
        eyebrow="Mental model"
        title="Where Security Lives in a Request"
        description="Every layer has a job. Authentication proves identity; authorization decides access — at the edge and again next to the data."
      >
        <div className="max-w-xl">
          <ArchitectureDiagram
            title="Secured request path"
            nodes={[
              "Client",
              { label: "API Gateway", note: "TLS, rate limiting" },
              { label: "Authentication", note: "Who is calling?" },
              { label: "Authorization", note: "Are they allowed?" },
              "Application",
              { label: "Database", note: "Least-privilege access" },
            ]}
          />
        </div>
      </SectionBlock>

      <SectionBlock id="security-articles" eyebrow="Articles" title="Security Articles">
        <ArticleGrid articles={articles} />
      </SectionBlock>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

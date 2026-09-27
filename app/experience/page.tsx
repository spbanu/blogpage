import { ArticleGrid } from "@/components/cards/ArticleCard";
import { SectionBlock } from "@/components/sections/SectionBlock";
import { TopicList } from "@/components/sections/TopicList";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { getArticlesByCategory, toArticleSummary } from "@/lib/content";
import { breadcrumbJsonLd, sectionMetadata } from "@/lib/seo";
import { experienceTopics } from "@/lib/taxonomy";

const title = "Engineering Lessons";
const description = "Things I've learned from building, supporting and maintaining software.";

export const metadata = sectionMetadata({ title, description, path: "/experience" });

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Engineering Lessons", href: "/experience" },
];

const upcoming = [
  "Why Technically Correct Code Can Still Be Bad Code",
  "Lessons From Supporting Enterprise Applications",
  "When Technical Debt Becomes a Business Problem",
  "What I Learned From Reviewing Hundreds of Pull Requests",
];

export default function ExperiencePage() {
  const articles = getArticlesByCategory("Engineering Experience").map(toArticleSummary);
  return (
    <>
      <PageHeader eyebrow="Experience" title={title} subtitle={description} crumbs={crumbs}>
        <TopicList topics={experienceTopics} label="Experience topics" />
      </PageHeader>

      <SectionBlock
        id="experience-note"
        eyebrow="How to read these"
        title="Experience, Not Universal Truth"
        description="These articles label their claims as fact, experience, opinion, experiment or lesson learned. What worked in one team and system may not transfer to yours."
      >
        <ArticleGrid articles={articles} />
      </SectionBlock>

      <SectionBlock id="experience-upcoming" eyebrow="Roadmap" title="Coming Up">
        <ul className="grid gap-3 md:grid-cols-2">
          {upcoming.map((item) => (
            <li
              key={item}
              className="flex items-baseline justify-between gap-4 rounded-md border border-dashed border-border px-4 py-3"
            >
              <span className="text-sm text-muted">{item}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-faint">Planned</span>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

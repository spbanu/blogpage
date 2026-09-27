import { ArticleGrid } from "@/components/cards/ArticleCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { CouncilDiagram } from "@/components/diagrams/CouncilDiagram";
import { WorkflowSteps } from "@/components/diagrams/WorkflowSteps";
import { SectionBlock } from "@/components/sections/SectionBlock";
import { SeriesList } from "@/components/sections/SeriesList";
import { TopicList } from "@/components/sections/TopicList";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllProjects, getArticlesByCategory, toArticleSummary, toProjectSummary } from "@/lib/content";
import { breadcrumbJsonLd, sectionMetadata } from "@/lib/seo";
import { aiBuildWorkflow, aiTopics, codingWithAi } from "@/lib/taxonomy";

const title = "AI Engineering";
const description = "Building useful AI systems instead of simply experimenting with prompts.";

export const metadata = sectionMetadata({ title, description, path: "/ai" });

const crumbs = [
  { label: "Home", href: "/" },
  { label: "AI Engineering", href: "/ai" },
];

const reviewRules = [
  {
    title: "Generated ≠ accepted",
    body: "Every AI suggestion is a proposal. It gets read, understood and challenged before it is merged.",
  },
  {
    title: "Tests are the contract",
    body: "AI-written code is held to the same tests, reviews and static analysis as human-written code.",
  },
  {
    title: "Security is reviewed by a human",
    body: "Authentication, authorization, secrets and data handling are always checked manually.",
  },
  {
    title: "Architecture stays a human decision",
    body: "AI can list options and trade-offs; the engineer owns the decision and its consequences.",
  },
];

const councilRoles = [
  { role: "Final decision", detail: "A human owns the problem, weighs the advice and makes the call." },
  { role: "Orchestrator", detail: "Frames the problem, splits the work and consolidates the answers." },
  { role: "Research", detail: "Finds sources, prior art and current documentation — with citations to verify." },
  { role: "Architecture", detail: "Proposes structure, compares options and explains trade-offs." },
  { role: "Red team", detail: "Argues against the proposal, hunting for failure modes and weak assumptions." },
];

export default function AiPage() {
  const articles = getArticlesByCategory("AI Engineering").map(toArticleSummary);
  const projects = getAllProjects()
    .filter((project) => project.technologies.some((tech) => /ai|llm|rag|agent/i.test(tech)))
    .map(toProjectSummary);

  return (
    <>
      <PageHeader eyebrow="AI Engineering" title={title} subtitle={description} crumbs={crumbs}>
        <TopicList topics={aiTopics} label="AI topics" />
      </PageHeader>

      <SectionBlock
        id="ai-workflow"
        eyebrow="Workflow"
        title="How I Use AI to Build Software"
        description="AI accelerates each stage, but it never skips one. Output is reviewed, tested and questioned rather than blindly accepted."
      >
        <WorkflowSteps steps={aiBuildWorkflow} label="AI-assisted build workflow" className="lg:grid-cols-7" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reviewRules.map((rule) => (
            <li key={rule.title} className="rounded-lg border border-border bg-elevated p-5">
              <h3 className="font-semibold tracking-tight text-fg">{rule.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{rule.body}</p>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        id="ai-council"
        eyebrow="Method"
        title="My AI Engineering Council"
        description="Different AI systems should be used for their strengths rather than asking one AI system to perform every role."
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <CouncilDiagram />
          <div>
            <p className="leading-7 text-muted">
              Instead of asking a single assistant to research, design, implement and critique its own work, I split
              those responsibilities into roles. Each role gets a focused brief, and the outputs are compared rather
              than trusted individually. Disagreement between roles is a feature: it shows where the real decisions
              are.
            </p>
            <p className="mt-4 leading-7 text-muted">
              The tools filling each role will change over time. The structure — clear roles, independent critique and
              a human making the final decision — is the part that matters.
            </p>
            <dl className="mt-6 divide-y divide-border rounded-lg border border-border bg-elevated">
              {councilRoles.map((item) => (
                <div key={item.role} className="grid gap-1 px-5 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-accent">{item.role}</dt>
                  <dd className="text-sm text-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="coding-with-ai"
        eyebrow="Series"
        title="Coding With AI"
        description="Practical, reviewed workflows for using AI assistants on real codebases."
      >
        <SeriesList series={codingWithAi} className="max-w-3xl" />
      </SectionBlock>

      <SectionBlock id="ai-articles" eyebrow="Articles" title="AI Engineering Articles">
        <ArticleGrid articles={articles} />
      </SectionBlock>

      {projects.length > 0 && (
        <SectionBlock
          id="ai-projects"
          eyebrow="Projects"
          title="AI Projects"
          action={<ArrowLink href="/projects">All Projects</ArrowLink>}
        >
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

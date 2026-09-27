import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/article/TableOfContents";
import { WorkflowSteps } from "@/components/diagrams/WorkflowSteps";
import { JsonLd } from "@/components/seo/JsonLd";
import { StatusBadge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { WORKFLOW_STAGES } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.id} — ${project.name}`;
  const path = `/projects/${project.slug}`;
  return {
    title,
    description: project.description,
    keywords: project.technologies,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title, description: project.description, siteName: siteConfig.name },
    twitter: { card: "summary_large_image", title, description: project.description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const content = await renderMdx(project.content);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project.id, href: `/projects/${project.slug}` },
  ];
  const headings = [
    { depth: 2 as const, text: "Project Overview", id: "project-overview" },
    { depth: 2 as const, text: "Problem", id: "problem" },
    { depth: 2 as const, text: "Goals", id: "goals" },
    ...project.headings,
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Breadcrumb crumbs={crumbs} />
      </div>

      <header className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded border border-accent/50 bg-accent-soft px-2 py-0.5 font-mono text-sm text-accent">
            {project.id}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{project.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.description}</p>
        <dl className="mt-8 grid max-w-3xl gap-4 font-mono text-xs sm:grid-cols-3">
          <div>
            <dt className="uppercase tracking-[0.2em] text-faint">Stage</dt>
            <dd className="mt-1 text-fg">{project.stage}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="uppercase tracking-[0.2em] text-faint">Technology</dt>
            <dd className="mt-1 text-fg">{project.technologies.join(" · ")}</dd>
          </div>
          {project.startedAt && (
            <div>
              <dt className="uppercase tracking-[0.2em] text-faint">Started</dt>
              <dd className="mt-1 text-fg">
                <time dateTime={project.startedAt}>{formatDate(project.startedAt, "month")}</time>
              </dd>
            </div>
          )}
          {project.updatedAt && (
            <div>
              <dt className="uppercase tracking-[0.2em] text-faint">Last update</dt>
              <dd className="mt-1 text-fg">
                <time dateTime={project.updatedAt}>{formatDate(project.updatedAt)}</time>
              </dd>
            </div>
          )}
        </dl>
      </header>

      <section aria-label="Project workflow progress" className="border-y border-border bg-elevated/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <WorkflowSteps steps={WORKFLOW_STAGES} current={project.stage} label="Project workflow progress" />
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:px-8 xl:gap-20">
        <article className="prose prose-article min-w-0 max-w-3xl prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-14 prose-h2:text-2xl prose-h3:text-xl">
          <h2 id="project-overview" className="!mt-0">
            Project Overview
          </h2>
          <p>{project.description}</p>

          <h2 id="problem">Problem</h2>
          <p>{project.problem}</p>

          <h2 id="goals">Goals</h2>
          <ul>
            {project.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>

          {content}
        </article>

        <aside className="hidden lg:block" aria-label="Project navigation">
          <div className="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto pb-8">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <ArrowLink href="/projects">All projects</ArrowLink>
      </div>

      <JsonLd data={[projectJsonLd(project), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}

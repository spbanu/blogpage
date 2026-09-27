import { ProjectCard } from "@/components/cards/ProjectCard";
import { WorkflowSteps } from "@/components/diagrams/WorkflowSteps";
import { SectionBlock } from "@/components/sections/SectionBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllProjects, toProjectSummary } from "@/lib/content";
import { breadcrumbJsonLd, sectionMetadata } from "@/lib/seo";
import { WORKFLOW_STAGES } from "@/lib/types";

const title = "Engineering Projects";
const description = "Experiments, prototypes and production-oriented AI systems.";

export const metadata = sectionMetadata({ title, description, path: "/projects" });

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
];

export default function ProjectsPage() {
  const projects = getAllProjects().map(toProjectSummary);
  return (
    <>
      <PageHeader eyebrow="Projects" title={title} subtitle={description} crumbs={crumbs} />

      <SectionBlock id="project-list" title="All Projects" description="Each project has an ID (AIC-001, AIC-002…) and is documented through the same eight-stage workflow.">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock
        id="project-workflow"
        eyebrow="Workflow"
        title="How Every Project Is Run"
        description="From problem statement to lessons learned — the same stages, in the same order, on every project page."
      >
        <WorkflowSteps steps={WORKFLOW_STAGES} label="AI project workflow" />
      </SectionBlock>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

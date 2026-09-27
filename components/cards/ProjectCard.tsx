import Link from "next/link";
import type { ProjectSummary } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

export function ProjectCard({ project, className }: { project: ProjectSummary; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-border bg-elevated p-5 transition-colors hover:border-border-strong",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-faint">
          <span className="sr-only">Project ID </span>
          <span className="text-accent">{project.id}</span>
        </p>
        <StatusBadge status={project.status} />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg">
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-lg">
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">{project.description}</p>
      <div className="mt-auto pt-5">
        <p className="font-mono text-xs text-faint">
          <span className="sr-only">Technology: </span>
          {project.technologies.join(" · ")}
        </p>
        <p className="mt-4 text-sm font-medium text-accent" aria-hidden="true">
          View Project <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </p>
      </div>
    </article>
  );
}

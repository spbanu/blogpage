import type { Difficulty, ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const difficultyColor: Record<Difficulty, string> = {
  Beginner: "text-success border-success/40",
  Intermediate: "text-info border-info/40",
  Advanced: "text-warning border-warning/40",
  Expert: "text-danger border-danger/40",
};

const statusColor: Record<ProjectStatus, string> = {
  Research: "text-violet border-violet/40",
  Building: "text-info border-info/40",
  Testing: "text-warning border-warning/40",
  Production: "text-success border-success/40",
};

const base = "inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider";

export function DifficultyBadge({ level, className }: { level: Difficulty; className?: string }) {
  return (
    <span className={cn(base, difficultyColor[level], className)}>
      <span className="sr-only">Difficulty: </span>
      {level}
    </span>
  );
}

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={cn(base, statusColor[status], className)}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      <span className="sr-only">Status: </span>
      {status}
    </span>
  );
}

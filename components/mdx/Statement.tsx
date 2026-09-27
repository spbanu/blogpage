import { cn } from "@/lib/utils";

const types = {
  fact: { label: "Fact", description: "Verifiable, independent of my opinion", classes: "text-info border-info/40" },
  experience: { label: "Experience", description: "What I have observed — context-specific", classes: "text-violet border-violet/40" },
  opinion: { label: "Opinion", description: "My view — reasonable people may disagree", classes: "text-warning border-warning/40" },
  experiment: { label: "Experiment", description: "Something I tried — results may not generalise", classes: "text-accent border-accent/40" },
  lesson: { label: "Lesson Learned", description: "What I would do differently next time", classes: "text-success border-success/40" },
} as const;

export type StatementType = keyof typeof types;

/**
 * Makes the nature of a claim explicit, so personal experience is never
 * presented as universal truth.
 *
 *   <Statement type="opinion">Most teams adopt microservices too early.</Statement>
 */
export function Statement({ type, children }: { type: StatementType; children: React.ReactNode }) {
  const meta = types[type];
  return (
    <div className="not-prose my-6 border-l border-border-strong pl-5">
      <p className="flex flex-wrap items-center gap-2">
        <span className={cn("rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider", meta.classes)}>
          {meta.label}
        </span>
        <span className="text-xs text-faint">{meta.description}</span>
      </p>
      <div className="mt-2 leading-7 text-fg [&_code]:font-mono [&_p+p]:mt-3">{children}</div>
    </div>
  );
}

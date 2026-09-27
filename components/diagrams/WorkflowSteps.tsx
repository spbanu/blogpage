import { cn } from "@/lib/utils";

/**
 * Numbered engineering workflow (01 Problem → 02 Research → …).
 * This is the recognisable visual pattern reused on AI and project pages.
 */
export function WorkflowSteps({
  steps,
  current,
  label = "Engineering workflow",
  className,
}: {
  steps: readonly string[];
  /** Highlights a step; earlier steps render as completed. */
  current?: string;
  label?: string;
  className?: string;
}) {
  const currentIndex = current ? steps.indexOf(current) : -1;

  return (
    <ol aria-label={label} className={cn("not-prose grid gap-2 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {steps.map((step, index) => {
        const state = currentIndex < 0 ? "neutral" : index < currentIndex ? "done" : index === currentIndex ? "current" : "todo";
        return (
          <li
            key={step}
            aria-current={state === "current" ? "step" : undefined}
            className={cn(
              "rounded-md border px-4 py-3",
              state === "current" && "border-accent bg-accent-soft",
              state === "done" && "border-border-strong bg-elevated",
              (state === "todo" || state === "neutral") && "border-border bg-elevated",
            )}
          >
            <span
              className={cn(
                "font-mono text-xs",
                state === "current" || state === "done" || state === "neutral" ? "text-accent" : "text-faint",
              )}
            >
              {String(index + 1).padStart(2, "0")}
              {state === "done" && <span className="sr-only"> (completed)</span>}
              {state === "current" && <span className="sr-only"> (current stage)</span>}
            </span>
            <span className={cn("mt-1 block text-sm font-medium", state === "todo" ? "text-faint" : "text-fg")}>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

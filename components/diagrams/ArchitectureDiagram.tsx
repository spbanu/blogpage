import { cn } from "@/lib/utils";

export type DiagramNode = string | { label: string; note?: string };

function normalize(node: DiagramNode) {
  return typeof node === "string" ? { label: node, note: undefined } : node;
}

/**
 * Accessible flow diagram rendered with HTML/CSS (no images), so it follows
 * the active theme and stays crisp. Usable directly inside MDX:
 *
 *   <ArchitectureDiagram title="Request flow" nodes={["Client", "API", "Database"]} />
 */
export function ArchitectureDiagram({
  nodes,
  title,
  caption,
  direction = "vertical",
  className,
}: {
  nodes: DiagramNode[];
  title?: string;
  caption?: string;
  direction?: "vertical" | "horizontal";
  className?: string;
}) {
  const items = nodes.map(normalize);
  const horizontal = direction === "horizontal";
  const description = items.map((n) => n.label).join(" → ");

  return (
    <figure
      className={cn(
        "not-prose my-8 rounded-lg border border-border bg-code p-5 sm:p-6",
        className,
      )}
    >
      {title && (
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          <span aria-hidden="true">◇ </span>
          {title}
        </p>
      )}
      <ol
        aria-label={title ? `${title}: ${description}` : description}
        className={cn(
          "flex items-center",
          horizontal ? "flex-col gap-0 md:flex-row md:flex-wrap md:justify-center" : "flex-col",
        )}
      >
        {items.map((node, index) => (
          <li
            key={`${node.label}-${index}`}
            className={cn("flex items-center", horizontal ? "flex-col md:flex-row" : "flex-col")}
          >
            <div className="min-w-44 rounded-md border border-border-strong bg-elevated px-4 py-2.5 text-center">
              <span className="font-mono text-sm text-fg">{node.label}</span>
              {node.note && <span className="mt-0.5 block text-xs text-faint">{node.note}</span>}
            </div>
            {index < items.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "font-mono text-accent",
                  horizontal ? "py-1 leading-none md:rotate-[-90deg] md:px-3 md:py-0" : "py-1 leading-none",
                )}
              >
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
      {caption && <figcaption className="mt-5 text-center text-xs text-faint">{caption}</figcaption>}
    </figure>
  );
}

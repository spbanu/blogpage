import { engineeringPrinciples } from "@/lib/taxonomy";

export function PrincipleGrid() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {engineeringPrinciples.map((principle, index) => (
        <li key={principle.title} className="bg-elevated p-6">
          <p className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 font-semibold tracking-tight text-fg">{principle.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{principle.body}</p>
        </li>
      ))}
    </ol>
  );
}

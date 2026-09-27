const roles = [
  { name: "Research", model: "Perplexity", detail: "Sources, prior art, current docs" },
  { name: "Architecture", model: "Claude", detail: "Design options, trade-offs, structure" },
  { name: "Red Team", model: "Grok", detail: "Challenges assumptions, finds weak spots" },
];

const pipeline = ["Implementation", "Evaluation", "Security Review"];

function Arrow() {
  return (
    <span aria-hidden="true" className="block py-1 text-center font-mono text-accent">
      ↓
    </span>
  );
}

/**
 * The AI Engineering Council: one human decision-maker, an orchestrating
 * assistant and specialised roles. Roles matter more than the tools that fill them.
 */
export function CouncilDiagram() {
  return (
    <figure className="not-prose rounded-lg border border-border bg-code p-5 sm:p-8">
      <figcaption className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        ◇ AI Engineering Council
      </figcaption>
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto w-fit rounded-md border border-accent bg-accent-soft px-5 py-3 text-center">
          <p className="font-mono text-sm font-semibold tracking-[0.15em] text-accent">BANU</p>
          <p className="text-xs text-muted">Final decision</p>
        </div>
        <Arrow />
        <div className="mx-auto w-fit rounded-md border border-border-strong bg-elevated px-5 py-3 text-center">
          <p className="font-mono text-sm text-fg">ORCHESTRATOR</p>
          <p className="text-xs text-faint">ChatGPT · frames the problem, routes work, merges results</p>
        </div>
        <Arrow />
        <ul className="grid gap-3 sm:grid-cols-3">
          {roles.map((role) => (
            <li key={role.name} className="rounded-md border border-border-strong bg-elevated px-4 py-3 text-center">
              <p className="font-mono text-sm text-fg">{role.name.toUpperCase()}</p>
              <p className="mt-0.5 text-xs text-faint">{role.model}</p>
              <p className="mt-2 text-xs text-muted">{role.detail}</p>
            </li>
          ))}
        </ul>
        {pipeline.map((step) => (
          <div key={step}>
            <Arrow />
            <div className="mx-auto w-fit min-w-48 rounded-md border border-border bg-elevated px-4 py-2 text-center font-mono text-sm text-muted">
              {step}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

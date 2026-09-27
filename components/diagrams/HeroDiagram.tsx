/** Subtle technical visual for the hero: the areas that feed engineering. */
export function HeroDiagram() {
  const node = "rounded-md border border-border-strong bg-elevated/80 px-3 py-1.5 font-mono text-xs text-muted";
  const line = "bg-border-strong";
  return (
    <figure aria-hidden="true" className="relative mx-auto w-full max-w-sm select-none">
      <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_2.5rem_auto_2.5rem_auto] items-center justify-items-center">
        <div />
        <span className={node}>AI</span>
        <div />

        <div />
        <span className={`h-full w-px ${line}`} />
        <div />

        <div className="flex w-full items-center">
          <span className={node}>.NET</span>
          <span className={`h-px flex-1 ${line}`} />
        </div>
        <span className="rounded-md border border-accent bg-accent-soft px-4 py-2.5 font-mono text-sm font-semibold tracking-[0.15em] text-accent">
          ENGINEERING
        </span>
        <div className="flex w-full items-center">
          <span className={`h-px flex-1 ${line}`} />
          <span className={node}>SECURITY</span>
        </div>

        <div />
        <span className={`h-full w-px ${line}`} />
        <div />

        <div />
        <span className={node}>PROJECTS</span>
        <div />
      </div>
    </figure>
  );
}

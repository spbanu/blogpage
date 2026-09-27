import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroDiagram } from "@/components/diagrams/HeroDiagram";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            Real-world engineering · Secure software · Modern .NET · AI-assisted development
          </p>
          <h1 id="hero-heading" className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Building better software,
            <br className="hidden sm:block" /> one problem at a time.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            I&apos;m Banu, a software engineering professional exploring secure software development, modern .NET, system
            architecture and AI-assisted engineering.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/articles">Explore Articles</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Explore Projects
            </ButtonLink>
            <ButtonLink href="/about" variant="ghost">
              About Me →
            </ButtonLink>
          </div>
        </div>
        <div className="hidden lg:block">
          <HeroDiagram />
        </div>
      </div>
    </section>
  );
}

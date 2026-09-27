import { Breadcrumb } from "./Breadcrumb";
import type { Crumb } from "@/lib/seo";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
        {crumbs && <Breadcrumb crumbs={crumbs} className="mb-8" />}
        {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

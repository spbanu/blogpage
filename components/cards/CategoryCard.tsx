import { ArrowLink } from "@/components/ui/ButtonLink";

export function CategoryCard({
  icon,
  title,
  description,
  href,
  cta,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-elevated p-5 transition-colors hover:border-border-strong">
      <span aria-hidden="true" className="text-2xl">
        {icon}
      </span>
      <h3 className="mt-4 font-semibold tracking-tight text-fg">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{description}</p>
      <ArrowLink href={href} className="mt-5">
        {cta}
      </ArrowLink>
    </article>
  );
}

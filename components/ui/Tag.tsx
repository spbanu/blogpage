import Link from "next/link";
import { cn, toSlug } from "@/lib/utils";

export function Tag({ name, linked = true, className }: { name: string; linked?: boolean; className?: string }) {
  const classes = cn(
    "inline-flex items-center rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted",
    linked && "transition-colors hover:border-accent hover:text-accent",
    className,
  );
  if (!linked) return <span className={classes}>#{name}</span>;
  return (
    <Link href={`/tags/${toSlug(name)}`} className={classes}>
      #{name}
    </Link>
  );
}

export function TagList({ tags, linked = true, className }: { tags: string[]; linked?: boolean; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Tag name={tag} linked={linked} />
        </li>
      ))}
    </ul>
  );
}

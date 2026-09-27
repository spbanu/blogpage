import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-accent text-bg hover:bg-accent-strong border border-transparent",
  secondary: "border border-border-strong text-fg hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-fg",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Inline "Explore X →" style link. */
export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong",
        className,
      )}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="group inline-flex min-w-0 items-center gap-2.5" aria-label={`${siteConfig.name} — home`}>
      <span
        aria-hidden="true"
        className="inline-flex size-8 items-center justify-center rounded-md border border-border-strong bg-elevated font-mono text-sm font-semibold text-accent transition-colors group-hover:border-accent"
      >
        B/
      </span>
      <span className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-fg sm:tracking-[0.18em]">
        Banu<span className="hidden text-faint min-[420px]:inline"> Engineering</span>
      </span>
    </Link>
  );
}

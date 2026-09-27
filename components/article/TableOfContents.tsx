"use client";

import { useEffect, useId, useState } from "react";
import type { Heading } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Sticky table of contents that highlights the section currently being read. */
export function TableOfContents({ headings, className }: { headings: Heading[]; className?: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const titleId = useId();

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0]!.target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-labelledby={titleId} className={cn("text-sm", className)}>
      <h2 id={titleId} className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        On this page
      </h2>
      <ul className="space-y-1 border-l border-border">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1 leading-snug transition-colors",
                  heading.depth === 3 ? "pl-7" : "pl-4",
                  active ? "border-accent text-fg" : "border-transparent text-faint hover:text-muted",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

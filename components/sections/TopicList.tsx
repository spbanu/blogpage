import Link from "next/link";
import { getAllTags } from "@/lib/content";
import { toSlug } from "@/lib/utils";

/**
 * Topic chips for a section page. A topic links to its tag page when articles
 * carry that tag, otherwise to a pre-filled article search.
 */
export function TopicList({ topics, label = "Topics" }: { topics: string[]; label?: string }) {
  const tagSlugs = new Set(getAllTags().map((tag) => tag.slug));
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {topics.map((topic) => {
        const slug = toSlug(topic);
        const href = tagSlugs.has(slug) ? `/tags/${slug}` : `/articles?q=${encodeURIComponent(topic)}`;
        return (
          <li key={topic}>
            <Link
              href={href}
              className="inline-flex items-center rounded-md border border-border bg-elevated px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {topic}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllTags } from "@/lib/content";
import { sectionMetadata } from "@/lib/seo";

export const metadata = sectionMetadata({
  title: "Tags",
  description: "Browse every article by topic.",
  path: "/tags",
});

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <>
      <PageHeader
        eyebrow="Index"
        title="Tags"
        subtitle="Browse every article by topic."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Tags", href: "/tags" },
        ]}
      />
      <Container className="py-12">
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag.slug}>
              <Link
                href={`/tags/${tag.slug}`}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-elevated px-3 py-1.5 font-mono text-sm text-muted hover:border-accent hover:text-accent"
              >
                #{tag.name}
                <span className="text-xs text-faint">{tag.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

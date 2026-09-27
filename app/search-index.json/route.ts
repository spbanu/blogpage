import { getAllArticles, getAllProjects, getAllTags } from "@/lib/content";
import { CATEGORIES, type SearchItem } from "@/lib/types";

export const dynamic = "force-static";

const categoryHref: Record<string, string> = {
  Security: "/security",
  ".NET": "/dotnet",
  "AI Engineering": "/ai",
  "Engineering Experience": "/experience",
};

/** Static search index consumed by the Ctrl+K dialog. Generated at build time. */
export function GET() {
  const items: SearchItem[] = [
    ...getAllArticles().map((article) => ({
      type: "article" as const,
      title: article.title,
      href: `/articles/${article.slug}`,
      description: article.description,
      category: article.category,
      tags: article.tags,
    })),
    ...getAllProjects().map((project) => ({
      type: "project" as const,
      title: `${project.id} · ${project.name}`,
      href: `/projects/${project.slug}`,
      description: project.description,
      category: "Project",
      tags: project.technologies,
    })),
    ...CATEGORIES.map((category) => ({
      type: "category" as const,
      title: category,
      href: categoryHref[category] ?? `/articles?category=${encodeURIComponent(category)}`,
      description: `All ${category} articles`,
      category: "Category",
    })),
    ...getAllTags().map((tag) => ({
      type: "tag" as const,
      title: `#${tag.name}`,
      href: `/tags/${tag.slug}`,
      description: `${tag.count} ${tag.count === 1 ? "article" : "articles"}`,
      category: "Tag",
      tags: [tag.name],
    })),
  ];
  return Response.json(items);
}

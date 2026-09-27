import type { MetadataRoute } from "next";
import { getAllArticles, getAllProjects, getAllTags } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/articles", "/security", "/dotnet", "/ai", "/projects", "/experience", "/about", "/tags"];
  return [
    ...staticRoutes.map((route) => ({ url: absoluteUrl(route), changeFrequency: "weekly" as const, priority: route === "/" ? 1 : 0.8 })),
    ...getAllArticles().map((article) => ({
      url: absoluteUrl(`/articles/${article.slug}`),
      lastModified: article.updatedAt ?? article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllProjects().map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getAllTags().map((tag) => ({ url: absoluteUrl(`/tags/${tag.slug}`), changeFrequency: "weekly" as const, priority: 0.4 })),
  ];
}

import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";
import type { Article, Project } from "./types";

export type Crumb = { label: string; href: string };

export function personJsonLd() {
  const sameAs = siteConfig.social.map((s) => s.href).filter((href): href is string => Boolean(href?.startsWith("http")));
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.role,
    url: absoluteUrl("/about"),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: { "@type": "Person", name: siteConfig.author.name },
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function articleJsonLd(article: Article) {
  const url = absoluteUrl(`/articles/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`/articles/${article.slug}/opengraph-image`),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: article.author, url: absoluteUrl("/about") },
    publisher: { "@type": "Person", name: siteConfig.author.name },
    articleSection: article.category,
    keywords: article.tags.join(", "),
    ...(article.difficulty ? { proficiencyLevel: article.difficulty } : {}),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.id} — ${project.name}`,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    creator: { "@type": "Person", name: siteConfig.author.name },
    keywords: project.technologies.join(", "),
    creativeWorkStatus: project.status,
  };
}

/** Metadata for a top-level section page. */
export function sectionMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: siteConfig.name },
    twitter: { card: "summary_large_image", title, description },
  };
}

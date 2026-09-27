import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import {
  CATEGORIES,
  DIFFICULTIES,
  PROJECT_STATUSES,
  WORKFLOW_STAGES,
  type Article,
  type ArticleSummary,
  type Category,
  type Project,
  type ProjectSummary,
} from "./types";
import { estimateReadingTime, extractHeadings, toSlug } from "./utils";
import { siteConfig } from "./site";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ARTICLES_DIR = path.join(CONTENT_DIR, "articles");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

class ContentError extends Error {
  constructor(file: string, message: string) {
    super(`[content] ${path.relative(process.cwd(), file)}: ${message}`);
    this.name = "ContentError";
  }
}

type Frontmatter = Record<string, unknown>;

function readMdxFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => {
      const fullPath = path.join(dir, file);
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
      return { file: fullPath, slug: file.replace(/\.mdx$/, ""), data: data as Frontmatter, content };
    });
}

function requireString(data: Frontmatter, key: string, file: string): string {
  const value = data[key];
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value !== "string" || value.trim() === "") {
    throw new ContentError(file, `missing required frontmatter field "${key}"`);
  }
  return value.trim();
}

function optionalString(data: Frontmatter, key: string): string | undefined {
  const value = data[key];
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function stringArray(data: Frontmatter, key: string): string[] {
  const value = data[key];
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
}

function oneOf<T extends readonly string[]>(
  allowed: T,
  value: string | undefined,
  key: string,
  file: string,
): T[number] | undefined {
  if (value === undefined) return undefined;
  if (!(allowed as readonly string[]).includes(value)) {
    throw new ContentError(file, `"${key}" must be one of: ${allowed.join(", ")} (got "${value}")`);
  }
  return value as T[number];
}

function assertDate(value: string, key: string, file: string) {
  if (Number.isNaN(new Date(value).getTime())) {
    throw new ContentError(file, `"${key}" is not a valid date ("${value}")`);
  }
  return value;
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

const loadArticles = cache((): Article[] => {
  const articles = readMdxFiles(ARTICLES_DIR).map(({ file, slug, data, content }): Article => {
    const category = oneOf(CATEGORIES, requireString(data, "category", file), "category", file)!;
    const publishedAt = assertDate(requireString(data, "publishedAt", file), "publishedAt", file);
    const updatedAt = optionalString(data, "updatedAt");
    const readingTime = typeof data.readingTime === "number" ? data.readingTime : estimateReadingTime(content);

    return {
      id: optionalString(data, "id") ?? slug,
      slug,
      title: requireString(data, "title", file),
      description: requireString(data, "description", file),
      content,
      category,
      tags: stringArray(data, "tags"),
      author: optionalString(data, "author") ?? siteConfig.author.name,
      publishedAt,
      updatedAt: updatedAt ? assertDate(updatedAt, "updatedAt", file) : undefined,
      readingTime,
      featured: data.featured === true,
      series: optionalString(data, "series"),
      seriesOrder: typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
      difficulty: oneOf(DIFFICULTIES, optionalString(data, "difficulty"), "difficulty", file),
      views: typeof data.views === "number" ? data.views : undefined,
      headings: extractHeadings(content),
    };
  });

  return articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export function toArticleSummary({ content: _content, headings: _headings, ...summary }: Article): ArticleSummary {
  return summary;
}

/** All articles, newest first. */
export function getAllArticles(): Article[] {
  return loadArticles();
}

export function getArticleSummaries(): ArticleSummary[] {
  return loadArticles().map(toArticleSummary);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return loadArticles().find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return loadArticles().filter((article) => article.category === category);
}

export function getArticlesByTag(tagSlug: string): Article[] {
  return loadArticles().filter((article) => article.tags.some((tag) => toSlug(tag) === tagSlug));
}

export function getArticlesBySeries(series: string): Article[] {
  return loadArticles()
    .filter((article) => article.series === series)
    .sort((a, b) => (a.seriesOrder ?? 99) - (b.seriesOrder ?? 99));
}

export function getFeaturedArticles(limit = 6): Article[] {
  const all = loadArticles();
  const featured = all.filter((a) => a.featured);
  const rest = all.filter((a) => !a.featured);
  return [...featured, ...rest].slice(0, limit);
}

/** Previous = older article, next = newer article. */
export function getAdjacentArticles(slug: string) {
  const all = loadArticles();
  const index = all.findIndex((a) => a.slug === slug);
  return {
    previous: index >= 0 ? all[index + 1] : undefined,
    next: index > 0 ? all[index - 1] : undefined,
  };
}

/** Related articles ranked by shared tags, same series and same category. */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return loadArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => article.tags.includes(tag)).length;
      const score =
        sharedTags * 2 +
        (candidate.series && candidate.series === article.series ? 3 : 0) +
        (candidate.category === article.category ? 1 : 0);
      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.publishedAt.localeCompare(a.candidate.publishedAt))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export type TagInfo = { name: string; slug: string; count: number };

export function getAllTags(): TagInfo[] {
  const tags = new Map<string, TagInfo>();
  for (const article of loadArticles()) {
    for (const name of article.tags) {
      const slug = toSlug(name);
      const existing = tags.get(slug);
      if (existing) existing.count += 1;
      else tags.set(slug, { name, slug, count: 1 });
    }
  }
  return [...tags.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

const loadProjects = cache((): Project[] => {
  const projects = readMdxFiles(PROJECTS_DIR).map(({ file, slug, data, content }): Project => {
    const id = requireString(data, "id", file);
    if (!/^[A-Z]+-\d{3,}$/.test(id)) {
      throw new ContentError(file, `project "id" should look like "AIC-001" (got "${id}")`);
    }
    return {
      id,
      slug,
      name: requireString(data, "name", file),
      description: requireString(data, "description", file),
      status: oneOf(PROJECT_STATUSES, requireString(data, "status", file), "status", file)!,
      stage: oneOf(WORKFLOW_STAGES, requireString(data, "stage", file), "stage", file)!,
      technologies: stringArray(data, "technologies"),
      problem: requireString(data, "problem", file),
      objectives: stringArray(data, "objectives"),
      startedAt: optionalString(data, "startedAt"),
      updatedAt: optionalString(data, "updatedAt"),
      featured: data.featured === true,
      architecture: optionalString(data, "architecture"),
      implementation: optionalString(data, "implementation"),
      evaluation: optionalString(data, "evaluation"),
      security: optionalString(data, "security"),
      lessonsLearned: optionalString(data, "lessonsLearned"),
      content,
      headings: extractHeadings(content),
    };
  });
  return projects.sort((a, b) => a.id.localeCompare(b.id));
});

export function toProjectSummary({ content: _content, headings: _headings, ...summary }: Project): ProjectSummary {
  return summary;
}

export function getAllProjects(): Project[] {
  return loadProjects();
}

export function getProjectBySlug(slug: string): Project | undefined {
  return loadProjects().find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 4): Project[] {
  const all = loadProjects();
  return [...all.filter((p) => p.featured), ...all.filter((p) => !p.featured)].slice(0, limit);
}

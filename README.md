# Banu Engineering

**Real-world engineering. Secure software. Modern .NET. AI-assisted development.**

Personal engineering blog and AI project platform built with Next.js (App Router), TypeScript, Tailwind CSS and MDX. Every page is statically generated.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static generation)
npm start          # serve the production build
npm run lint
npm run typecheck
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your public domain before deploying. It is used for canonical URLs, Open Graph, the sitemap and RSS.

## Make it yours

| What | Where |
|---|---|
| Name, tagline, social links, newsletter endpoint | `lib/site.ts` |
| Section topics, series, learning paths, principles | `lib/taxonomy.ts` |
| Articles | `content/articles/*.mdx` |
| Projects | `content/projects/*.mdx` |
| About page text | `app/about/page.tsx` |
| Colours (dark and light) | tokens at the top of `app/globals.css` |

Social links show placeholders (`[Your GitHub]`, …) until you set an `href` in `lib/site.ts`. The newsletter form collects nothing until `newsletter.action` points to your provider's endpoint.

The sample articles and projects are placeholder content that shows the structure. Articles marked **Template article** use made-up example scenarios; swap in your own experience.

## Writing articles

Create `content/articles/<slug>.mdx`. The file name becomes the URL (`/articles/<slug>`). `content/articles/_template.mdx` lists every frontmatter field and component (files starting with `_` are ignored).

```yaml
---
title: "Authentication vs Authorization"
description: "Shown on cards, in search and in SEO metadata."
category: Security          # Security | .NET | AI Engineering | Architecture | Coding | DevOps | Engineering Experience
tags: [Security, OAuth]
publishedAt: 2026-09-18
updatedAt: 2026-09-20       # optional
difficulty: Intermediate    # optional: Beginner | Intermediate | Advanced | Expert
series: OAuth & OIDC        # optional
seriesOrder: 2              # optional
featured: true              # optional, surfaces on the homepage
---
```

Reading time and the table of contents are generated automatically from the `##`/`###` headings. Invalid frontmatter fails the build with a message naming the file.

### MDX components

- `<Important>`, `<Warning>`, `<Tip>`, `<Callout type="note|important|warning|danger|tip" title="…">`
- `<Statement type="fact|experience|opinion|experiment|lesson">`: labels what kind of claim is being made
- `<ArchitectureDiagram title="…" nodes={["Client", { label: "API", note: "ASP.NET Core" }]} direction="vertical|horizontal" />`
- `<WorkflowSteps steps={[...]} current="…" />`
- Fenced code blocks, highlighted at build time with Shiki. They support `title="File.cs"`, `showLineNumbers` and line highlights `{2-4}`, and always get a language label and a copy button.

To make an article series item link to an article, add the article's `slug` to its entry in `lib/taxonomy.ts`. Entries without one show as *Planned*.

## Projects

Create `content/projects/<slug>.mdx` with `id` (e.g. `AIC-005`), `name`, `description`, `status` (Research | Building | Testing | Production), `stage` (the current step of the 8-stage workflow), `technologies`, `problem` and `objectives`. The body holds the rest of the write-up (Requirements, Research, Architecture Options, Decision, …). See `content/projects/aic-001.mdx`.

## Structure

```
app/                 routes: home, articles, [slug], security, dotnet, ai, projects, [slug],
                     experience, about, tags; plus sitemap, robots, feed.xml,
                     search-index.json and OG images
components/
  layout/            Navbar, MobileNav, Footer, ThemeToggle, Logo
  search/            SearchDialog (Ctrl/⌘ K), SearchButton
  article/           ArticleExplorer, TableOfContents, ReadingProgress, ArticlePager, Feedback, Discussion
  cards/             ArticleCard, ProjectCard, CategoryCard
  diagrams/          ArchitectureDiagram, WorkflowSteps, CouncilDiagram, HeroDiagram
  mdx/               CodeBlock, CopyButton, Callout, Statement, MDX component map
  sections/          Hero, Newsletter, PrincipleGrid, SeriesList, TopicList, SectionBlock
  ui/                Container, PageHeader, SectionHeading, Breadcrumb, Tag, Badge, Pagination, ButtonLink, Icons
  seo/               JsonLd
content/             MDX articles and projects
lib/                 content loader and validation, MDX pipeline, SEO helpers, search, types, site config
```

## Features

- Dark theme by default, plus Light and System. The choice is saved and applied before first paint, so there's no flash of the wrong theme.
- Global search with <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> over articles, projects, tags and categories. The index is a static JSON file that loads only when search is first opened.
- The articles page has search, category filters, sorting and pagination, with all state kept in the URL. "Most Read" uses the optional `views` frontmatter field (for example synced from analytics) and falls back to featured articles, then newest.
- Article pages have a sticky table of contents, a reading progress bar, previous/next links, related articles, the series list, a "Was this useful?" prompt and a placeholder discussion area.
- SEO: per-page metadata, canonical URLs, Open Graph and Twitter cards, generated OG images, JSON-LD (TechArticle, Person, BreadcrumbList, WebSite), sitemap, robots.txt and an RSS feed.
- Accessibility: semantic landmarks, a skip link, visible focus states, a keyboard-operable search dialog and menu built on native `<dialog>`, and support for reduced motion.

## Deploying

Any host that runs Next.js works (Vercel, Netlify, Azure Static Web Apps, a container). Set `NEXT_PUBLIC_SITE_URL` in the host's environment.

## Extending later

Some things have an obvious place to plug in. Comments go in `components/article/Discussion.tsx` (for example Giscus). Newsletter and analytics hook into `lib/site.ts` and the Feedback component. For semantic search, replace `lib/search.ts`. For a CMS, replace the loaders in `lib/content.ts` and keep the same types.

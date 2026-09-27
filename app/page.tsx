import { ArticleGrid } from "@/components/cards/ArticleCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Hero } from "@/components/sections/Hero";
import { Newsletter } from "@/components/sections/Newsletter";
import { PrincipleGrid } from "@/components/sections/PrincipleGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getArticlesByCategory,
  getFeaturedArticles,
  getFeaturedProjects,
  toArticleSummary,
  toProjectSummary,
} from "@/lib/content";
import { personJsonLd } from "@/lib/seo";

const focusAreas = [
  {
    icon: "🔐",
    title: "Security Engineering",
    description: "Authentication, authorization, OAuth, OIDC, JWT, API security and secure coding.",
    href: "/security",
    cta: "Explore Security",
  },
  {
    icon: "⚙️",
    title: "Modern .NET",
    description: "C#, ASP.NET Core, performance, architecture, concurrency and advanced .NET concepts.",
    href: "/dotnet",
    cta: "Explore .NET",
  },
  {
    icon: "🤖",
    title: "AI Engineering",
    description: "RAG, AI agents, AI architecture, evaluation and building AI applications.",
    href: "/ai",
    cta: "Explore AI",
  },
  {
    icon: "🧑‍💻",
    title: "Engineering Experience",
    description:
      "Lessons from development, production support, debugging, technical leadership and engineering decisions.",
    href: "/experience",
    cta: "Read Experiences",
  },
  {
    icon: "🧪",
    title: "Experiments & Projects",
    description: "Practical projects, prototypes, architecture experiments and AI systems.",
    href: "/projects",
    cta: "View Projects",
  },
];

export default function HomePage() {
  const latest = getFeaturedArticles(6).map(toArticleSummary);
  const projects = getFeaturedProjects(3).map(toProjectSummary);
  const latestAi = getArticlesByCategory("AI Engineering").slice(0, 3).map(toArticleSummary);

  return (
    <>
      <Hero />

      <Container as="section" className="py-20">
        <SectionHeading id="write-about" eyebrow="Focus areas" title="What I Write About" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-labelledby="write-about">
          {focusAreas.map((area) => (
            <li key={area.href}>
              <CategoryCard {...area} />
            </li>
          ))}
        </ul>
      </Container>

      <section aria-label="Engineering statement" className="border-y border-border bg-elevated/40">
        <Container className="py-14">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="text-xl leading-9 text-fg sm:text-2xl sm:leading-10">
              &ldquo;Software engineering is not just about writing code. It&apos;s about understanding problems, making
              good trade-offs, building secure systems and continuously learning from what happens in production.&rdquo;
            </p>
            <footer className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-faint">— Banu</footer>
          </blockquote>
        </Container>
      </section>

      <Container as="section" className="py-20">
        <SectionHeading
          eyebrow="Articles"
          title="Latest From the Engineering Desk"
          action={<ArrowLink href="/articles">View All Articles</ArrowLink>}
        />
        <ArticleGrid articles={latest} />
      </Container>

      <Container as="section" className="py-20">
        <SectionHeading
          eyebrow="Projects"
          title="Things I'm Building"
          description="Experiments and prototypes, each tracked with a project ID and taken through the same engineering workflow."
          action={<ArrowLink href="/projects">All Projects</ArrowLink>}
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>

      <Container as="section" className="py-20">
        <SectionHeading eyebrow="Principles" title="How I Think About Engineering" />
        <PrincipleGrid />
      </Container>

      {latestAi.length > 0 && (
        <Container as="section" className="py-20">
          <SectionHeading
            eyebrow="AI Engineering"
            title="Latest AI Engineering"
            description="Building useful AI systems instead of simply experimenting with prompts."
            action={<ArrowLink href="/ai">Explore AI Engineering</ArrowLink>}
          />
          <ArticleGrid articles={latestAi} />
        </Container>
      )}

      <Container className="pt-8">
        <Newsletter />
      </Container>

      <JsonLd data={personJsonLd()} />
    </>
  );
}

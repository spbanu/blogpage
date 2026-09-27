import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { breadcrumbJsonLd, personJsonLd, sectionMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { whatImExploring, whatIWorkWith } from "@/lib/taxonomy";

const title = "About Banu";
const description =
  "Software engineering professional and team lead working across software development, production support, security, .NET, architecture and AI-assisted engineering.";

export const metadata = sectionMetadata({ title, description, path: "/about" });

const crumbs = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const reasons = [
  "Things learned",
  "Engineering experiences",
  "Experiments",
  "Architecture decisions",
  "Technical discoveries",
  "AI projects",
];

function ChipList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-md border border-border bg-elevated px-3 py-1.5 font-mono text-xs text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 id={id} className="mb-5 text-xl font-semibold tracking-tight text-fg">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={title} subtitle={siteConfig.statement} crumbs={crumbs} />
      <Container className="py-14">
        <div className="max-w-3xl">
          <Section id="who-i-am" title="Who I Am">
            <div className="space-y-4 leading-8 text-muted">
              <p>
                I&apos;m Banu, a software engineering professional and team lead. My work spans software development,
                production support, application security, .NET, architecture and — increasingly — AI-assisted software
                engineering.
              </p>
              <p>
                This site is my digital workshop: a place to write down what I learn while building, supporting and
                improving real software, and to document the AI engineering projects I&apos;m working on.
              </p>
              <p className="rounded-md border border-dashed border-border px-4 py-3 font-mono text-xs text-faint">
                [Add your professional background, current focus and anything else you want readers to know here.]
              </p>
            </div>
          </Section>

          <Section id="work-with" title="What I Work With">
            <ChipList items={whatIWorkWith} label="Technologies I work with" />
          </Section>

          <Section id="exploring" title="What I'm Exploring">
            <ChipList items={whatImExploring} label="Areas I am exploring" />
          </Section>

          <Section id="why-i-write" title="Why I Write">
            <p className="leading-8 text-muted">
              Writing forces clarity. If I can&apos;t explain something simply, I don&apos;t understand it well enough
              yet. This blog is where I document:
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-center gap-3 text-muted">
                  <span aria-hidden="true" className="font-mono text-accent">
                    →
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-8 text-muted">
              I try to be explicit about what kind of statement I&apos;m making — fact, experience, opinion, experiment
              or lesson learned — because what worked for one team and one system won&apos;t automatically work for
              yours.
            </p>
          </Section>

          <Section id="connect" title="Connect">
            <ul className="space-y-2 text-muted">
              {siteConfig.social.map((link) => (
                <li key={link.label} className="flex gap-3">
                  <span className="w-20 font-mono text-xs uppercase tracking-wider text-faint">{link.label}</span>
                  {link.href ? (
                    <a href={link.href} className="text-accent hover:underline" rel="me noopener" target="_blank">
                      {link.href.replace(/^mailto:|^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span className="font-mono text-xs">{link.placeholder}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/articles">Read the articles</ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                See the projects
              </ButtonLink>
            </div>
          </Section>
        </div>
      </Container>
      <JsonLd data={[personJsonLd(), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}

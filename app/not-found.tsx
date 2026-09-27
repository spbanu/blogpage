import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-28">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404 · Not found</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-xl text-muted">
        The link may be outdated or the article may have moved. Try the article index or press{" "}
        <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-xs">Ctrl K</kbd> to search.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/articles">Browse articles</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Home
        </ButtonLink>
      </div>
    </Container>
  );
}

import { siteConfig } from "@/lib/site";

/**
 * Placeholder for the discussion area. Version 1 intentionally ships without
 * a comment system; swap this component for Giscus, Utterances or similar later.
 */
export function Discussion() {
  const email = siteConfig.social.find((s) => s.label === "Email");
  return (
    <section aria-labelledby="discussion-heading" className="rounded-lg border border-dashed border-border px-5 py-6">
      <h2 id="discussion-heading" className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
        Discussion
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        Comments are not enabled yet. If you have a question, a correction or a different experience to share, reach
        out via{" "}
        {email?.href ? (
          <a href={email.href} className="text-accent underline underline-offset-2">
            email
          </a>
        ) : (
          <span className="font-mono text-xs text-faint">{email?.placeholder ?? "[Your Email]"}</span>
        )}
        .
      </p>
    </section>
  );
}

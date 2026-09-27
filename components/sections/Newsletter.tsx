"use client";

import { useId, useState } from "react";
import { siteConfig } from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter sign-up. Posts to `siteConfig.newsletter.action` when configured;
 * until then it explains that the newsletter isn't live and collects nothing.
 */
export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "submitting" | "done" | "error" | "unavailable">("idle");
  const action = siteConfig.newsletter.action;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    if (!action) {
      setStatus("unavailable");
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const messages: Partial<Record<typeof status, { text: string; tone: string }>> = {
    invalid: { text: "Please enter a valid email address.", tone: "text-danger" },
    done: { text: "Thanks — please check your inbox to confirm.", tone: "text-success" },
    error: { text: "Something went wrong. Please try again later.", tone: "text-danger" },
    unavailable: { text: "The newsletter isn't live yet — nothing was stored. Check back soon.", tone: "text-muted" },
  };
  const message = messages[status];

  return (
    <section aria-labelledby={`${id}-heading`} className="rounded-lg border border-border bg-elevated/60 p-6 sm:p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,26rem)] md:items-center">
        <div>
          <h2 id={`${id}-heading`} className="text-xl font-semibold tracking-tight text-fg">
            Stay in the Engineering Loop
          </h2>
          <p className="mt-2 text-sm text-muted">
            New articles about .NET, security, AI engineering and practical software development.
          </p>
        </div>
        <form onSubmit={onSubmit} noValidate>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor={`${id}-email`} className="sr-only">
              Your email
            </label>
            <input
              id={`${id}-email`}
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle" && status !== "submitting") setStatus("idle");
              }}
              aria-invalid={status === "invalid"}
              aria-describedby={message ? `${id}-message` : undefined}
              className="h-10 min-w-0 flex-1 rounded-md border border-border bg-bg px-3 text-sm text-fg placeholder:text-faint focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="h-10 rounded-md border border-border-strong px-4 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
          <p id={`${id}-message`} role="status" aria-live="polite" className={`mt-2 min-h-5 text-xs ${message?.tone ?? ""}`}>
            {message?.text}
          </p>
        </form>
      </div>
    </section>
  );
}

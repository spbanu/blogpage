"use client";

import { useEffect, useState } from "react";

type Vote = "yes" | "no";

/**
 * "Was this useful?" prompt. Votes are only remembered in this browser for now;
 * wire `onVote` to an analytics endpoint later.
 */
export function Feedback({ slug }: { slug: string }) {
  const storageKey = `feedback:${slug}`;
  const [vote, setVote] = useState<Vote | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "yes" || stored === "no") setVote(stored);
    } catch {
      // ignore unavailable storage
    }
  }, [storageKey]);

  const choose = (value: Vote) => {
    setVote(value);
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      // ignore unavailable storage
    }
  };

  return (
    <section aria-labelledby="feedback-heading" className="rounded-lg border border-border bg-elevated px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="feedback-heading" className="text-sm font-medium text-fg">
          Was this useful?
        </h2>
        {vote ? (
          <p role="status" className="text-sm text-muted">
            Thanks for the feedback{vote === "no" ? " — I'll use it to improve this article" : ""}.
          </p>
        ) : (
          <div className="flex gap-2">
            {(
              [
                ["yes", "👍 Yes"],
                ["no", "👎 Not really"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => choose(value)}
                className="rounded-md border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

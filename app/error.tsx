"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-danger">Error</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg">Something went wrong.</h1>
      <p className="mt-4 text-muted">An unexpected error occurred while rendering this page.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 h-10 rounded-md border border-border-strong px-4 text-sm text-fg hover:border-accent hover:text-accent"
      >
        Try again
      </button>
    </div>
  );
}

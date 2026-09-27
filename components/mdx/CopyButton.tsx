"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/Icons";

/** Copies the code of the closest code block. */
export function CopyButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    const code = buttonRef.current?.closest("[data-code-block]")?.querySelector("pre code");
    const text = code instanceof HTMLElement ? code.innerText : "";
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ""));
      setState("copied");
    } catch {
      setState("error");
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[11px] text-faint transition-colors hover:bg-subtle hover:text-fg"
    >
      {state === "copied" ? <CheckIcon className="size-3.5 text-success" /> : <CopyIcon className="size-3.5" />}
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "error" ? "Copy failed" : "Copy"}</span>
    </button>
  );
}

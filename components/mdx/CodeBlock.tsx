import type { ComponentPropsWithoutRef } from "react";
import { CopyButton } from "./CopyButton";

const LANGUAGE_LABELS: Record<string, string> = {
  csharp: "C#",
  cs: "C#",
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  javascript: "JavaScript",
  json: "JSON",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  powershell: "PowerShell",
  sql: "SQL",
  http: "HTTP",
  yaml: "YAML",
  yml: "YAML",
  xml: "XML",
  html: "HTML",
  css: "CSS",
  python: "Python",
  py: "Python",
  plaintext: "Text",
  text: "Text",
  txt: "Text",
};

type PreProps = ComponentPropsWithoutRef<"pre"> & { "data-language"?: string; title?: string };

/**
 * Wrapper for highlighted code (rehype-pretty-code). Adds a language label and
 * a copy button; long lines scroll horizontally instead of breaking the layout.
 */
export function CodeBlock({ children, title, ...props }: PreProps) {
  const language = props["data-language"];
  const label = language ? (LANGUAGE_LABELS[language] ?? language) : "Code";

  return (
    <div data-code-block className="code-block not-prose my-6 overflow-hidden rounded-lg border border-border bg-code">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-1.5">
        <span className="truncate font-mono text-[11px] uppercase tracking-wider text-faint">
          {title ? (
            <>
              <span className="normal-case tracking-normal text-muted">{title}</span>
              <span aria-hidden="true"> · </span>
            </>
          ) : null}
          {label}
        </span>
        <CopyButton />
      </div>
      <pre {...props} tabIndex={0}>
        {children}
      </pre>
    </div>
  );
}

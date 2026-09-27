import { cn } from "@/lib/utils";

const variants = {
  important: { label: "Important", icon: "◆", classes: "border-info/50 bg-info/5", accent: "text-info" },
  warning: { label: "Security Warning", icon: "⚠", classes: "border-warning/50 bg-warning/5", accent: "text-warning" },
  danger: { label: "Danger", icon: "✕", classes: "border-danger/50 bg-danger/5", accent: "text-danger" },
  tip: { label: "Tip", icon: "💡", classes: "border-success/50 bg-success/5", accent: "text-success" },
  note: { label: "Note", icon: "›", classes: "border-border-strong bg-subtle/60", accent: "text-muted" },
} as const;

export type CalloutType = keyof typeof variants;

/**
 * Highlighted aside for articles.
 *
 *   <Callout type="warning" title="Security warning">Never store access tokens…</Callout>
 */
export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const variant = variants[type] ?? variants.note;
  return (
    <aside
      role="note"
      aria-label={title ?? variant.label}
      className={cn("not-prose my-7 rounded-lg border-l-2 border-y border-r px-5 py-4", variant.classes)}
    >
      <p className={cn("flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em]", variant.accent)}>
        <span aria-hidden="true">{variant.icon}</span>
        {title ?? variant.label}
      </p>
      <div className="mt-2 text-[0.95rem] leading-7 text-muted [&_a]:text-accent [&_a]:underline [&_code]:font-mono [&_code]:text-fg [&_p+p]:mt-3 [&_strong]:text-fg">
        {children}
      </div>
    </aside>
  );
}

export const Important = (props: { title?: string; children: React.ReactNode }) => <Callout type="important" {...props} />;
export const Warning = (props: { title?: string; children: React.ReactNode }) => <Callout type="warning" {...props} />;
export const Tip = (props: { title?: string; children: React.ReactNode }) => <Callout type="tip" {...props} />;

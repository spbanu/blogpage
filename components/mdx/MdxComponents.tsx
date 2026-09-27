import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { WorkflowSteps } from "@/components/diagrams/WorkflowSteps";
import { Callout, Important, Tip, Warning } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { Statement } from "./Statement";

function heading(Tag: "h2" | "h3" | "h4") {
  function Heading({ id, children, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
      <Tag id={id} className="group scroll-mt-24" {...props}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 font-normal text-faint no-underline opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            aria-label="Link to this section"
          >
            #
          </a>
        )}
      </Tag>
    );
  }
  Heading.displayName = Tag;
  return Heading;
}

function Anchor({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Img({ alt = "", ...props }: ComponentPropsWithoutRef<"img">) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} loading="lazy" decoding="async" className="rounded-lg border border-border" {...props} />;
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 overflow-x-auto" tabIndex={0} role="region" aria-label="Table">
      <table {...props} className="my-0" />
    </div>
  );
}

/** Components available inside every MDX document. */
export const mdxComponents: MDXComponents = {
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  a: Anchor,
  img: Img,
  pre: CodeBlock,
  table: Table,
  Callout,
  Important,
  Warning,
  Tip,
  Statement,
  ArchitectureDiagram,
  WorkflowSteps,
};

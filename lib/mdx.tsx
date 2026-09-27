import "server-only";

import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/MdxComponents";

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function textOf(node: HastNode): string {
  return node.value ?? (node.children ?? []).map(textOf).join("");
}

/**
 * rehype-pretty-code renders `title="…"` as a separate <figcaption>. Move it
 * onto the <pre> instead so CodeBlock can show it in its own header.
 */
function rehypeCodeTitleToPre() {
  const visit = (node: HastNode) => {
    if (node.tagName === "figure" && node.properties && "data-rehype-pretty-code-figure" in node.properties) {
      const children = node.children ?? [];
      const caption = children.find(
        (child) => child.tagName === "figcaption" && child.properties && "data-rehype-pretty-code-title" in child.properties,
      );
      const pre = children.find((child) => child.tagName === "pre");
      if (caption && pre) {
        pre.properties = { ...pre.properties, title: textOf(caption) };
        node.children = children.filter((child) => child !== caption);
      }
    }
    node.children?.forEach(visit);
  };
  return (tree: HastNode) => visit(tree);
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { dark: "github-dark-dimmed", light: "github-light" },
  keepBackground: false,
  defaultLang: { block: "plaintext" },
};

/**
 * Compile an MDX body to React on the server. Highlighting happens at build
 * time, so no syntax-highlighting JavaScript is shipped to the browser.
 */
export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      // Content is authored in this repository, so JSX expressions (e.g. diagram props) are allowed.
      // Dangerous globals (eval, process, require…) remain blocked.
      blockJS: false,
      blockDangerousJS: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions], rehypeCodeTitleToPre],
      },
    },
  });
  return content;
}

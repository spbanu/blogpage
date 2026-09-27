/**
 * Site-wide configuration.
 *
 * Replace the placeholder values (anything in [square brackets] or `null`)
 * with your own details. Social links render as plain placeholders until a
 * real URL is provided.
 */
export const siteConfig = {
  name: "Banu Engineering",
  shortName: "Banu Eng",
  tagline: "Real-world engineering. Secure software. Modern .NET. AI-assisted development.",
  statement:
    "Building software, exploring AI, solving engineering problems, and sharing what I learn along the way.",
  description:
    "Personal engineering blog and AI project platform by Banu — practical notes on secure software, modern .NET, system architecture and AI-assisted engineering.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",
  author: {
    name: "Banu",
    role: "Software engineering professional & team lead",
  },
  /** Set `href` to a real URL to turn a placeholder into a link. */
  social: [
    { label: "GitHub", placeholder: "[Your GitHub]", href: null as string | null },
    { label: "LinkedIn", placeholder: "[Your LinkedIn]", href: null as string | null },
    { label: "Email", placeholder: "[Your Email]", href: null as string | null },
  ],
  /** Twitter/X handle used in card metadata, e.g. "@banu". `null` omits it. */
  twitterHandle: null as string | null,
  newsletter: {
    /**
     * Form endpoint of your newsletter provider (POST, field name `email`).
     * While `null`, the form explains that the newsletter is not live yet
     * and does not collect anything.
     */
    action: null as string | null,
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Security", href: "/security" },
  { label: ".NET", href: "/dotnet" },
  { label: "AI Engineering", href: "/ai" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = [
  { label: "Articles", href: "/articles" },
  { label: "Security", href: "/security" },
  { label: ".NET", href: "/dotnet" },
  { label: "AI Engineering", href: "/ai" },
  { label: "Engineering Lessons", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
] as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

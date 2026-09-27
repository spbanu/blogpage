/**
 * Editorial structure of the site: topics per section, article series and
 * learning paths. Items with a `slug` link to a published article; items
 * without one are shown as "planned" so the roadmap stays visible.
 */

export type SeriesItem = { title: string; slug?: string };

export type Series = {
  title: string;
  description: string;
  items: SeriesItem[];
};

export const securityTopics = [
  "Authentication",
  "Authorization",
  "OAuth 2.0",
  "OpenID Connect",
  "JWT",
  "API Security",
  "Secure Coding",
  "OWASP",
  "Identity",
  "Secrets Management",
];

export const dotnetTopics = [
  "C#",
  "ASP.NET Core",
  "Dependency Injection",
  "Async / Await",
  "Performance",
  "Concurrency",
  "Architecture",
  "APIs",
  "Entity Framework",
  "Testing",
  "Advanced .NET",
];

export const aiTopics = [
  "AI-Assisted Coding",
  "RAG",
  "AI Agents",
  "LLMs",
  "AI Architecture",
  "Tool Calling",
  "Evaluation",
  "Security",
  "AI Projects",
];

export const experienceTopics = [
  "Production",
  "Debugging",
  "Technical Leadership",
  "Code Reviews",
  "Legacy Systems",
  "Technical Debt",
  "Architecture",
  "Team Practices",
];

export const authenticationFundamentals: Series = {
  title: "Authentication Fundamentals",
  description: "Identity basics every developer should be able to explain without looking anything up.",
  items: [
    { title: "Authentication vs Authorization", slug: "authentication-vs-authorization" },
    { title: "Sessions vs Tokens", slug: "sessions-vs-tokens" },
    { title: "JWT Explained", slug: "jwt-explained" },
    { title: "Access Tokens" },
    { title: "Refresh Tokens" },
    { title: "Claims" },
    { title: "Identity Providers" },
  ],
};

export const oauthAndOidc: Series = {
  title: "OAuth & OIDC",
  description: "Delegated authorization and federated identity, from first principles to production flows.",
  items: [
    { title: "Why OAuth Exists" },
    { title: "OAuth 2.0 Fundamentals", slug: "oauth-2-explained" },
    { title: "Authorization Code Flow" },
    { title: "PKCE" },
    { title: "Client Credentials" },
    { title: "Refresh Tokens" },
    { title: "OpenID Connect" },
    { title: "OAuth vs OIDC" },
  ],
};

export const codingWithAi: Series = {
  title: "Coding With AI",
  description:
    "Using AI assistants productively across the software lifecycle — without handing over engineering judgement.",
  items: [
    { title: "How I Use AI to Understand an Existing Codebase", slug: "using-ai-to-understand-a-codebase" },
    { title: "Using AI for Code Reviews", slug: "using-ai-for-code-review" },
    { title: "Using AI to Refactor Legacy .NET Code" },
    { title: "Using AI to Generate Unit Tests" },
    { title: "Using AI to Debug Production Issues" },
    { title: "Using AI for Security Reviews" },
    { title: "How I Verify AI-Generated Code", slug: "ai-generated-code-is-not-production-ready" },
    { title: "Where AI Coding Assistants Fail" },
    { title: "AI Should Not Decide Your Architecture" },
  ],
};

export const advancedCSharpPath: Series = {
  title: "Advanced C#",
  description: "Language features that change how you design APIs and reason about performance.",
  items: [
    { title: "Generics" },
    { title: "Delegates" },
    { title: "Expression Trees" },
    { title: "Reflection" },
    { title: "Pattern Matching" },
    { title: "Records" },
    { title: "Span<T>" },
    { title: "Memory<T>" },
    { title: "Concurrency" },
    { title: "Async/Await", slug: "async-await-in-aspnet-core" },
  ],
};

export const aspNetCorePath: Series = {
  title: "ASP.NET Core",
  description: "The request pipeline and the building blocks of production-grade web APIs.",
  items: [
    { title: "Middleware" },
    { title: "Dependency Injection", slug: "advanced-dependency-injection-aspnet-core" },
    { title: "Filters" },
    { title: "Authentication", slug: "secure-aspnet-core-api" },
    { title: "Authorization" },
    { title: "Minimal APIs" },
    { title: "Background Services" },
    { title: "Resilience" },
    { title: "Performance" },
  ],
};

export const whatIWorkWith = [
  ".NET",
  "C#",
  "ASP.NET Core",
  "APIs",
  "Security",
  "Authentication",
  "Authorization",
  "OAuth",
  "Cloud",
  "AI",
  "System Architecture",
];

export const whatImExploring = [
  "AI Engineering",
  "AI Agents",
  "RAG",
  "AI-assisted development",
  "Secure AI systems",
  "Multi-model engineering",
];

export const engineeringPrinciples = [
  {
    title: "Understand the Problem",
    body: "Don't start coding before understanding the actual problem.",
  },
  {
    title: "Keep It Simple",
    body: "Avoid unnecessary complexity and premature architecture.",
  },
  {
    title: "Security Is Part of Engineering",
    body: "Security should be considered during design, implementation and deployment.",
  },
  {
    title: "AI Is an Assistant",
    body: "AI can accelerate engineering, but generated code still requires human review, testing and validation.",
  },
  {
    title: "Measure What Matters",
    body: "Systems should be evaluated using meaningful quality, reliability, security and performance criteria.",
  },
  {
    title: "Learn From Production",
    body: "Production problems are engineering lessons.",
  },
];

export const aiBuildWorkflow = [
  "Problem",
  "Research",
  "Architecture",
  "Implementation",
  "Evaluation",
  "Security Review",
  "Production",
];

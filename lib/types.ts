export const CATEGORIES = [
  "Security",
  ".NET",
  "AI Engineering",
  "Architecture",
  "Coding",
  "DevOps",
  "Engineering Experience",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const PROJECT_STATUSES = ["Research", "Building", "Testing", "Production"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

/** Stages of the AI project workflow — the recognisable pattern shown on every project page. */
export const WORKFLOW_STAGES = [
  "Problem",
  "Research",
  "Architecture",
  "Implementation",
  "Evaluation",
  "Security Review",
  "Production",
  "Lessons Learned",
] as const;
export type WorkflowStage = (typeof WORKFLOW_STAGES)[number];

export type Heading = {
  depth: 2 | 3;
  text: string;
  id: string;
};

/** Metadata for an article. `content` holds the raw MDX body. */
export type Article = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: Category;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured?: boolean;
  series?: string;
  seriesOrder?: number;
  difficulty?: Difficulty;
  /** Optional read count, e.g. synced from analytics later. Used by the "Most Read" sort. */
  views?: number;
  headings: Heading[];
};

/** Article without its body — safe to ship to client components. */
export type ArticleSummary = Omit<Article, "content" | "headings">;

export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  /** Current position in the AI project workflow. */
  stage: WorkflowStage;
  technologies: string[];
  problem: string;
  objectives: string[];
  startedAt?: string;
  updatedAt?: string;
  featured?: boolean;
  architecture?: string;
  implementation?: string;
  evaluation?: string;
  security?: string;
  lessonsLearned?: string;
  /** Raw MDX body with the detailed write-up. */
  content: string;
  headings: Heading[];
};

export type ProjectSummary = Omit<Project, "content" | "headings">;

export type SearchItem = {
  type: "article" | "project" | "tag" | "category";
  title: string;
  href: string;
  description?: string;
  category?: string;
  tags?: string[];
};

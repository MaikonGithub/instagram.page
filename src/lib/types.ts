export type Theme = "light" | "dark";
export type AboutTab = "overview" | "stack" | "links";
export type AppIconName =
  | "home"
  | "mail"
  | "phone"
  | "github"
  | "linkedin"
  | "resume"
  | "testflight";

export interface ScreenshotSet {
  portrait: string[];
  landscapeThumbnail?: string;
  frame?: "phone" | "photo";
}

export interface ProjectSpec {
  id: string;
  title: string;
  subtitle: string;
  badges: string[];
  highlight: string;
  githubUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  screenshots: ScreenshotSet;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
  achievements: string[];
  duties?: string[];
}

export interface SiteProfile {
  name: string;
  role: string;
  objective: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  instagram: string;
  certificates: string;
  photo: string;
  cvPt: string;
  cvEn: string;
  islandLabel: string;
  contactLabel: string;
  languages: string[];
}

export interface AboutContent {
  overview: string[];
  stack: string[];
}

export interface AboutLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  icon?: AppIconName;
  glyph?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: AppIconName;
  external?: boolean;
}

export interface WidgetSpec {
  id: string;
  title: string;
  body: string;
}

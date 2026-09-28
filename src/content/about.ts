import type { AboutContent, AboutLink, AboutTab } from "@/lib/types";
import { profile } from "@/content/profile";

export const about: AboutContent = {
  overview: [
    "Swift / iOS nativo — VIP, MVVM e MVC em produção.",
    "Design System e blueprints de componentes.",
    "Back-end em C# e REST, com Azure e GCP.",
    "Promovido Trainee → iOS Jr → Pleno → Back-end.",
  ],
  stack: [
    "Swift",
    "VIP",
    "MVVM",
    "MVC",
    "C#",
    "REST",
    "Xcode",
    "TestFlight",
    "Git",
    "Design Systems",
    "Azure",
    "GCP",
  ],
};

export const aboutTabs: { id: AboutTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "stack", label: "Stack" },
  { id: "links", label: "Links" },
];

export const aboutLinks: AboutLink[] = [
  { id: "email", label: profile.email, href: `mailto:${profile.email}`, icon: "mail" },
  {
    id: "whatsapp",
    label: `WhatsApp · ${profile.phone}`,
    href: profile.whatsapp,
    icon: "phone",
    external: true,
  },
  { id: "github", label: "GitHub", href: profile.github, icon: "github", external: true },
  { id: "linkedin", label: "LinkedIn", href: profile.linkedin, icon: "linkedin", external: true },
  {
    id: "certificates",
    label: "Certificados Alura",
    href: profile.certificates,
    glyph: "✓",
    external: true,
  },
  { id: "cv-pt", label: "Currículo PT", href: profile.cvPt, icon: "resume", external: true },
  { id: "cv-en", label: "Resume EN", href: profile.cvEn, icon: "resume", external: true },
];

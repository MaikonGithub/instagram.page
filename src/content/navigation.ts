import type { NavItem } from "@/lib/types";
import { profile } from "@/content/profile";

export const dockItems: NavItem[] = [
  { id: "home", label: "Home", href: "#top", icon: "home" },
  { id: "projects", label: "Projetos", href: "#projects", icon: "testflight" },
  { id: "mail", label: "E-mail", href: `mailto:${profile.email}`, icon: "mail" },
  { id: "whatsapp", label: "WhatsApp", href: profile.whatsapp, icon: "phone", external: true },
  { id: "linkedin", label: "LinkedIn", href: profile.linkedin, icon: "linkedin", external: true },
  { id: "github", label: "GitHub", href: profile.github, icon: "github", external: true },
  { id: "resume", label: "Currículo", href: profile.cvPt, icon: "resume", external: true },
];

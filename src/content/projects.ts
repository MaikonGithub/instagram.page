import projectsJson from "@/content/projects.json";
import { publicPath } from "@/lib/publicPath";
import type { ProjectSpec } from "@/lib/types";

export const projects = (projectsJson as ProjectSpec[]).map((project) => ({
  ...project,
  screenshots: {
    ...project.screenshots,
    portrait: project.screenshots.portrait.map(publicPath),
  },
}));

import type { ProjectSpec } from "@/lib/types";
import projectsJson from "@/content/projects.json";

export const projects = projectsJson as ProjectSpec[];

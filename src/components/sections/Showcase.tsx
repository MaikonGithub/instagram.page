"use client";

import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/content/projects";

type ShowcaseProps = {
  isMobile: boolean;
};

export function Showcase({ isMobile }: ShowcaseProps) {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-5 pb-28 pt-6">
      <div className={`mb-6 ${isMobile ? "text-center" : ""}`}>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">App Store Showcase</h2>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">
          Experiência corporativa e projetos selecionados.
        </p>
      </div>
      <div className={`grid gap-5 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}

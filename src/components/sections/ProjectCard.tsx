import { AppIcon } from "@/components/ui/AppIcon";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import type { ProjectSpec } from "@/lib/types";

type ProjectCardProps = {
  project: ProjectSpec;
  isMobile: boolean;
};

export function ProjectCard({ project, isMobile }: ProjectCardProps) {
  const ctaHref = project.ctaUrl ?? project.githubUrl;
  const ctaLabel = project.ctaLabel ?? (project.githubUrl ? "View Code on GitHub" : undefined);
  const isGithub = !project.ctaUrl && Boolean(project.githubUrl);
  const isPhoto = project.screenshots.frame === "photo";

  return (
    <article className="glass squircle overflow-hidden">
      <div
        className={
          isPhoto
            ? isMobile
              ? "snap-x-mandatory flex gap-3 overflow-x-auto px-4 pt-4 pb-2"
              : "grid grid-cols-2 gap-3 p-4"
            : isMobile
              ? "snap-x-mandatory flex gap-3 overflow-x-auto px-4 pt-4 pb-2"
              : "grid grid-cols-2 gap-3 p-4 sm:grid-cols-3"
        }
      >
        {project.screenshots.portrait.map((src) => (
          <div
            key={src}
            className={`relative overflow-hidden bg-black/20 ${
              isPhoto
                ? isMobile
                  ? "snap-center h-[168px] w-[240px] shrink-0 rounded-2xl"
                  : "aspect-[3/2] rounded-2xl"
                : isMobile
                  ? "snap-center h-[280px] w-[140px] shrink-0 rounded-[28px]"
                  : "aspect-[9/19] rounded-[28px]"
            }`}
          >
            <ZoomableImage
              src={src}
              alt={isPhoto ? project.title : `${project.title} mockup`}
              className={`object-cover ${isPhoto ? "object-center" : ""}`}
              sizes={isPhoto ? "(max-width: 767px) 240px, 320px" : "180px"}
            />
          </div>
        ))}
      </div>

      <div className="space-y-3 px-5 pb-6 pt-2">
        <div className="flex flex-wrap gap-2">
          {project.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--accent)]"
            >
              {badge}
            </span>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">{project.subtitle}</p>
        </div>
        <p className="text-sm leading-relaxed">{project.highlight}</p>
        {ctaHref && ctaLabel && (
          <a
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
            className={`btn glass touch-target inline-flex h-12 items-center justify-center gap-3 rounded-full text-sm font-medium ${
              isGithub ? "pr-5 pl-[9px]" : "px-6"
            }`}
          >
            {isGithub && <AppIcon name="github" size={30} className="h-[30px] w-[30px]" />}
            {ctaLabel}
          </a>
        )}
      </div>
    </article>
  );
}

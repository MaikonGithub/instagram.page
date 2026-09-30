"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experience } from "@/content/experience";
import { cardReveal } from "@/lib/cardReveal";

type ExperienceSectionProps = {
  isMobile: boolean;
};

export function ExperienceSection({ isMobile }: ExperienceSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-5 pb-8 pt-2">
      <div className={`mb-5 ${isMobile ? "text-center" : ""}`}>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Experiência</h2>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">
          Onde construí e evoluí apps iOS em produção.
        </p>
      </div>

      <div className="grid gap-4">
        {experience.map((job) => (
          <motion.article
            key={job.id}
            className="glass squircle p-5 sm:p-6"
            {...cardReveal(reduceMotion, isMobile, 0.35)}
          >
            <div
              className={`flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between ${
                isMobile ? "text-center sm:text-left" : ""
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{job.role}</h3>
                <p className="text-sm text-[var(--accent)]">{job.company}</p>
              </div>
              <p className="text-sm text-[var(--fg-muted)]">{job.period}</p>
            </div>

            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--fg-muted)]">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.achievements.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--glass-border)] px-3 py-1.5 text-[12px] font-medium"
                  style={{ background: "color-mix(in srgb, var(--accent) 12%, transparent)" }}
                >
                  {item}
                </span>
              ))}
            </div>

            {job.duties && job.duties.length > 0 ? (
              <div className="mt-4">
                <button
                  type="button"
                  aria-expanded={openId === job.id}
                  onClick={() => setOpenId((current) => (current === job.id ? null : job.id))}
                  className="text-[12px] text-[var(--fg-muted)] underline decoration-transparent underline-offset-4 transition hover:text-[var(--fg)] hover:decoration-current"
                >
                  {openId === job.id ? "Ocultar funções" : "Funções"}
                </button>
                {openId === job.id ? (
                  <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-[var(--fg-muted)]">
                    {job.duties.map((duty) => (
                      <li key={duty}>{duty}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </motion.article>
        ))}
      </div>
    </section>
  );
}

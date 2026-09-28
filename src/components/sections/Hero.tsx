"use client";

import { motion } from "framer-motion";
import { AboutPanel } from "@/components/sections/AboutPanel";
import { AppIcon } from "@/components/ui/AppIcon";
import { profile } from "@/content/profile";
import type { AboutTab, AppIconName } from "@/lib/types";

const ctaButtonClass =
  "btn glass touch-target inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full pr-6 pl-2.5 text-sm font-medium";

const heroActions: { label: string; href: string; icon: AppIconName; external?: boolean }[] = [
  { label: "E-mail", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin", external: true },
  { label: "WhatsApp", href: profile.whatsapp, icon: "phone", external: true },
];

type HeroProps = {
  isMobile: boolean;
  aboutTab: AboutTab;
  onAboutTabChange: (tab: AboutTab) => void;
  onOpenAbout: () => void;
  showInlineAbout: boolean;
};

export function Hero({
  isMobile,
  aboutTab,
  onAboutTabChange,
  onOpenAbout,
  showInlineAbout,
}: HeroProps) {
  return (
    <section
      id="top"
      className={`mx-auto grid w-full max-w-7xl px-5 ${
        isMobile
          ? "gap-8 pt-24 pb-8 text-center"
          : "min-h-[calc(100vh-7rem)] grid-cols-[minmax(0,1fr)_440px] items-center gap-10 pt-20 pb-24"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={isMobile ? "mx-auto max-w-md" : ""}
      >
        <p className="mb-3 text-sm font-medium tracking-wide text-[var(--accent)]">
          {profile.location}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-xl text-[var(--fg-muted)] sm:text-2xl">{profile.role}</p>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
          {profile.objective}
        </p>

        <div className={`mt-8 flex flex-wrap gap-3.5 ${isMobile ? "justify-center" : ""}`}>
          {heroActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noreferrer" : undefined}
              className={ctaButtonClass}
            >
              <AppIcon name={action.icon} size={32} className="h-8 w-8" />
              {action.label}
            </a>
          ))}
          {isMobile && (
            <button
              type="button"
              onClick={onOpenAbout}
              className="touch-target inline-flex h-[52px] items-center justify-center rounded-full px-6 text-sm font-medium text-[var(--accent)]"
            >
              About
            </button>
          )}
        </div>
      </motion.div>

      {showInlineAbout && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="w-[440px] self-center justify-self-end"
        >
          <AboutPanel tab={aboutTab} onTabChange={onAboutTabChange} variant="window" />
        </motion.div>
      )}
    </section>
  );
}

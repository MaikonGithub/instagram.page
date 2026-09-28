"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import type { Theme } from "@/lib/types";

type MenuBarProps = {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenAbout: () => void;
};

export function MenuBar({ theme, onToggleTheme, onOpenAbout }: MenuBarProps) {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("pt-BR", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-between px-4 text-[13px] font-medium tracking-tight">
      <nav className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenAbout}
          className="touch-target inline-flex items-center font-semibold"
        >
          Maikon
        </button>
        <button type="button" onClick={onOpenAbout} className="opacity-80 hover:opacity-100">
          About
        </button>
        <a href="#experience" className="opacity-80 hover:opacity-100">
          Experience
        </a>
        <a href="#projects" className="opacity-80 hover:opacity-100">
          Projects
        </a>
        <a href={`mailto:${profile.email}`} className="opacity-80 hover:opacity-100">
          Contact
        </a>
      </nav>
      <div className="flex items-center gap-3 text-[12px] opacity-80">
        <button
          type="button"
          onClick={onToggleTheme}
          className="touch-target rounded-full px-2"
          aria-label="Alternar tema"
        >
          {theme === "dark" ? "Dark" : "Light"}
        </button>
        <span>{profile.location}</span>
        <span aria-live="polite">{clock}</span>
      </div>
    </header>
  );
}

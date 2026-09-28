"use client";

import { AppIcon } from "@/components/ui/AppIcon";
import { dockItems } from "@/content/navigation";

export function FloatingDock() {
  return (
    <nav
      aria-label="Dock"
      className="glass fixed top-1/2 left-5 z-50 flex -translate-y-1/2 flex-col items-center gap-4 rounded-[30px] px-3.5 py-5"
    >
      {dockItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          className="group relative flex h-12 w-12 origin-left items-center justify-center transition-transform duration-200 hover:translate-x-1 hover:scale-110"
          aria-label={item.label}
        >
          <AppIcon name={item.icon} size={48} className="h-12 w-12 drop-shadow-md" />
          <span className="glass-strong pointer-events-none absolute left-full ml-5 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}

"use client";

import { AppIcon } from "@/components/ui/AppIcon";
import { dockItems } from "@/content/navigation";

export function HorizontalDock() {
  return (
    <nav
      aria-label="Dock"
      className="glass safe-pad-bottom fixed inset-x-3 bottom-2 z-50 flex items-center justify-between gap-1 rounded-[28px] px-2.5 py-2"
    >
      {dockItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          className="group relative flex h-9 w-9 shrink-0 origin-bottom items-center justify-center transition-transform duration-200 hover:z-10 hover:-translate-y-1 hover:scale-110"
          aria-label={item.label}
        >
          <AppIcon name={item.icon} size={36} className="h-9 w-9 drop-shadow-md" />
          <span className="glass-strong pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}

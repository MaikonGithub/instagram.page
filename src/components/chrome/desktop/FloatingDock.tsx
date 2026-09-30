"use client";

import { DockItemLink } from "@/components/chrome/DockItemLink";
import { dockItems } from "@/content/navigation";

export function FloatingDock() {
  return (
    <nav
      aria-label="Dock"
      className="glass fixed top-1/2 left-5 z-50 flex -translate-y-1/2 flex-col items-center gap-4 rounded-[30px] px-3.5 py-5"
    >
      {dockItems.map((item) => (
        <DockItemLink key={item.id} item={item} axis="vertical" />
      ))}
    </nav>
  );
}

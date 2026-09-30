"use client";

import { DockItemLink } from "@/components/chrome/DockItemLink";
import { dockItems } from "@/content/navigation";

export function HorizontalDock() {
  return (
    <nav
      aria-label="Dock"
      className="glass safe-pad-bottom fixed inset-x-3 bottom-2 z-50 flex items-center justify-between gap-1 rounded-[28px] px-2.5 py-2"
    >
      {dockItems.map((item) => (
        <DockItemLink key={item.id} item={item} axis="horizontal" />
      ))}
    </nav>
  );
}

"use client";

import { widgets } from "@/content/widgets";

export function WidgetsGrid() {
  return (
    <section className="mx-auto hidden w-full max-w-6xl grid-cols-3 gap-4 px-5 pb-10 md:grid">
      {widgets.map((widget) => (
        <div key={widget.id} className="glass squircle p-5">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--fg-muted)]">
            {widget.title}
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight">{widget.body}</p>
        </div>
      ))}
    </section>
  );
}

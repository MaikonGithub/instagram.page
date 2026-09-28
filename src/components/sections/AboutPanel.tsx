"use client";

import { AppIcon } from "@/components/ui/AppIcon";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { about, aboutLinks, aboutTabs } from "@/content/about";
import { profile } from "@/content/profile";
import type { AboutTab } from "@/lib/types";

type AboutPanelProps = {
  tab: AboutTab;
  onTabChange: (tab: AboutTab) => void;
  onClose?: () => void;
  variant: "window" | "sheet";
};

export function AboutPanel({ tab, onTabChange, onClose, variant }: AboutPanelProps) {
  const isWindow = variant === "window";

  return (
    <section
      id="about"
      className={`glass-strong flex flex-col overflow-hidden ${
        isWindow
          ? "h-[520px] w-[440px] rounded-[20px] shadow-[var(--shadow)]"
          : "min-h-[520px] w-full rounded-t-[28px]"
      }`}
    >
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-[var(--glass-border)] px-4">
        <div className="flex min-w-0 items-center gap-2">
          {isWindow && (
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
          )}
          <h2 className="truncate text-sm font-semibold tracking-tight">About This Mac…</h2>
        </div>
        {variant === "sheet" && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="touch-target text-sm font-medium text-[var(--accent)]"
          >
            Done
          </button>
        )}
      </header>

      <div className="shrink-0 px-3 pt-3">
        <div
          className="grid grid-cols-3 rounded-[9px] p-0.5"
          style={{ background: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
          role="tablist"
          aria-label="About tabs"
        >
          {aboutTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => onTabChange(item.id)}
              className={`touch-target rounded-[7px] py-1.5 text-center text-[12px] font-medium transition-colors ${
                tab === item.id
                  ? "bg-[var(--glass-strong)] text-[var(--fg)] shadow-sm"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-5 pt-5 pb-6">
        <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === "overview" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative h-[168px] w-[168px] shrink-0 overflow-hidden rounded-[28px] shadow-[var(--shadow)] ring-1 ring-[var(--glass-border)]">
              <ZoomableImage
                src={profile.photo}
                alt={`${profile.name} com a equipe — crachá corporativo`}
                className="object-cover object-[center_18%]"
                sizes="168px"
                priority
              />
            </div>
            <div className="shrink-0">
              <p className="text-xl font-semibold leading-tight tracking-tight">{profile.name}</p>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">{profile.role}</p>
              <p className="mt-1 text-[11px] text-[var(--fg-muted)]">
                {profile.languages.join(" · ")}
              </p>
            </div>
            <ul className="w-full space-y-1.5 text-left text-[12px] leading-snug text-[var(--fg-muted)]">
              {about.overview.map((line) => (
                <li
                  key={line}
                  className="rounded-xl border border-[var(--glass-border)] px-3 py-2"
                  style={{ background: "color-mix(in srgb, var(--fg) 4%, transparent)" }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "stack" && (
          <div className="grid grid-cols-2 content-start gap-2">
            {about.stack.map((item) => (
              <div
                key={item}
                className="flex min-h-[56px] items-center justify-center rounded-2xl border border-[var(--glass-border)] px-2 text-center text-[13px] font-medium"
                style={{ background: "color-mix(in srgb, var(--fg) 4%, transparent)" }}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {tab === "links" && (
          <ul className="flex flex-col gap-1.5">
            {aboutLinks.map((row) => (
              <li key={row.id}>
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noreferrer" : undefined}
                  className="touch-target flex h-[50px] items-center gap-3.5 rounded-[14px] border border-[var(--glass-border)] pr-4 pl-[10px] transition-opacity hover:opacity-90"
                  style={{ background: "color-mix(in srgb, var(--fg) 4%, transparent)" }}
                >
                  {row.icon ? (
                    <AppIcon name={row.icon} size={30} className="h-[30px] w-[30px]" />
                  ) : (
                    <span
                      className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-[var(--accent-soft)] text-[11px] font-semibold text-[var(--accent)]"
                      aria-hidden
                    >
                      {row.glyph}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{row.label}</span>
                  <span className="text-[var(--fg-muted)]" aria-hidden>
                    ›
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
    </section>
  );
}

"use client";

type BottomTabBarProps = {
  onOpenAbout: () => void;
};

const tabs = [
  { id: "home", label: "Home", href: "#top" },
  { id: "projects", label: "Apps", href: "#projects" },
  { id: "about", label: "About", action: "about" as const },
] as const;

export function BottomTabBar({ onOpenAbout }: BottomTabBarProps) {
  return (
    <nav
      aria-label="Tab bar"
      className="glass fixed inset-x-0 bottom-0 z-50 border-t border-[var(--glass-border)] safe-pad-bottom"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 pt-1">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1">
            {"action" in tab ? (
              <button
                type="button"
                onClick={onOpenAbout}
                className="touch-target flex w-full flex-col items-center gap-0.5 py-1 text-[10px] font-medium opacity-80"
              >
                <span className="text-base" aria-hidden>
                  ⓘ
                </span>
                {tab.label}
              </button>
            ) : (
              <a
                href={tab.href}
                className="touch-target flex w-full flex-col items-center gap-0.5 py-1 text-[10px] font-medium opacity-80"
              >
                <span className="text-base" aria-hidden>
                  {tab.id === "home" ? "⌂" : "▦"}
                </span>
                {tab.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import { FloatingDock } from "@/components/chrome/desktop/FloatingDock";
import { MenuBar } from "@/components/chrome/desktop/MenuBar";
import { HorizontalDock } from "@/components/chrome/mobile/HorizontalDock";
import { DynamicIsland } from "@/components/chrome/mobile/DynamicIsland";
import { AboutPanel } from "@/components/sections/AboutPanel";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { WidgetsGrid } from "@/components/sections/WidgetsGrid";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useTheme } from "@/hooks/useTheme";
import { useViewport } from "@/hooks/useViewport";
import type { AboutTab } from "@/lib/types";

export function PortfolioShell() {
  const { isMobileVertical } = useViewport();
  const { theme, toggleTheme } = useTheme();
  const [aboutTab, setAboutTab] = useState<AboutTab>("overview");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="relative min-h-screen">
      {!isMobileVertical && (
        <MenuBar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenAbout={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}

      <DynamicIsland isMobile={isMobileVertical} />

      <main className={isMobileVertical ? "pb-28" : "pb-8 pl-28"}>
        <Hero
          isMobile={isMobileVertical}
          aboutTab={aboutTab}
          onAboutTabChange={setAboutTab}
          onOpenAbout={() => setSheetOpen(true)}
          showInlineAbout={!isMobileVertical}
        />
        {!isMobileVertical && <WidgetsGrid />}
        <ExperienceSection isMobile={isMobileVertical} />
        <Showcase isMobile={isMobileVertical} />
      </main>

      {isMobileVertical ? (
        <>
          <HorizontalDock />
          <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
            <AboutPanel
              tab={aboutTab}
              onTabChange={setAboutTab}
              onClose={() => setSheetOpen(false)}
              variant="sheet"
            />
          </BottomSheet>
        </>
      ) : (
        <FloatingDock />
      )}
    </div>
  );
}

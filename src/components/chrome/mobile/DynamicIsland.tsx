"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { profile } from "@/content/profile";

type DynamicIslandProps = {
  isMobile: boolean;
};

const COLLAPSE_DELAY_MS = 180;

const EXPANDED_WIDTH_DESKTOP = "384px";
const EXPANDED_WIDTH_MOBILE = "min(92vw, 360px)";
const EXPANDED_HEIGHT_DESKTOP = "132px";
const EXPANDED_HEIGHT_MOBILE = "156px";

const actionClassDesktop =
  "flex h-11 items-center justify-center gap-2 rounded-full bg-white/12 pr-3 pl-2 text-[12px] font-medium hover:bg-white/20";
const actionClassMobile =
  "flex h-[68px] flex-col items-center justify-center gap-1.5 rounded-[18px] bg-white/12 text-[11px] font-medium active:bg-white/20";

export function DynamicIsland({ isMobile }: DynamicIslandProps) {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const collapseTimer = useRef<number | null>(null);

  const clearCollapseTimer = () => {
    if (collapseTimer.current !== null) {
      window.clearTimeout(collapseTimer.current);
      collapseTimer.current = null;
    }
  };

  const open = () => {
    clearCollapseTimer();
    setExpanded(true);
  };

  const close = () => {
    clearCollapseTimer();
    setExpanded(false);
  };

  const scheduleClose = () => {
    clearCollapseTimer();
    collapseTimer.current = window.setTimeout(() => setExpanded(false), COLLAPSE_DELAY_MS);
  };

  useEffect(() => clearCollapseTimer, []);

  useEffect(() => {
    if (!expanded || !isMobile) return;

    const onPointerDown = (event: TouchEvent | MouseEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [expanded, isMobile]);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  const actionClass = isMobile ? actionClassMobile : actionClassDesktop;
  const actionIconSize = 28;
  const expandedWidth = isMobile ? EXPANDED_WIDTH_MOBILE : EXPANDED_WIDTH_DESKTOP;
  const expandedHeight = isMobile ? EXPANDED_HEIGHT_MOBILE : EXPANDED_HEIGHT_DESKTOP;

  const width = expanded ? expandedWidth : isMobile ? "128px" : "200px";
  const height = expanded ? expandedHeight : isMobile ? "30px" : "35px";

  const runAndClose = async (action?: () => void | Promise<void>) => {
    if (action) await action();
    close();
  };

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 z-[60] flex justify-center ${
        isMobile ? "safe-pad-top top-0" : "top-12"
      }`}
    >
      <motion.div
        ref={rootRef}
        className="pointer-events-auto relative overflow-hidden bg-[var(--island)] text-white shadow-[var(--shadow)]"
        initial={false}
        animate={{ width, height, borderRadius: expanded ? 28 : 20 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        onMouseEnter={isMobile ? undefined : open}
        onMouseLeave={isMobile ? undefined : scheduleClose}
        onFocus={isMobile ? undefined : open}
        onBlur={(event) => {
          if (isMobile) return;
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleClose();
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!expanded ? (
            <motion.button
              key="compact"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.08, duration: 0.12 } }}
              exit={{ opacity: 0, transition: { duration: 0.06 } }}
              className="absolute inset-0 flex items-center justify-center gap-2 px-3 text-[11px] font-medium whitespace-nowrap"
              onClick={isMobile ? open : undefined}
              aria-expanded={false}
              aria-label="Contatos rápidos"
            >
              <span className="pulse-dot inline-block h-2 w-2 shrink-0 rounded-full bg-[#30d158]" />
              <span className="truncate">{profile.islandLabel}</span>
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.06, duration: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.06 } }}
              className="absolute top-0 left-0 flex flex-col px-4 pt-3.5 pb-4"
              style={{ width: expandedWidth, height: expandedHeight }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[13px] font-semibold leading-tight">
                    <span className="pulse-dot inline-block h-2 w-2 shrink-0 rounded-full bg-[#30d158]" />
                    <span className="truncate">{profile.contactLabel}</span>
                  </p>
                  <p className="mt-0.5 truncate pl-4 text-[11px] text-white/55">
                    {profile.location}
                  </p>
                </div>
                {isMobile && (
                  <button
                    type="button"
                    onClick={close}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm text-white/80"
                    aria-label="Fechar"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="mt-auto grid grid-cols-3 gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className={actionClass}
                  onClick={() => runAndClose()}
                >
                  <AppIcon name="mail" size={actionIconSize} className="h-7 w-7" />
                  E-mail
                </a>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={actionClass}
                  onClick={() => runAndClose()}
                >
                  <AppIcon name="phone" size={actionIconSize} className="h-7 w-7" />
                  WhatsApp
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className={actionClass}
                  onClick={() => runAndClose()}
                >
                  <AppIcon name="github" size={actionIconSize} className="h-7 w-7" />
                  GitHub
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

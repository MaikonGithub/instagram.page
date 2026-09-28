"use client";

import { useState, useSyncExternalStore } from "react";
import type { Theme } from "@/lib/types";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getPreferredTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function useTheme() {
  const preferred = useSyncExternalStore(
    subscribe,
    getPreferredTheme,
    getServerSnapshot,
  );
  const [override, setOverride] = useState<Theme | null>(null);
  const theme = override ?? preferred;

  const setTheme = (next: Theme) => setOverride(next);
  const toggleTheme = () =>
    setOverride((current) => {
      const active = current ?? preferred;
      return active === "dark" ? "light" : "dark";
    });

  return { theme, setTheme, toggleTheme };
}

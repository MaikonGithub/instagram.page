"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

const MOBILE_QUERY = "(max-width: 767px)";

export function useViewport() {
  const isMobileVertical = useMediaQuery(MOBILE_QUERY);
  return { isMobileVertical };
}

"use client";

import { useEffect, useState } from "react";

export type ViewportMode = "mobile" | "desktop";

const MOBILE_QUERY = "(max-width: 767px)";

export function useViewportMode(): ViewportMode {
  const [mode, setMode] = useState<ViewportMode>("desktop");

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const apply = () => setMode(mq.matches ? "mobile" : "desktop");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return mode;
}

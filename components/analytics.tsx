"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PRODUCTION_HOST = "canadianwealthlab.github.io";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    __cwlGoogleTagConfigured?: boolean;
  }
}

function isProductionSite() {
  return (
    window.location.hostname === PRODUCTION_HOST &&
    window.location.protocol === "https:"
  );
}

function trackPageView(pathname: string) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  const debugMode =
    new URLSearchParams(window.location.search).get("ga_debug") === "1";

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: `${window.location.origin}${pathname}`,
    page_path: pathname,
    ...(debugMode ? { debug_mode: true } : {}),
  });
}

export function Analytics() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!isProductionSite() || lastTrackedPath.current === pathname) return;
    trackPageView(pathname);
    lastTrackedPath.current = pathname;
  }, [pathname]);

  return null;
}

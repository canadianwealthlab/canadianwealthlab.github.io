"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const MEASUREMENT_ID = "G-PDECYVLZLB";
const PRODUCTION_HOST = "canadianwealthlab.github.io";
const CONSENT_KEY = "cwl-analytics-consent";
const SETTINGS_EVENT = "cwl:analytics-settings";
const GOOGLE_TAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

type ConsentChoice = "granted" | "denied";
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    __cwlGoogleTagConfigured?: boolean;
    __cwlGoogleTagPromise?: Promise<void>;
  }
}

function isProductionSite() {
  return (
    typeof window !== "undefined" &&
    window.location.hostname === PRODUCTION_HOST &&
    window.location.protocol === "https:"
  );
}

function initializeConsentMode() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("set", "ads_data_redaction", true);
}

function updateConsent(choice: ConsentChoice) {
  window.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function removeAnalyticsCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) return;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${PRODUCTION_HOST}; SameSite=Lax`;
  });
}

function loadGoogleTag() {
  if (window.__cwlGoogleTagPromise) return window.__cwlGoogleTagPromise;

  window.__cwlGoogleTagPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_TAG_SRC}"]`,
    );

    const configure = () => {
      if (!window.__cwlGoogleTagConfigured) {
        window.gtag?.("js", new Date());
        window.gtag?.("config", MEASUREMENT_ID, {
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        });
        window.__cwlGoogleTagConfigured = true;
      }
      resolve();
    };

    if (existing) {
      configure();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = GOOGLE_TAG_SRC;
    script.dataset.cwlGoogleTag = "true";
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
      },
      { once: true },
    );
    script.addEventListener("error", () => reject(new Error("Google tag failed to load")), {
      once: true,
    });
    document.head.appendChild(script);
    configure();
  });

  return window.__cwlGoogleTagPromise;
}

export function AnalyticsSettingsButton() {
  return (
    <button
      className="footer-link-button"
      onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}
      type="button"
    >
      Analytics settings
    </button>
  );
}

export function Analytics() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const [isProduction, setIsProduction] = useState(false);
  const [consent, setConsent] = useState<ConsentChoice | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!isProductionSite()) return;

    initializeConsentMode();
    const initialize = window.setTimeout(() => {
      setIsProduction(true);
      const savedChoice = window.localStorage.getItem(CONSENT_KEY);
      if (savedChoice === "granted" || savedChoice === "denied") {
        setConsent(savedChoice);
        updateConsent(savedChoice);
      } else {
        setSettingsOpen(true);
      }
    }, 0);

    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(SETTINGS_EVENT, openSettings);
    return () => {
      window.clearTimeout(initialize);
      window.removeEventListener(SETTINGS_EVENT, openSettings);
    };
  }, []);

  useEffect(() => {
    if (!isProduction || consent !== "granted" || lastTrackedPath.current === pathname) {
      return;
    }

    let cancelled = false;
    void loadGoogleTag()
      .then(() => {
        if (cancelled || lastTrackedPath.current === pathname) return;

        const debugMode =
          new URLSearchParams(window.location.search).get("ga_debug") === "1";
        const pageLocation = `${window.location.origin}${pathname}`;

        window.gtag?.("event", "page_view", {
          page_title: document.title,
          page_location: pageLocation,
          page_path: pathname,
          ...(debugMode ? { debug_mode: true } : {}),
        });
        lastTrackedPath.current = pathname;
      })
      .catch(() => {
        // Analytics failure must never affect the site experience.
      });

    return () => {
      cancelled = true;
    };
  }, [consent, isProduction, pathname]);

  const saveChoice = useCallback(
    (choice: ConsentChoice) => {
      const previousChoice = consent;
      window.localStorage.setItem(CONSENT_KEY, choice);
      setConsent(choice);
      setSettingsOpen(false);

      if (choice === "denied") {
        removeAnalyticsCookies();
        lastTrackedPath.current = null;
        if (previousChoice === "granted") {
          window.location.reload();
          return;
        }
      }

      updateConsent(choice);
    },
    [consent],
  );

  if (!isProduction || !settingsOpen) return null;

  return (
    <aside
      aria-labelledby="analytics-consent-title"
      className="analytics-consent"
      role="dialog"
    >
      <div>
        <strong id="analytics-consent-title">Privacy-friendly analytics</strong>
        <p>
          With your permission, we use Google Analytics to count page views.
          Calculator values and form entries are never sent.
        </p>
        <Link href="/privacy">Read the privacy policy</Link>
      </div>
      <div className="analytics-consent-actions">
        <button onClick={() => saveChoice("denied")} type="button">
          Decline
        </button>
        <button
          className="analytics-consent-accept"
          onClick={() => saveChoice("granted")}
          type="button"
        >
          Allow analytics
        </button>
      </div>
    </aside>
  );
}

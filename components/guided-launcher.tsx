"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { trackGuidedEvent } from "@/lib/guided/analytics";
import type { JourneyId } from "@/lib/guided/types";

const GuidedExperience = lazy(() =>
  import("@/components/guided-experience").then((module) => ({
    default: module.GuidedExperience,
  })),
);

const journeyIds = new Set<JourneyId>([
  "next-dollar",
  "registered-accounts",
  "home-readiness",
]);

function getRequestedJourney() {
  const value = new URLSearchParams(window.location.search).get("start");
  return journeyIds.has(value as JourneyId) ? (value as JourneyId) : null;
}

export function GuidedLauncher() {
  const [journeyId, setJourneyId] = useState<JourneyId | null>(null);

  useEffect(() => {
    trackGuidedEvent("guided_experience_started");
    const initialize = window.setTimeout(() => {
      const requestedJourney = getRequestedJourney();
      if (requestedJourney) setJourneyId(requestedJourney);
    }, 0);

    const interceptJourneyLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("[data-guided-start]");
      const id = link?.dataset.guidedStart as JourneyId | undefined;
      if (!id || !journeyIds.has(id)) return;

      event.preventDefault();
      setJourneyId(id);
    };

    document.addEventListener("click", interceptJourneyLink);
    return () => {
      window.clearTimeout(initialize);
      document.removeEventListener("click", interceptJourneyLink);
    };
  }, []);

  useEffect(() => {
    const landing = document.getElementById("guided-landing");
    if (landing) landing.hidden = Boolean(journeyId);
    return () => {
      if (landing) landing.hidden = false;
    };
  }, [journeyId]);

  if (!journeyId) return null;

  return (
    <Suspense fallback={<div className="guided-loading" role="status">Loading your guided path</div>}>
      <GuidedExperience
        initialJourneyId={journeyId}
        key={journeyId}
        onExit={() => {
          window.history.replaceState({}, "", "/guided");
          setJourneyId(null);
        }}
      />
    </Suspense>
  );
}

"use client";

const PRODUCTION_HOST = "canadianwealthlab.github.io";
const CONSENT_KEY = "cwl-analytics-consent";

type GuidedEventName =
  | "guided_experience_started"
  | "guided_goal_selected"
  | "guided_step_completed"
  | "guided_results_viewed"
  | "guided_recommended_content_opened"
  | "guided_journey_restarted"
  | "guided_journey_abandoned";

type GuidedEventData = {
  journey_id?: string;
  step_id?: string;
  content_type?: "article" | "calculator" | "source";
};

export function trackGuidedEvent(
  eventName: GuidedEventName,
  data: GuidedEventData = {},
) {
  if (
    typeof window === "undefined" ||
    window.location.hostname !== PRODUCTION_HOST ||
    window.location.protocol !== "https:" ||
    window.localStorage.getItem(CONSENT_KEY) !== "granted"
  ) {
    return;
  }

  const gtag = (
    window as Window & {
      gtag?: (name: "event", event: string, values: GuidedEventData) => void;
    }
  ).gtag;

  gtag?.("event", eventName, data);
}

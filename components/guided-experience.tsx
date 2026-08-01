"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  BookOpen,
  Calculator,
  Check,
  CircleHelp,
  Compass,
  ExternalLink,
  Landmark,
  LockKeyhole,
  MessageCircle,
  Plus,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackGuidedEvent } from "@/lib/guided/analytics";
import {
  buildGuidedResult,
  validateGuidedStep,
  visibleStepIds,
} from "@/lib/guided/engine.mjs";
import { getJourney } from "@/lib/guided/journeys";
import { getGuidedRecommendations } from "@/lib/guided/recommendations";
import { getGuidedSources } from "@/lib/guided/sources";
import type {
  GuidedResponses,
  GuidedResponse,
  GuidedResult,
  GuidedSourceType,
  GuidedStep,
  JourneyId,
  DebtItem,
} from "@/lib/guided/types";

type Phase = "questions" | "results";
const sessionKey = "cwl-guided-session-v2";

const sourceGroups: Array<{
  type: GuidedSourceType;
  label: string;
  description: string;
  icon: typeof Landmark;
}> = [
  {
    type: "official",
    label: "Official Canadian guidance",
    description: "Primary government and regulator information.",
    icon: Landmark,
  },
  {
    type: "educational",
    label: "Institution educational material",
    description: "Useful context from financial institutions, not independent or official rules.",
    icon: BookOpen,
  },
  {
    type: "community",
    label: "Reddit community perspective",
    description: "Anecdotal experiences and opinions. Read the full thread and verify claims.",
    icon: MessageCircle,
  },
];

function formatRangeValue(step: Extract<GuidedStep, { type: "range" }>, value: number) {
  return `${step.prefix || ""}${value.toLocaleString("en-CA")}${step.suffix || ""}`;
}

function GuidedStepField({
  step,
  value,
  onChange,
}: {
  step: GuidedStep;
  value: GuidedResponse | undefined;
  onChange: (value: GuidedResponse | undefined) => void;
}) {
  if (step.type === "checkpoint") {
    return (
      <div className="guided-checkpoint">
        <BookOpen size={22} aria-hidden="true" />
        <ul>{step.body.map((item) => <li key={item}>{item}</li>)}</ul>
        {step.articleHref ? <Link href={step.articleHref}>{step.articleLabel} <ArrowUpRight size={15} /></Link> : null}
      </div>
    );
  }

  if (step.type === "debt-list") {
    const debts = Array.isArray(value) ? value as DebtItem[] : [];
    const update = (index: number, field: keyof DebtItem, nextValue: string | number) => {
      onChange(debts.map((debt, itemIndex) => itemIndex === index ? { ...debt, [field]: nextValue } : debt));
    };
    const addDebt = () => {
      if (debts.length >= step.maxItems) return;
      onChange([...debts, { id: crypto.randomUUID(), type: "", balance: 0, interestRate: 0, minimumPayment: 0, security: "unsecured", rateType: "variable", status: "current" }]);
    };
    return (
      <div className="guided-debt-list">
        {debts.map((debt, index) => (
          <fieldset key={debt.id} className="guided-debt-card">
            <legend>Debt {index + 1}</legend>
            <label>Name or type<input value={debt.type} onChange={(event) => update(index, "type", event.target.value)} placeholder="Credit card" autoComplete="off" /></label>
            <div className="guided-debt-fields">
              <label>Balance ($)<input inputMode="decimal" min="0" type="number" value={debt.balance || ""} onChange={(event) => update(index, "balance", Number(event.target.value))} /></label>
              <label>Annual rate (%)<input inputMode="decimal" min="0" max="60" step="0.01" type="number" value={debt.interestRate || ""} onChange={(event) => update(index, "interestRate", Number(event.target.value))} /></label>
              <label>Required monthly payment ($)<input inputMode="decimal" min="0" type="number" value={debt.minimumPayment || ""} onChange={(event) => update(index, "minimumPayment", Number(event.target.value))} /></label>
            </div>
            <div className="guided-debt-selects">
              <label>Security<select value={debt.security} onChange={(event) => update(index, "security", event.target.value)}><option value="unsecured">Unsecured</option><option value="secured">Secured</option></select></label>
              <label>Rate type<select value={debt.rateType} onChange={(event) => update(index, "rateType", event.target.value)}><option value="variable">Variable</option><option value="fixed">Fixed</option><option value="promotional">Promotional</option></select></label>
              <label>Status<select value={debt.status} onChange={(event) => update(index, "status", event.target.value)}><option value="current">Current</option><option value="past-due">Past due</option><option value="collections">Collections or legal</option></select></label>
            </div>
            <button className="guided-remove-debt" type="button" onClick={() => onChange(debts.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={15} /> Remove</button>
          </fieldset>
        ))}
        <button className="button button-secondary" type="button" onClick={addDebt} disabled={debts.length >= step.maxItems}><Plus size={16} /> Add debt</button>
      </div>
    );
  }
  if (step.type === "choice" || step.type === "quiz") {
    return (
      <fieldset className="guided-options">
        <legend className="sr-only">{step.question}</legend>
        {step.options.map((option) => {
          const selected = value === option.value;
          return (
            <label className={selected ? "guided-option is-selected" : "guided-option"} key={option.value}>
              <input
                checked={selected}
                name={step.id}
                onChange={() => onChange(option.value)}
                type="radio"
                value={option.value}
              />
              <span className="guided-option-check" aria-hidden="true">
                {selected ? <Check size={15} /> : null}
              </span>
              <span>
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </span>
            </label>
          );
        })}
      </fieldset>
    );
  }

  if (step.type === "range") {
    const displayValue = typeof value === "number" ? value : step.defaultValue;
    return (
      <div className="guided-range-field">
        <output htmlFor={step.id}>
          {typeof value === "number"
            ? formatRangeValue(step, displayValue)
            : "Move the slider to answer"}
        </output>
        <input
          aria-valuetext={formatRangeValue(step, displayValue)}
          id={step.id}
          max={step.max}
          min={step.min}
          onChange={(event) => onChange(Number(event.target.value))}
          step={step.step}
          type="range"
          value={displayValue}
        />
        <div className="guided-range-scale" aria-hidden="true">
          <span>{formatRangeValue(step, step.min)}</span>
          <span>{formatRangeValue(step, step.max)}</span>
        </div>
        {typeof value !== "number" ? (
          <button
            className="guided-range-confirm"
            onClick={() => onChange(displayValue)}
            type="button"
          >
            Use {formatRangeValue(step, displayValue)}
          </button>
        ) : null}
      </div>
    );
  }

  const displayValue = typeof value === "number" ? String(value) : "";
  return (
    <div className="guided-money-field">
      <label htmlFor={step.id}>Amount in Canadian dollars</label>
      <span className="guided-money-wrap">
        <span aria-hidden="true">$</span>
        <input
          autoComplete="off"
          id={step.id}
          inputMode="numeric"
          max={step.max}
          min="0"
          onChange={(event) => {
            const cleaned = event.target.value.replace(/[^\d]/g, "");
            onChange(cleaned === "" ? undefined : Math.min(Number(cleaned), step.max));
          }}
          placeholder={step.placeholder}
          type="text"
          value={displayValue}
        />
        <small>CAD</small>
      </span>
      {step.allowUnknown ? (
        <button className={value === "unknown" ? "guided-unknown is-selected" : "guided-unknown"} type="button" onClick={() => onChange(value === "unknown" ? undefined : "unknown")}>
          {value === "unknown" ? <Check size={15} /> : <CircleHelp size={15} />} I do not know this yet
        </button>
      ) : null}
      {step.allowUnknown && step.unknownHelp && value === "unknown" ? <small>{step.unknownHelp}</small> : null}
    </div>
  );
}

export function GuidedExperience({
  initialJourneyId,
  onExit,
}: {
  initialJourneyId: JourneyId;
  onExit: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("questions");
  const journeyId = initialJourneyId;
  const [responses, setResponses] = useState<GuidedResponses>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState("");
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [savedShared, setSavedShared] = useState<GuidedResponses>({});
  const [reusePrompt, setReusePrompt] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const journey = getJourney(journeyId);
  const visibleIds = useMemo(
    () => (journey ? visibleStepIds(journey, responses) : []),
    [journey, responses],
  );
  const steps = useMemo(
    () =>
      journey
        ? visibleIds
            .map((id: string) => journey.steps.find((step) => step.id === id))
            .filter((step): step is GuidedStep => Boolean(step))
        : [],
    [journey, visibleIds],
  );
  const activeStep = steps[stepIndex];
  const progress = steps.length ? ((stepIndex + 1) / steps.length) * 100 : 0;
  const result = useMemo(
    () =>
      phase === "results" && journeyId
        ? (buildGuidedResult(journeyId, responses) as GuidedResult)
        : null,
    [journeyId, phase, responses],
  );

  useEffect(() => {
    trackGuidedEvent("guided_goal_selected", { journey_id: journeyId });
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initialize = window.setTimeout(() => {
      try {
        const stored = JSON.parse(sessionStorage.getItem(sessionKey) || "{}") as { shared?: GuidedResponses; journeys?: Partial<Record<JourneyId, GuidedResponses>> };
        const prior = stored.journeys?.[journeyId];
        if (prior) setResponses(prior);
        if (stored.shared && Object.keys(stored.shared).length) {
          setSavedShared(stored.shared);
          setReusePrompt(!prior);
        }
      } catch {
        sessionStorage.removeItem(sessionKey);
      }
    }, 0);
    return () => window.clearTimeout(initialize);
  }, [journeyId]);

  useEffect(() => {
    if (!journey) return;
    try {
      const stored = JSON.parse(sessionStorage.getItem(sessionKey) || "{}") as { shared?: GuidedResponses; journeys?: Partial<Record<JourneyId, GuidedResponses>> };
      const shared = { ...(stored.shared || {}) };
      for (const step of journey.steps) if (step.shared && responses[step.id] !== undefined) shared[step.id] = responses[step.id];
      sessionStorage.setItem(sessionKey, JSON.stringify({ shared, journeys: { ...(stored.journeys || {}), [journeyId]: responses } }));
    } catch {
      // The experience remains usable if browser storage is unavailable.
    }
  }, [journey, journeyId, responses]);

  useEffect(() => {
    const recordAbandonment = () => {
      if (phase === "questions" && !completedRef.current) {
        trackGuidedEvent("guided_journey_abandoned", { journey_id: journeyId });
      }
    };
    window.addEventListener("pagehide", recordAbandonment);
    return () => window.removeEventListener("pagehide", recordAbandonment);
  }, [journeyId, phase]);

  useEffect(() => {
    if (phase === "results") {
      resultRef.current?.focus();
    }
  }, [phase]);

  function changeResponse(value: GuidedResponse | undefined) {
    if (!activeStep) return;
    setError("");
    setResponses((current) => {
      const next = { ...current };
      if (value === undefined) {
        delete next[activeStep.id];
      } else {
        next[activeStep.id] = value;
      }

      if (activeStep.id === "primary-goal" && value !== "first-home") {
        delete next["first-home-status"];
      }
      return next;
    });
  }

  function continueJourney() {
    if (!journey || !activeStep) return;
    const value = responses[activeStep.id];
    const validationError = validateGuidedStep(activeStep, value, responses);
    if (validationError) {
      setError(validationError);
      return;
    }

    trackGuidedEvent("guided_step_completed", {
      journey_id: journey.id,
      step_id: activeStep.id,
    });

    if (editingStepId) {
      setEditingStepId(null);
      completedRef.current = true;
      setPhase("results");
      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((current) => current + 1);
      setError("");
      return;
    }

    completedRef.current = true;
    setPhase("results");
    setError("");
    trackGuidedEvent("guided_results_viewed", { journey_id: journey.id });
  }

  function goBack() {
    if (stepIndex === 0) {
      exitJourney(false);
      return;
    }
    setStepIndex((current) => current - 1);
    setError("");
  }

  function exitJourney(trackRestart: boolean) {
    if (trackRestart) {
      trackGuidedEvent("guided_journey_restarted", { journey_id: journeyId });
    }
    setResponses({});
    setStepIndex(0);
    setError("");
    completedRef.current = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
    onExit();
  }

  function restart() {
    exitJourney(true);
  }

  function reuseSharedAnswers() {
    setResponses((current) => ({ ...savedShared, ...current }));
    setReusePrompt(false);
  }

  function editAssumption(stepId: string) {
    const nextIndex = steps.findIndex((step) => step.id === stepId);
    if (nextIndex < 0) return;
    setEditingStepId(stepId);
    setStepIndex(nextIndex);
    setPhase("questions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (phase === "questions" && journey && activeStep) {
    return (
      <main className="guided-question-page">
        <div className="container guided-question-shell">
          <header className="guided-question-header">
            <Link className="guided-brand-link" href="/guided" onClick={restart}>
              <Compass size={18} /> Get Guided
            </Link>
            <button className="guided-restart-button" onClick={restart} type="button">
              <RefreshCcw size={15} /> Start over
            </button>
          </header>

          <div className="guided-progress-wrap">
            <div className="guided-progress-meta">
              <span>{journey.shortTitle}</span>
              <span>Step {stepIndex + 1} · path adapts as you answer</span>
            </div>
            <div
              aria-label={`Step ${stepIndex + 1} in an adaptive path`}
              aria-valuemax={steps.length}
              aria-valuemin={1}
              aria-valuenow={stepIndex + 1}
              className="guided-progress"
              role="progressbar"
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          {reusePrompt ? (
            <aside className="guided-reuse" aria-label="Reuse earlier answers">
              <div><strong>Reuse shared answers from this tab?</strong><p>Only overlapping context such as province, household, income stability, or emergency savings will be copied.</p></div>
              <button className="button button-secondary" type="button" onClick={reuseSharedAnswers}>Reuse answers</button>
              <button type="button" onClick={() => setReusePrompt(false)}>Not now</button>
            </aside>
          ) : null}

          <section className="guided-question-card" aria-labelledby="guided-question-title">
            <span className="guided-step-label">
              {activeStep.type === "checkpoint" ? "EDUCATION CHECKPOINT" : activeStep.type === "quiz" ? "QUICK CHECK" : "YOUR CONTEXT"}
            </span>
            <h1 id="guided-question-title">{activeStep.question}</h1>
            <p className="guided-question-helper">
              <CircleHelp size={17} aria-hidden="true" />
              <span>{activeStep.helper}</span>
            </p>

            <GuidedStepField
              key={activeStep.id}
              onChange={changeResponse}
              step={activeStep}
              value={responses[activeStep.id]}
            />

            <p aria-live="polite" className="guided-validation">
              {error}
            </p>
            <div className="guided-question-actions">
              <button className="button button-secondary" onClick={goBack} type="button">
                <ArrowLeft size={17} /> Back
              </button>
              <button className="button button-primary" onClick={continueJourney} type="button">
                {editingStepId ? "Update result" : stepIndex === steps.length - 1 ? "See my decision map" : "Continue"}
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
          <p className="guided-browser-note">
            <LockKeyhole size={15} /> Responses stay in session storage for this tab so another path can reuse shared context. Values are never sent to analytics and clear when the tab closes.
          </p>
        </div>
      </main>
    );
  }

  if (!journey || !result) return null;

  const recommendedArticles = getGuidedRecommendations(
    "article",
    result.articleSlugs,
  );
  const recommendedCalculators = getGuidedRecommendations(
    "calculator",
    result.calculatorSlugs,
  );
  const resultSources = getGuidedSources(result.sourceIds);

  return (
    <main className="guided-results-page">
      <section className="guided-result-hero">
        <div className="container">
          <button className="guided-restart-button guided-result-restart" onClick={restart} type="button">
            <RefreshCcw size={15} /> Choose another goal
          </button>
          <div className="guided-result-heading" ref={resultRef} tabIndex={-1}>
            <span className="kicker">YOUR EDUCATIONAL DECISION MAP</span>
            <span className="guided-signal">{result.signal}</span>
            <h1>{result.headline}</h1>
            <p>{result.summary}</p>
          </div>
          <div className="guided-result-caveat">
            <ShieldCheck size={20} />
            <p>
              This is personalized education based only on the responses in
              this tab. It is not individualized financial, investment, tax,
              mortgage, or legal advice.
            </p>
          </div>
          {result.urgentSupport ? (
            <div className="guided-urgent" role="alert">
              <AlertTriangle size={22} />
              <div><strong>This result calls for stabilization, not just optimization.</strong><p>Protect essentials, contact creditors, and use the qualified Canadian support resources below. Do not pay an unverified company upfront for a promised quick fix.</p></div>
            </div>
          ) : null}
        </div>
      </section>

      <div className="container guided-results-body">
        <section className="guided-heard" aria-labelledby="guided-heard-title">
          <div className="guided-section-heading"><span className="kicker">WHAT WE HEARD</span><h2 id="guided-heard-title">The inputs shaping this result</h2></div>
          <ul>{result.heard.map((item) => <li key={item}><Check size={15} /> {item}</li>)}</ul>
        </section>

        {result.spectrum ? (
          <section className="guided-spectrum" aria-labelledby="guided-spectrum-title">
            <div className="guided-section-heading"><span className="kicker">DECISION SPECTRUM</span><h2 id="guided-spectrum-title">Where your stated priorities point</h2></div>
            <div className="guided-spectrum-labels"><span>{result.spectrum.left}</span><span>{result.spectrum.right}</span></div>
            <div className="guided-spectrum-track"><span style={{ left: `${result.spectrum.position}%` }} /></div>
            <p>{result.spectrum.label}</p>
          </section>
        ) : null}

        <section aria-labelledby="guided-snapshot-title">
          <div className="guided-section-heading">
            <span className="kicker">SCENARIO SNAPSHOT</span>
            <h2 id="guided-snapshot-title">The numbers that shape this path</h2>
          </div>
          <div className="guided-metric-grid">
            {result.metrics.map((metric) => (
              <article key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {result.scenarios.length ? (
          <section aria-labelledby="guided-scenarios-title">
            <div className="guided-section-heading"><span className="kicker">SCENARIO RANGE</span><h2 id="guided-scenarios-title">Compare outcomes, not a single forecast</h2></div>
            <div className="guided-scenario-wrap" tabIndex={0} aria-label="Scrollable scenario comparison">
              <table className="guided-scenario-table"><thead><tr><th>Scenario</th>{result.scenarioColumns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{result.scenarios.map((scenario) => <tr key={scenario.label}><th>{scenario.label}{scenario.note ? <small>{scenario.note}</small> : null}</th>{scenario.values.map((value, index) => <td key={`${scenario.label}-${result.scenarioColumns[index]}`}>{value}</td>)}</tr>)}</tbody></table>
            </div>
          </section>
        ) : null}

        {result.timeline?.length ? (
          <section className="guided-timeline" aria-labelledby="guided-timeline-title"><div className="guided-section-heading"><span className="kicker">MILESTONES</span><h2 id="guided-timeline-title">Illustrative payoff sequence</h2></div><ol>{result.timeline.map((item) => <li key={`${item.label}-${item.value}`}><span>{item.label}</span><strong>{item.value}</strong><p>{item.detail}</p></li>)}</ol></section>
        ) : null}

        <section className="guided-result-grid" aria-labelledby="guided-concepts-title">
          <div>
            <div className="guided-section-heading">
              <span className="kicker">KEY CONCEPTS</span>
              <h2 id="guided-concepts-title">What to understand</h2>
            </div>
            <div className="guided-concept-list">
              {result.concepts.map((concept, index) => (
                <article key={concept.title}>
                  <span>0{index + 1}</span>
                  <div><h3>{concept.title}</h3><p>{concept.body}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <div className="guided-section-heading">
              <span className="kicker">TRADEOFFS</span>
              <h2>What changes with the path</h2>
            </div>
            <div className="guided-tradeoff-list">
              {result.tradeoffs.map((tradeoff) => (
                <article key={tradeoff.title}>
                  <Scale size={19} />
                  <div><h3>{tradeoff.title}</h3><p>{tradeoff.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="guided-next-steps" aria-labelledby="guided-next-title">
          <div className="guided-section-heading">
            <span className="kicker">PRACTICAL NEXT STEPS</span>
            <h2 id="guided-next-title">Move from signal to verification</h2>
          </div>
          <ol>
            {result.nextSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <section className="guided-detail-grid">
          <div><div className="guided-section-heading"><span className="kicker">WHAT COULD CHANGE THIS</span><h2>Factors outside the model</h2></div><ul>{result.alternativeFactors.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><div className="guided-section-heading"><span className="kicker">VERIFY NEXT</span><h2>Missing or professional inputs</h2></div>{result.missingInformation.length ? <ul>{result.missingInformation.map((item) => <li key={item}>{item}</li>)}</ul> : <p>No user-entered field was marked unknown. External verification still matters.</p>}{result.professionalAdvice.length ? <ul>{result.professionalAdvice.map((item) => <li key={item}>{item}</li>)}</ul> : null}</div>
        </section>

        <section className="guided-revise" aria-labelledby="guided-revise-title">
          <div className="guided-section-heading"><span className="kicker">TEST ANOTHER ASSUMPTION</span><h2 id="guided-revise-title">Change one input and update this result</h2></div>
          <div>{result.reviseStepIds.map((stepId) => { const step = journey.steps.find((item) => item.id === stepId); return step ? <button type="button" key={stepId} onClick={() => editAssumption(stepId)}>{step.question}<ArrowRight size={15} /></button> : null; })}</div>
        </section>

        <section className="guided-resources" aria-labelledby="guided-resources-title">
          <div className="guided-section-heading">
            <span className="kicker">KEEP EXPLORING</span>
            <h2 id="guided-resources-title">Guides and tools for the next layer</h2>
          </div>
          <div className="guided-resource-grid">
            {recommendedArticles.map((article) => (
              <Link
                href={article.href}
                key={article.slug}
                onClick={() =>
                  trackGuidedEvent("guided_recommended_content_opened", {
                    journey_id: journey.id,
                    content_type: "article",
                  })
                }
              >
                <BookOpen size={19} />
                <span><small>Guide</small><strong>{article.title}</strong></span>
                <ArrowRight size={17} />
              </Link>
            ))}
            {recommendedCalculators.map((calculator) => (
              <Link
                href={calculator.href}
                key={calculator.slug}
                onClick={() =>
                  trackGuidedEvent("guided_recommended_content_opened", {
                    journey_id: journey.id,
                    content_type: "calculator",
                  })
                }
              >
                <Calculator size={19} />
                <span><small>Calculator</small><strong>{calculator.title}</strong></span>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>
        </section>

        <section className="guided-sources-section" aria-labelledby="guided-sources-title">
          <div className="guided-section-heading">
            <span className="kicker">SOURCES AND PERSPECTIVES</span>
            <h2 id="guided-sources-title">Inspect the basis for this result</h2>
            <p>
              Official rules lead. Institution material adds educational
              context. Reddit links surface lived experience, not verified
              evidence or advice.
            </p>
          </div>
          <div className="guided-source-groups">
            {sourceGroups.map(({ type, label, description, icon: Icon }) => {
              const items = resultSources.filter((source) => source.type === type);
              if (!items.length) return null;
              return (
                <div className="guided-source-group" key={type}>
                  <header>
                    <Icon size={19} />
                    <div><h3>{label}</h3><p>{description}</p></div>
                  </header>
                  <ul>
                    {items.map((source) => (
                      <li key={source.id}>
                        <a
                          href={source.url}
                          onClick={() =>
                            trackGuidedEvent("guided_recommended_content_opened", {
                              journey_id: journey.id,
                              content_type: "source",
                            })
                          }
                          rel="noreferrer"
                          target="_blank"
                        >
                          <span>
                            <small>{source.publisher}</small>
                            <strong>{source.title}</strong>
                            <p>{source.context}</p>
                            <small>{source.jurisdiction} · Reviewed {source.reviewed}{source.effectiveDate ? ` · Effective ${source.effectiveDate}` : ""}</small>
                          </span>
                          <ExternalLink size={16} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="guided-assumptions" aria-labelledby="guided-assumptions-title">
          <div>
            <CircleHelp size={19} />
            <h2 id="guided-assumptions-title">Assumptions and limitations</h2>
          </div>
          <ul>{result.assumptions.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>
            Review current source rules and your own records before acting.
            Consider a qualified professional for advice based on your complete
            circumstances.
          </p>
        </section>

        <div className="guided-final-actions">
          <button className="button button-primary" onClick={restart} type="button">
            Explore another goal <ArrowRight size={17} />
          </button>
          <Link className="button button-secondary" href="/guides">
            Browse all guides <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}

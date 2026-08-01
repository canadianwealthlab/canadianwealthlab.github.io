import Link from "next/link";
import {
  ArrowRight,
  Compass,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { guidedJourneys } from "@/lib/guided/journeys";

export function GuidedLanding() {
  return (
    <main className="guided-page" id="guided-landing">
      <section className="guided-hero">
        <div className="container guided-hero-grid">
          <div>
            <span className="kicker">GET GUIDED</span>
            <h1>A clearer path through your next money decision.</h1>
            <p>
              Choose a goal, answer a few focused questions, and get an
              educational decision map with tradeoffs, next steps, and sources
              you can inspect.
            </p>
            <div className="guided-trust-row">
              <span><LockKeyhole size={16} /> No account</span>
              <span><ShieldCheck size={16} /> Tab-local only</span>
              <span><Compass size={16} /> Education, not advice</span>
            </div>
          </div>
          <aside className="guided-hero-note">
            <Sparkles size={22} aria-hidden="true" />
            <strong>Guidance without the black box</strong>
            <p>
              Each result shows its assumptions and separates official rules,
              educational material, and community perspective.
            </p>
          </aside>
        </div>
      </section>

      <section className="guided-picker">
        <div className="container">
          <div className="guided-picker-heading">
            <div>
              <span className="kicker">CHOOSE YOUR STARTING POINT</span>
              <h2>What are you trying to work through?</h2>
            </div>
            <p>
              Your responses stay only in this browser tab and can be reused
              across paths. They clear when the tab closes and are never sent to analytics.
            </p>
          </div>
          <div className="guided-journey-grid">
            {guidedJourneys.map((item) => (
              <article className="guided-journey-card" key={item.id}>
                <span className="guided-journey-number">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <dl>
                  <div><dt>Time</dt><dd>{item.time}</dd></div>
                  <div><dt>You get</dt><dd>{item.outcome}</dd></div>
                </dl>
                <Link
                  data-guided-start={item.id}
                  href={`/guided/${item.id}`}
                >
                  Start this path <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
          <p className="guided-picker-note">
            Prefer to browse? The original <Link href="/calculators">calculators</Link>,{" "}
            <Link href="/guides">guides</Link>, and topic directories remain available.
          </p>
        </div>
      </section>
    </main>
  );
}

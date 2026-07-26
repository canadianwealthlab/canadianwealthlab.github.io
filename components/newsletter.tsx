"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="newsletter-section">
      <div className="container newsletter-grid">
        <div>
          <span className="kicker">THE LAB NOTE</span>
          <h2>One smart money idea, occasionally.</h2>
          <p>
            New calculators, practical frameworks, and thoughtful analysis for
            Canadian households. No daily market noise.
          </p>
        </div>
        <div>
          {submitted ? (
            <p role="status"><strong>You’re on the early-access list.</strong> We’ll keep it useful and infrequent.</p>
          ) : (
            <form className="newsletter-form" onSubmit={submit}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" placeholder="you@example.ca" required />
              <button type="submit">Join the list</button>
            </form>
          )}
          <div className="form-note">Placeholder signup for the MVP. No data is sent or stored.</div>
        </div>
      </div>
    </section>
  );
}

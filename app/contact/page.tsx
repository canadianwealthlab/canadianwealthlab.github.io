import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Canadian Wealth Lab about corrections, sources, calculations, or project feedback.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="kicker">CONTACT</span>
          <h1>Help us make the work stronger.</h1>
          <p>
            Report a factual issue, question a calculator result, recommend a
            primary source, or share feedback about the project.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2>For the fastest review</h2>
            <p>
              Include the page address, the exact statement or result involved,
              and an official source or reproducible example when available.
              Please do not send personal financial, tax, identity, or account
              information.
            </p>
          </div>
          <div className="contact-card">
            <span className="kicker">PROJECT CHANNEL</span>
            <h2>Canadian Wealth Lab on GitHub</h2>
            <p>
              Until a dedicated contact address is published, use the project’s
              public GitHub organization for editorial and technical feedback.
            </p>
            <a
              className="button button-primary"
              href="https://github.com/canadianwealthlab"
              rel="noreferrer"
              target="_blank"
            >
              Visit the organization <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="container contact-policy">
          <Link href="/about/corrections-policy">
            Read the corrections policy
          </Link>
          <Link href="/privacy">Read the privacy policy</Link>
        </div>
      </section>
    </main>
  );
}

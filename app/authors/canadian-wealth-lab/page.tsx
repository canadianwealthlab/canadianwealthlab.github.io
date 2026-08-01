import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Calculator, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Canadian Wealth Lab Editorial Team",
  description:
    "About the team and review process behind Canadian Wealth Lab guides and calculators.",
  alternates: { canonical: "/authors/canadian-wealth-lab" },
};

export default function EditorialTeamPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="kicker">AUTHOR PROFILE</span>
          <h1>Canadian Wealth Lab Editorial Team</h1>
          <p>
            An independent publishing project focused on transparent Canadian
            financial education and decision-support tools.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container author-layout">
          <div className="author-statement">
            <p>
              Articles are currently researched, written, and reviewed under a
              collective editorial byline. Canadian Wealth Lab is not a
              registered advisory firm, and this byline does not claim a
              professional designation.
            </p>
            <p>
              Our credibility standard is traceability: primary sources,
              visible assumptions, publication and review dates, disclosed
              limitations, and a public corrections process.
            </p>
          </div>
          <div className="author-principles">
            {[
              {
                icon: BookOpenCheck,
                title: "Primary-source research",
                copy: "Canadian government, regulator, and original product documentation receive priority.",
              },
              {
                icon: Calculator,
                title: "Transparent calculations",
                copy: "Models disclose the assumptions that materially affect the result.",
              },
              {
                icon: Scale,
                title: "Balanced conclusions",
                copy: "Guides explain who may prefer each option and what should be verified before acting.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <article key={title}>
                <Icon size={22} aria-hidden="true" />
                <div>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="container author-links">
          <Link href="/about/editorial-standards">
            Editorial Standards <ArrowRight size={15} />
          </Link>
          <Link href="/about/research-methodology">
            Research Methodology <ArrowRight size={15} />
          </Link>
          <Link href="/about/sources-and-corrections">
            Sources and Corrections <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export type StandardsSection = {
  title: string;
  paragraphs?: string[];
  points?: string[];
};

export function StandardsPage({
  kicker,
  title,
  description,
  updated = "July 26, 2026",
  sections,
  parent = { href: "/about", label: "About" },
}: {
  kicker: string;
  title: string;
  description: string;
  updated?: string;
  sections: StandardsSection[];
  parent?: { href: string; label: string } | null;
}) {
  return (
    <main>
      <section className="page-hero policy-hero">
        <div className="container page-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            {parent && (
              <>
                <Link href={parent.href}>{parent.label}</Link>
                <span>/</span>
              </>
            )}
            <span aria-current="page">{title}</span>
          </nav>
          <span className="kicker">{kicker}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <small>Last updated: {updated}</small>
        </div>
      </section>
      <section className="policy-body">
        <div className="container policy-layout">
          <aside>
            <span>ON THIS PAGE</span>
            {sections.map((section) => (
              <a
                href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                key={section.title}
              >
                {section.title}
              </a>
            ))}
          </aside>
          <div className="policy-copy">
            {sections.map((section) => {
              const id = section.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return (
                <section id={id} key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.points && (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

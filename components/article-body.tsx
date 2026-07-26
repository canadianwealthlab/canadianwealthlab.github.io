import Link from "next/link";
import type { ReactNode } from "react";
import type { ArticleSection } from "@/lib/content/articles";

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link href={match[2]} key={`${match.index}-${match[2]}`}>
        {match[1]}
      </Link>,
    );
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="prose">
      {sections.map((section) => (
        <section
          className={`article-section ${section.title === "Quick Answer" ? "quick-answer" : ""}`}
          id={section.id}
          key={section.id}
        >
          <h2>{section.title}</h2>
          {section.blocks.map((block, index) => {
            if (block.type === "subheading") {
              return <h3 key={`${section.id}-${index}`}>{block.value}</h3>;
            }
            if (block.type === "list") {
              return (
                <ul key={`${section.id}-${index}`}>
                  {block.values.map((value) => <li key={value}>{renderInline(value)}</li>)}
                </ul>
              );
            }
            return <p key={`${section.id}-${index}`}>{renderInline(block.value)}</p>;
          })}
        </section>
      ))}
    </div>
  );
}

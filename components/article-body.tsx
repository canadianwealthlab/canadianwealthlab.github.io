import Link from "next/link";
import type { ReactNode } from "react";
import type { ArticleSection } from "@/lib/content/articles";

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[2] && match[3]) {
      parts.push(
        <Link href={match[3]} key={`${match.index}-${match[3]}`}>
          {match[2]}
        </Link>,
      );
    } else if (match[4]) {
      parts.push(<strong key={`${match.index}-strong`}>{match[4]}</strong>);
    } else if (match[5]) {
      parts.push(<code key={`${match.index}-code`}>{match[5]}</code>);
    }
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
            if (block.type === "ordered-list") {
              return (
                <ol key={`${section.id}-${index}`}>
                  {block.values.map((value) => <li key={value}>{renderInline(value)}</li>)}
                </ol>
              );
            }
            if (block.type === "callout") {
              return (
                <aside className="article-callout" key={`${section.id}-${index}`}>
                  {renderInline(block.value)}
                </aside>
              );
            }
            return <p key={`${section.id}-${index}`}>{renderInline(block.value)}</p>;
          })}
        </section>
      ))}
    </div>
  );
}

import { ArrowUpRight, MessageCircle, Users } from "lucide-react";
import type { CommunityDiscussion } from "@/lib/content/community-discussions";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function CommunityPerspectives({
  discussions,
}: {
  discussions: CommunityDiscussion[];
}) {
  if (discussions.length === 0) return null;

  return (
    <section
      className="community-perspectives"
      id="community-perspectives"
      aria-labelledby="community-perspectives-title"
    >
      <div className="community-heading">
        <span className="community-icon" aria-hidden="true">
          <Users size={20} />
        </span>
        <div>
          <span className="kicker">COMMUNITY PERSPECTIVES</span>
          <h2 id="community-perspectives-title">
            How Canadians are discussing this decision
          </h2>
        </div>
      </div>
      <p className="community-intro">
        These excerpts surface real questions and lived experience. They are
        anecdotal, may be incomplete or wrong, and are not evidence or advice.
        We link to the full thread so you can inspect the context and responses.
      </p>
      <div className="community-list">
        {discussions.map((discussion) => (
          <article className="community-card" key={discussion.url}>
            <div className="community-meta">
              <span>
                <MessageCircle size={14} aria-hidden="true" />
                {discussion.subreddit}
              </span>
              <time dateTime={discussion.date}>
                {formatDate(discussion.date)}
              </time>
            </div>
            <blockquote>{discussion.excerpt}</blockquote>
            <p>{discussion.takeaway}</p>
            <a
              href={discussion.url}
              rel="noreferrer"
              target="_blank"
              aria-label={`Read the full Reddit discussion: ${discussion.threadTitle}`}
            >
              <span>
                <small>Original discussion</small>
                <strong>{discussion.threadTitle}</strong>
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <p className="community-note">
        Excerpts are manually curated and linked, not pulled through a live
        Reddit feed. Usernames are omitted here to reduce unnecessary
        redistribution of personal identifiers.
      </p>
    </section>
  );
}

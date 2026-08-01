import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-hero">
      <div className="container page-hero-inner">
        <span className="kicker">404 / NOT FOUND</span>
        <h1>Page not found.</h1>
        <p>The address may be incorrect, or the page may have been intentionally removed.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/start-here">Start here</Link>
          <Link className="button button-secondary" href="/guides">Browse guides</Link>
          <Link className="button button-secondary" href="/">Return home</Link>
        </div>
      </div>
    </main>
  );
}

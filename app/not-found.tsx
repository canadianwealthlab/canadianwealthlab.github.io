import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-hero">
      <div className="container page-hero-inner">
        <span className="kicker">404 / NOT FOUND</span>
        <h1>This decision model is still in the lab.</h1>
        <p>The page may have moved, or the tool you’re looking for has not been published yet.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/calculators">Explore calculators</Link>
          <Link className="button button-secondary" href="/">Return home</Link>
        </div>
      </div>
    </main>
  );
}

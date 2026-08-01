import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <LogoMark />
              <span>Canadian Wealth Lab</span>
            </Link>
            <p>
              Independent calculators and guides for better Canadian money
              decisions. Information only. Not individualized financial advice.
            </p>
          </div>
          <div className="footer-column">
            <strong>Explore</strong>
            <Link href="/start-here">Start Here</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/perspective">Perspective</Link>
            <Link href="/calculators">Tools</Link>
          </div>
          <div className="footer-column">
            <strong>Standards</strong>
            <Link href="/about">About the lab</Link>
            <Link href="/about/editorial-standards">Editorial Standards</Link>
            <Link href="/about/research-methodology">Research Methodology</Link>
            <Link href="/about/sources-and-corrections">Sources and Corrections</Link>
          </div>
          <div className="footer-column">
            <strong>Information</strong>
            <Link href="/authors/canadian-wealth-lab">Editorial team</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Canadian Wealth Lab</span>
          <span>
            <Link href="/disclaimer">Information only. Not individualized advice.</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

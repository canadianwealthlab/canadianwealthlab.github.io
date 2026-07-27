import Link from "next/link";
import { AnalyticsSettingsButton } from "@/components/analytics";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <span className="brand-mark" aria-hidden="true">CWL</span>
              <span>Canadian Wealth Lab</span>
            </Link>
            <p>
              Independent calculators and guides for better Canadian money
              decisions. Information only. Not individualized financial advice.
            </p>
          </div>
          <div className="footer-column">
            <strong>Explore</strong>
            <Link href="/calculators">Calculators</Link>
            <Link href="/articles">Financial guides</Link>
            <Link href="/housing">Housing</Link>
            <Link href="/investing">Investing</Link>
            <Link href="/retirement">Retirement</Link>
          </div>
          <div className="footer-column">
            <strong>Standards</strong>
            <Link href="/about">About the lab</Link>
            <Link href="/about/editorial-policy">Editorial policy</Link>
            <Link href="/about/methodology">Methodology</Link>
            <Link href="/about/corrections-policy">Corrections</Link>
          </div>
          <div className="footer-column">
            <strong>Information</strong>
            <Link href="/authors/canadian-wealth-lab">Editorial team</Link>
            <Link href="/privacy">Privacy</Link>
            <AnalyticsSettingsButton />
            <Link href="/terms">Terms</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/contact">Contact</Link>
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

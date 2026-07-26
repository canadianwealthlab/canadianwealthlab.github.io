import Link from "next/link";

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
              decisions. Information only—not individualized financial advice.
            </p>
          </div>
          <div className="footer-column">
            <strong>Explore</strong>
            <Link href="/calculators">Calculators</Link>
            <Link href="/articles">Financial guides</Link>
            <Link href="/about">About the lab</Link>
          </div>
          <div className="footer-column">
            <strong>Popular</strong>
            <Link href="/calculators/rent-vs-buy">Rent vs buy</Link>
            <Link href="/calculators/tfsa-vs-rrsp">TFSA vs RRSP</Link>
            <Link href="/articles/pay-off-mortgage-or-invest">Mortgage or invest</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Canadian Wealth Lab</span>
          <span>Built in Canada for clearer financial decisions.</span>
        </div>
      </div>
    </footer>
  );
}

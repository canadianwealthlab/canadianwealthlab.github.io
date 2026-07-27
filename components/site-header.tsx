import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label="Canadian Wealth Lab home">
          <Image
            className="brand-mark"
            src="/logo-north-star.svg"
            alt=""
            width={44}
            height={44}
            priority
          />
          <span>Canadian Wealth Lab</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/calculators">Calculators</Link>
          <details className="topics-nav">
            <summary>Topics</summary>
            <div className="topics-menu">
              <Link href="/housing">Housing</Link>
              <Link href="/investing">Investing</Link>
              <Link href="/retirement">Retirement</Link>
              <Link href="/taxes">Taxes</Link>
              <Link href="/money-management">Money management</Link>
            </div>
          </details>
          <Link href="/articles">Guides</Link>
          <Link href="/about">About</Link>
          <Link className="nav-cta" href="/calculators">
            Start exploring <ArrowUpRight size={15} />
          </Link>
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation"><Menu size={24} /></summary>
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <Link href="/calculators">Calculators</Link>
            <Link href="/articles">Guides</Link>
            <Link href="/housing">Housing</Link>
            <Link href="/investing">Investing</Link>
            <Link href="/retirement">Retirement</Link>
            <Link href="/taxes">Taxes</Link>
            <Link href="/money-management">Money management</Link>
            <Link href="/about">About</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

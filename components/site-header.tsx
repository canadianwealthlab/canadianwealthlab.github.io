import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label="Canadian Wealth Lab home">
          <LogoMark />
          <span>Canadian Wealth Lab</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/start-here">Start Here</Link>
          <details className="topics-nav">
            <summary>Guides</summary>
            <div className="topics-menu">
              <Link href="/guides">All Guides</Link>
              <Link href="/money-management">Money Management</Link>
              <Link href="/taxes">Tax Strategy</Link>
              <Link href="/investing">Investing</Link>
              <Link href="/housing">Housing</Link>
              <Link href="/retirement">Retirement &amp; Financial Independence</Link>
            </div>
          </details>
          <Link href="/perspective">Perspective</Link>
          <Link href="/about">About</Link>
          <details className="topics-nav tools-nav">
            <summary>Tools</summary>
            <div className="topics-menu">
              <Link href="/calculators">Calculators</Link>
              <Link href="/guided">Guided paths</Link>
            </div>
          </details>
          <Link className="nav-cta" href="/start-here">Find a starting point <ArrowUpRight size={15} /></Link>
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation"><Menu size={24} /></summary>
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <Link href="/start-here">Start Here</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/perspective">Perspective</Link>
            <Link href="/about">About</Link>
            <Link href="/housing">Housing</Link>
            <Link href="/investing">Investing</Link>
            <Link href="/retirement">Retirement &amp; Financial Independence</Link>
            <Link href="/taxes">Tax Strategy</Link>
            <Link href="/money-management">Money Management</Link>
            <Link href="/calculators">Calculators</Link>
            <Link href="/guided">Guided paths</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

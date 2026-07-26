# Canadian Wealth Lab

An SEO-first Canadian personal finance platform with transparent calculators,
balanced educational guides, and a static-first architecture.

## Included

- Next.js App Router with TypeScript and Tailwind CSS
- Static export for GitHub Pages
- MDX article source with reusable article templates
- Mortgage prepayment, rent-vs-buy, TFSA-vs-RRSP, and FIRE calculators
- Article, FAQ, and breadcrumb structured data
- Canonical, Open Graph, Twitter, robots, and sitemap metadata
- Optional GA4 integration through environment variables

## Development

Requires Node.js 22.13 or later.

```bash
npm ci
npm run dev
npm run build
npm test
```

The static site is written to `dist/client`.

## Environment

Copy `.env.example` to `.env.local` when needed:

- `NEXT_PUBLIC_SITE_URL`: production origin used in canonical and social metadata
- `NEXT_PUBLIC_BASE_PATH`: optional GitHub project-pages base path
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional GA4 measurement ID
- `NEXT_PUBLIC_AFFILIATE_CAMPAIGN_ID`: reserved for future affiliate attribution

## Deployment

The included GitHub Actions workflow publishes `dist/client` to GitHub Pages
on pushes to `main`. Set the repository variable `PUBLIC_SITE_URL` to the final
public origin. The same build can also be hosted through Sites.

Content is educational and does not constitute personalized financial, tax,
legal, or investment advice.

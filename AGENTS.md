# Canadian Wealth Lab repository guide

## Architecture

- `app/`: Next.js App Router pages, layouts, metadata, and global styles.
- `components/`: shared UI, calculators, guided experiences, and analytics.
- `lib/`: content indexes, calculator data, guided logic, and SEO helpers.
- `content/articles/`: article source in MDX.
- `public/`: static assets, robots, sitemap, and Search Console verification.
- `tests/`: Node unit tests and rendered-route tests.
- `worker/`: Cloudflare-compatible worker entrypoint used by Vinext.
- `build/`: Sites packaging plugin. Edit only for hosting integration changes.
- `.github/workflows/deploy.yml`: GitHub Pages build and deployment.
- `.openai/hosting.json`: Sites project metadata. Do not replace its project ID.

The application uses Next.js APIs with Vinext, Vite, React, TypeScript,
Tailwind CSS, and the Cloudflare Vite plugin. npm and `package-lock.json` are
the package-management source of truth.

## Commands

- Install: `npm ci`
- Develop: `npm run dev`
- Quick validation: `npm run validate:quick`
- Unit tests only: `npm run test:unit`
- Production build: `npm run build`
- Rendered tests against the current build: `npm run test:rendered`
- Full tests with a fresh production build: `npm test`
- Full pre-deployment validation: `npm run validate:full`

## Validation policy

- Use quick validation for isolated changes to calculation or guided-decision
  logic that cannot affect rendering, routes, content, metadata, or builds.
- Use full validation for pages, components, styles, content, SEO, analytics,
  routing, dependencies, configuration, and deployment-related changes.
- Run full validation before every deployment.
- `npm test` already runs a production build. Do not run `npm run build`
  immediately before it unless a separate build result is specifically needed.
- `test:rendered` assumes `dist` was built from the current source state.

## Generated and temporary files

Do not inspect or edit these during normal tasks:

- `node_modules/`
- `dist/`
- `.next/`
- `.vinext/`
- `.wrangler/`
- `work/`
- `outputs/`
- `.eslintcache`

`dist/client` is the GitHub Pages artifact. `dist/server` and
`dist/.openai/hosting.json` are used for Sites packaging. Always change source
files and rebuild instead of editing generated output.

## Repository conventions

- Preserve production behavior unless the task explicitly requests a change.
- Preserve static HTML rendering, canonical URLs, transitions, and calculator
  behavior when changing infrastructure or configuration.
- Never use em dash punctuation in site source or generated output.
- Keep analytics production-only and do not send financial inputs, guided
  responses, query parameters, email addresses, filenames, or user IDs.
- Use `rg` and targeted file reads. Start with the files named by the task and
  avoid broad scans of generated directories.
- Preserve user changes in a dirty working tree and avoid destructive Git
  commands.

## Deployment

Pushing `main` to the GitHub remote triggers GitHub Actions, which runs
`npm ci`, builds the site, uploads `dist/client`, and deploys GitHub Pages.
Sites deployment uses the same validated commit, the repository packaging
helper, a saved Sites version, and the existing private deployment target.

## Permanent page removal

When Canadian Wealth Lab intentionally retires a page, delete or unpublish it
and remove every navigation, index, related-content, feed, structured-data, and
sitemap reference. The former URL must return a genuine HTTP 404 response. Do
not redirect it, add a canonical to another page, return a soft 404 with HTTP
200, preserve a placeholder, or automatically generate a replacement route. A
redirect may be added only when the owner explicitly requests one for that
specific URL. Verify representative retired URLs directly after route or
content removals.

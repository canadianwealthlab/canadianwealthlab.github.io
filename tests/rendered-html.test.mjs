import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  calculatorDraftOnBlur,
  calculatorNumberFromDraft,
} from "../lib/calculator-input.mjs";

const root = new URL("../dist/server/index.js", import.meta.url);
const projectRoot = new URL("../", import.meta.url);

async function textFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await textFiles(path)));
    } else if (
      [".css", ".html", ".mdx", ".svg", ".ts", ".tsx", ".txt", ".xml"].includes(
        extname(entry.name),
      )
    ) {
      files.push(path);
    }
  }

  return files;
}

async function render(pathname = "/") {
  const workerUrl = new URL(root);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Canadian Wealth Lab homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Evidence-based Canadian personal finance guidance \| Canadian Wealth Lab<\/title>/i);
  assert.match(html, /Better evidence for better financial decisions/);
  assert.match(html, /Choose the decision in front of you/);
  assert.match(html, /The CWL Financial Order of Operations/);
  assert.match(html, /Five connected parts of one financial life/);
  assert.match(html, /Test the assumptions with your own numbers/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  assert.doesNotMatch(html, /THE LAB NOTE|Join the list|newsletter-email/);
  assert.match(
    html,
    /<script[^>]+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-PDECYVLZLB"/,
  );
  assert.doesNotMatch(html, /gtag\('consent'|analytics_storage/);
  assert.match(html, /gtag\('config', 'G-PDECYVLZLB'/);
  assert.match(
    html,
    /page_location: window\.location\.origin \+ window\.location\.pathname/,
  );
  assert.match(html, /send_page_view: false/);
  assert.doesNotMatch(html, /Analytics settings|Allow analytics|>Decline</);
  assert.equal(
    html.match(
      /<script[^>]+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-PDECYVLZLB"[^>]*>/g,
    )?.length,
    1,
  );
});

test("does not expose a contact route or public outreach links", async () => {
  const [contactResponse, homeResponse, correctionsResponse, sitemap] =
    await Promise.all([
      render("/contact/"),
      render("/"),
      render("/about/sources-and-corrections/"),
      readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    ]);

  assert.equal(contactResponse.status, 404);

  const publicHtml = `${await homeResponse.text()}${await correctionsResponse.text()}`;
  assert.doesNotMatch(
    publicHtml,
    /href="\/contact|github\.com\/canadianwealthlab|Contact the editorial team|How to report an issue/i,
  );
  assert.doesNotMatch(sitemap, /\/contact\//i);
});

test("renders article and calculator routes", async () => {
  const [articleResponse, calculatorResponse] = await Promise.all([
    render("/taxes/tfsa-rrsp-fhsa/"),
    render("/calculators/mortgage-prepayment/"),
  ]);
  assert.equal(articleResponse.status, 200);
  assert.equal(calculatorResponse.status, 200);
  const articleHtml = await articleResponse.text();
  assert.match(articleHtml, /TFSA vs RRSP vs FHSA/);
  assert.match(articleHtml, /Decision Guide/);
  assert.match(articleHtml, /Who this is for/);
  assert.match(articleHtml, /Primary sources/);
  assert.match(articleHtml, /Reviewed against primary Canadian sources/);
  assert.match(articleHtml, /COMMUNITY PERSPECTIVES/);
  assert.match(articleHtml, /anecdotal, may be incomplete or wrong/);
  assert.match(
    articleHtml,
    /reddit\.com\/r\/PersonalFinanceCanada\/comments\/1sqe6dx/,
  );
  assert.match(await calculatorResponse.text(), /Estimated interest saved/);
});

test("renders the guided experience and preserves the original discovery paths", async () => {
  const [guidedResponse, homeResponse] = await Promise.all([
    render("/guided/"),
    render("/"),
  ]);
  assert.equal(guidedResponse.status, 200);
  const guidedHtml = await guidedResponse.text();
  assert.match(guidedHtml, /A clearer path through your next money decision/);
  assert.match(guidedHtml, /What should my next dollar do/);
  assert.match(guidedHtml, /How should I allocate between TFSA, RRSP, and FHSA/);
  assert.match(guidedHtml, /Tab-local only/);
  assert.match(guidedHtml, /href="\/guided\/next-dollar"/);
  assert.match(guidedHtml, /href="\/guided\/registered-accounts"/);
  assert.match(guidedHtml, /href="\/guided\/home-readiness"/);
  assert.match(guidedHtml, /href="\/guided\/retirement-readiness"/);
  assert.match(guidedHtml, /href="\/guided\/mortgage-vs-invest"/);
  assert.match(guidedHtml, /href="\/guided\/debt-plan"/);
  assert.doesNotMatch(guidedHtml, /guided-experience-[A-Za-z0-9_-]+\.js/);
  assert.match(guidedHtml, /googletagmanager\.com\/gtag\/js\?id=G-PDECYVLZLB/);

  const homeHtml = await homeResponse.text();
  assert.match(homeHtml, /START WITH YOUR SITUATION/);
  assert.match(homeHtml, /Start Here/);
  assert.match(homeHtml, /Browse Guides/);
});

test("renders every guided framework as crawlable HTML without interaction", async () => {
  const paths = [
    [
      "/guided/next-dollar/",
      [
        "What is the highest interest rate on debt you want to address?",
        "Buffer, then high-cost debt",
        "Official Canadian guidance",
        "Emergency Fund Guide for Canadians",
      ],
    ],
    [
      "/guided/retirement-readiness/",
      [
        "What does the household spend in a typical month today?",
        "A planning gap to work on|Near the middle range|Cushion in the middle scenario",
        "CPP retirement pension",
        "Retirement and FIRE Calculator",
      ],
    ],
    [
      "/guided/mortgage-vs-invest/",
      [
        "How much money are you deciding about?",
        "A split deserves consideration",
        "Paying off your mortgage faster",
        "Mortgage Prepayment Calculator",
      ],
    ],
    [
      "/guided/registered-accounts/",
      [
        "What is this money mainly for?",
        "Verify FHSA eligibility and room first",
        "Tax-Free Savings Account",
        "TFSA vs RRSP Calculator",
      ],
    ],
    [
      "/guided/home-readiness/",
      [
        "What purchase price are you testing?",
        "Build the plan before relying on a target price",
        "How much you need for a down payment",
        "Rent vs Buy Calculator",
      ],
    ],
    [
      "/guided/debt-plan/",
      [
        "Can you currently cover essential costs and all required debt payments?",
        "A structured payoff plan is workable",
        "What is a Licensed Insolvency Trustee?",
        "Pay Down Debt or Invest?",
      ],
    ],
  ];

  for (const [pathname, expectedContent] of paths) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    for (const content of expectedContent) {
      assert.match(html, new RegExp(content));
    }
    assert.match(html, /This HTML page exposes the complete educational framework/);
    assert.doesNotMatch(html, /guided-experience-[A-Za-z0-9_-]+\.js/);
  }
});

test("renders representative publication-ready guides with sources and FAQs", async () => {
  const guides = [
    ["/housing/how-much-house-can-i-afford/", /How Much House Can I Afford in Canada/],
    ["/housing/down-payment-canada/", /Down Payment Requirements in Canada/],
    ["/housing/choosing-managing-mortgage/", /Choosing and Managing a Canadian Mortgage/],
    ["/taxes/tfsa-guide/", /TFSA Guide/],
    ["/taxes/rrsp-guide/", /RRSP Guide/],
    ["/taxes/how-canadian-income-tax-works/", /How Canadian Income Tax Works/],
    ["/investing/building-investment-plan/", /Building a Diversified Investment Plan/],
    ["/retirement/cpp-guide/", /Understanding CPP and When to Start/],
    ["/retirement/retirement-spending-withdrawal-rates/", /Retirement Spending and Withdrawal Rates/],
    ["/money-management/emergency-fund-canada/", /Emergency Fund Guide for Canadians/],
  ];

  for (const [pathname, heading] of guides) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, /Primary sources/);
    assert.match(html, /FAQ/);
    assert.match(html, /Reviewed against primary Canadian sources/);
  }
});

test("renders the debt-versus-invest guide with the reusable consumer article standard", async () => {
  const response = await render("/money-management/debt-or-invest/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Quick Answer/);
  assert.match(html, /Key takeaway/);
  assert.match(html, /article-table/);
  assert.match(html, /Paying down debt/);
  assert.match(html, /Credit card at 20%/);
  assert.match(html, /Line of credit at 8%/);
  assert.match(html, /Fixed loan at 3%/);
  assert.match(html, /\$1,800/);
  assert.match(html, /A Simple Decision Framework/);
  assert.doesNotMatch(html, />The Case for Debt Repayment</);
  assert.doesNotMatch(html, />The Case for Investing</);
  assert.match(html, /rel="canonical" href="https:\/\/canadianwealthlab\.github\.io\/money-management\/debt-or-invest"/);
});

test("renders cluster and credibility routes", async () => {
  const [clusterResponse, policyResponse, authorResponse, startResponse, perspectiveResponse] = await Promise.all([
    render("/housing/"),
    render("/about/editorial-standards/"),
    render("/authors/canadian-wealth-lab/"),
    render("/start-here/cwl-financial-roadmap/"),
    render("/perspective/how-cwl-approaches-financial-decisions/"),
  ]);
  assert.equal(clusterResponse.status, 200);
  assert.equal(policyResponse.status, 200);
  assert.equal(authorResponse.status, 200);
  assert.equal(startResponse.status, 200);
  assert.equal(perspectiveResponse.status, 200);
  assert.match(await clusterResponse.text(), /Housing guides/);
  assert.match(await policyResponse.text(), /Evidence before confidence/);
  assert.match(await authorResponse.text(), /does not claim a professional designation/);
  assert.match(await startResponse.text(), /The CWL Financial Roadmap/);
  assert.match(await perspectiveResponse.text(), /CWL Perspective/);
});

test("returns genuine 404 responses for retired and excluded routes", async () => {
  const retiredPaths = [
    "/income-career/",
    "/income-career/salary-negotiation/",
    "/protecting-wealth/",
    "/protecting-wealth/life-insurance/",
    "/articles/",
    "/articles/tfsa-vs-rrsp/",
    "/investing/veqt-vs-xeqt/",
    "/investing/how-to-start-investing-canada/",
    "/taxes/tfsa-vs-rrsp/",
    "/about/editorial-policy/",
  ];

  for (const pathname of retiredPaths) {
    const response = await render(pathname);
    assert.equal(response.status, 404, pathname);
    const html = await response.text();
    assert.doesNotMatch(html, /http-equiv=["']refresh/i);
    assert.doesNotMatch(html, /rel=["']canonical/i);
    assert.equal(response.headers.has("location"), false, pathname);
  }
});

test("keeps retired and excluded routes out of the sitemap", async () => {
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const retiredFragments = [
    "/income-career/",
    "/protecting-wealth/",
    "/articles/",
    "/investing/veqt-vs-xeqt/",
    "/investing/how-to-start-investing-canada/",
    "/taxes/tfsa-vs-rrsp/",
    "/about/editorial-policy/",
  ];

  for (const fragment of retiredFragments) {
    assert.equal(sitemap.includes(fragment), false, fragment);
  }

  assert.match(sitemap, /\/start-here\/cwl-financial-roadmap\//);
  assert.match(sitemap, /\/taxes\/tfsa-rrsp-fhsa\//);
  assert.match(sitemap, /\/perspective\/how-cwl-approaches-financial-decisions\//);
});

test("renders every sitemap route and keeps internal links in the published route set", async () => {
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, location]) => new URL(location).pathname,
  );
  const publishedPaths = new Set(sitemapPaths);

  for (const pathname of sitemapPaths) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const internalLinks = [...html.matchAll(/href=["'](\/[^"'#?]*)/g)]
      .map(([, href]) => href)
      .filter((href) => !href.startsWith("/assets/"))
      .map((href) => href === "/" ? "/" : `${href.replace(/\/$/, "")}/`);

    for (const href of internalLinks) {
      assert.equal(publishedPaths.has(href), true, `${pathname} links to unpublished ${href}`);
    }
  }
});

test("does not use em dash punctuation in site source", async () => {
  const forbiddenPunctuation = String.fromCodePoint(0x2014);
  const sourceRoots = ["app", "components", "content", "lib", "public"];

  for (const sourceRoot of sourceRoots) {
    const directory = fileURLToPath(new URL(`${sourceRoot}/`, projectRoot));
    for (const file of await textFiles(directory)) {
      const source = await readFile(file, "utf8");
      assert.equal(
        source.includes(forbiddenPunctuation),
        false,
        `${file} contains forbidden punctuation`,
      );
    }
  }
});

test("replaces the calculator zero fallback with the next typed value", () => {
  assert.equal(calculatorNumberFromDraft(""), 0);
  assert.equal(calculatorDraftOnBlur(""), "0");
  assert.equal(calculatorNumberFromDraft("5"), 5);
  assert.equal(calculatorDraftOnBlur("5"), "5");
});

test("documents private guided processing and limited analytics", async () => {
  const response = await render("/privacy/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /kept in session storage for the current tab/);
  assert.match(html, /cleared when the tab closes/);
  assert.match(html, /never includes response values/);
});

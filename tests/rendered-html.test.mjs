import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

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
  assert.match(html, /<title>Canadian personal finance calculators and guides \| Canadian Wealth Lab<\/title>/i);
  assert.match(html, /Make smarter money decisions in Canada/);
  assert.match(html, /Explore calculators/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  assert.doesNotMatch(html, /googletagmanager|G-PDECYVLZLB/);
});

test("renders article and calculator routes", async () => {
  const [articleResponse, calculatorResponse] = await Promise.all([
    render("/investing/tfsa-vs-rrsp/"),
    render("/calculators/mortgage-prepayment/"),
  ]);
  assert.equal(articleResponse.status, 200);
  assert.equal(calculatorResponse.status, 200);
  const articleHtml = await articleResponse.text();
  assert.match(articleHtml, /TFSA vs RRSP: Which One Should I Use/);
  assert.match(articleHtml, /COMMUNITY PERSPECTIVES/);
  assert.match(articleHtml, /anecdotal, may be incomplete or wrong/);
  assert.match(
    articleHtml,
    /reddit\.com\/r\/PersonalFinanceCanada\/comments\/1sqe6dx/,
  );
  assert.match(await calculatorResponse.text(), /Estimated interest saved/);
});

test("renders the first ten supporting guides with sources and FAQs", async () => {
  const guides = [
    ["/housing/how-much-house-can-i-afford/", /How Much House Can I Afford in Canada/],
    ["/housing/down-payment-canada/", /Down Payment Requirements in Canada/],
    ["/investing/tfsa-guide/", /TFSA Guide/],
    ["/investing/rrsp-guide/", /RRSP Guide/],
    ["/investing/how-to-start-investing-canada/", /How to Start Investing in Canada/],
    ["/retirement/retirement-planning-canada/", /Retirement Planning in Canada/],
    ["/retirement/cpp-guide/", /CPP Guide/],
    ["/retirement/when-to-take-cpp/", /When Should You Take CPP/],
    ["/taxes/income-tax-brackets-canada/", /Canadian Income Tax Brackets for 2026/],
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

test("renders cluster and credibility routes", async () => {
  const [clusterResponse, policyResponse, authorResponse] = await Promise.all([
    render("/housing/"),
    render("/about/editorial-policy/"),
    render("/authors/canadian-wealth-lab/"),
  ]);
  assert.equal(clusterResponse.status, 200);
  assert.equal(policyResponse.status, 200);
  assert.equal(authorResponse.status, 200);
  assert.match(await clusterResponse.text(), /Housing guides/);
  assert.match(await policyResponse.text(), /Editorial policy/);
  assert.match(await authorResponse.text(), /does not claim a professional designation/);
});

test("keeps legacy article URLs discoverable but non-canonical", async () => {
  const response = await render("/articles/tfsa-vs-rrsp/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /GUIDE MOVED/);
  assert.match(html, /investing\/tfsa-vs-rrsp/);
  assert.match(html, /noindex/i);
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

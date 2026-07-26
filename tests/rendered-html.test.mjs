import assert from "node:assert/strict";
import test from "node:test";

const root = new URL("../dist/server/index.js", import.meta.url);

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

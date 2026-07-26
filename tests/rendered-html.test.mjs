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
    render("/articles/tfsa-vs-rrsp/"),
    render("/calculators/mortgage-prepayment/"),
  ]);
  assert.equal(articleResponse.status, 200);
  assert.equal(calculatorResponse.status, 200);
  assert.match(await articleResponse.text(), /TFSA vs RRSP: Which One Should I Use/);
  assert.match(await calculatorResponse.text(), /Estimated interest saved/);
});

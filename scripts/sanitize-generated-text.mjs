import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";

const outputDirectory = new URL("../dist/", import.meta.url);
const forbiddenPunctuation = String.fromCodePoint(0x2014);
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".svg",
  ".txt",
  ".xml",
]);

async function sanitize(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  let changedFiles = 0;

  for (const entry of entries) {
    const path = new URL(entry.name, directory);

    if (entry.isDirectory()) {
      changedFiles += await sanitize(new URL(`${entry.name}/`, directory));
      continue;
    }

    if (!textExtensions.has(extname(entry.name))) continue;

    const source = await readFile(path, "utf8");
    if (!source.includes(forbiddenPunctuation)) continue;

    await writeFile(path, source.replaceAll(forbiddenPunctuation, "-"), "utf8");
    changedFiles += 1;
  }

  return changedFiles;
}

const changedFiles = await sanitize(outputDirectory);
console.log(`Sanitized punctuation in ${changedFiles} generated text files.`);

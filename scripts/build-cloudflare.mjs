import { cp, mkdir, rm } from "node:fs/promises";
import { basename, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDirectory = resolve(projectRoot, ".cloudflare-stage");

if (basename(outputDirectory) !== ".cloudflare-stage") {
  throw new Error(`Refusing to clean unexpected output directory: ${outputDirectory}`);
}

const files = [
  "index.html",
  "favicon.ico",
  "theme.css",
  "polish.css",
  "mainscript.js",
  "cn_text.js",
  "cn_enneagram.js",
  "cn.json",
  "jq.js",
  "jquerytest.js",
  "vuescript.js",
  "vuei18n.js",
  "robots.txt",
  "sitemap.xml",
];

const directories = ["img", "sound"];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of files) {
  await cp(resolve(projectRoot, file), resolve(outputDirectory, file));
}

for (const directory of directories) {
  await cp(resolve(projectRoot, directory), resolve(outputDirectory, directory), {
    recursive: true,
  });
}

console.log(`Cloudflare assets prepared in ${outputDirectory}`);

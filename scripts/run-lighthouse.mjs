import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import process from "node:process";

const port = Number(process.env.LIGHTHOUSE_PORT || 3218);
const origin = `http://127.0.0.1:${port}`;
const outputDirectory = path.join(process.cwd(), ".codex-qa");
const outputPaths = {
  mobile: path.join(outputDirectory, "lighthouse-mobile.json"),
  desktop: path.join(outputDirectory, "lighthouse-desktop.json"),
};
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
mkdirSync(outputDirectory, { recursive: true });

const server = spawn(process.execPath, [nextBin, "start", "-H", "127.0.0.1", "-p", String(port)], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"],
});
const serverLogs = [];
server.stdout.on("data", (chunk) => serverLogs.push(chunk.toString()));
server.stderr.on("data", (chunk) => serverLogs.push(chunk.toString()));

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Server exited early.\n${serverLogs.join("")}`);
    try {
      if ((await fetch(origin)).ok) return;
    } catch {
      // Still starting.
    }
    await delay(500);
  }
  throw new Error(`Server did not become ready.\n${serverLogs.join("")}`);
}

function runLighthouse(formFactor) {
  const outputPath = outputPaths[formFactor];
  const startedAt = Date.now();
  const npmCliDirectory = process.env.npm_execpath ? path.dirname(process.env.npm_execpath) : "";
  const adjacentNpxCli = path.join(path.dirname(process.execPath), "node_modules", "npm", "bin", "npx-cli.js");
  const npxCli = [path.join(npmCliDirectory, "npx-cli.js"), adjacentNpxCli].find(existsSync);
  const command = npxCli ? process.execPath : (process.platform === "win32" ? "npx.cmd" : "npx");
  const args = [
    ...(npxCli ? [npxCli] : []),
    "lighthouse@12.8.2",
    origin,
    ...(formFactor === "desktop" ? ["--preset=desktop"] : []),
    "--output=json",
    `--output-path=${outputPath}`,
    "--chrome-flags=--headless --no-sandbox",
    "--only-categories=performance,accessibility,best-practices,seo",
    "--quiet",
  ];
  return new Promise((resolve, reject) => {
    const auditLogs = [];
    const audit = spawn(command, args, {
      cwd: process.cwd(),
      shell: !npxCli && process.platform === "win32",
      stdio: ["ignore", "pipe", "pipe"],
    });
    audit.stdout.on("data", (chunk) => auditLogs.push(chunk.toString()));
    audit.stderr.on("data", (chunk) => auditLogs.push(chunk.toString()));
    audit.once("error", reject);
    audit.once("exit", (code) => {
      if (code === 0) return resolve();
      try {
        const report = JSON.parse(readFileSync(outputPath, "utf8"));
        const isFresh = existsSync(outputPath) && statSync(outputPath).mtimeMs >= startedAt - 1_000;
        const isComplete = report?.categories?.performance && report?.categories?.accessibility && report?.categories?.seo;
        if (isFresh && isComplete) {
          console.warn("Lighthouse wrote a complete report but Chrome cleanup returned a non-zero exit code.");
          return resolve();
        }
      } catch {
        // Fall through to the real audit failure below.
      }
      console.error(auditLogs.join(""));
      reject(new Error(`Lighthouse exited with code ${code}`));
    });
  });
}

function summarize(formFactor) {
  const report = JSON.parse(readFileSync(outputPaths[formFactor], "utf8"));
  const score = (category) => Math.round((report.categories[category]?.score ?? 0) * 100);
  const metric = (id) => report.audits[id]?.displayValue ?? "n/a";
  console.log(`${formFactor}: performance ${score("performance")}, accessibility ${score("accessibility")}, best-practices ${score("best-practices")}, SEO ${score("seo")}, LCP ${metric("largest-contentful-paint")}, CLS ${metric("cumulative-layout-shift")}`);
}

try {
  await waitForServer();
  await runLighthouse("mobile");
  await runLighthouse("desktop");
  summarize("mobile");
  summarize("desktop");
  console.log(`Lighthouse reports written to ${outputDirectory}`);
} finally {
  server.kill();
}

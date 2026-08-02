import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import process from "node:process";

const port = Number(process.env.CAPTURE_PORT || 3219);
const origin = `http://127.0.0.1:${port}`;
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const chrome = process.env.CHROME_PATH || (process.platform === "win32"
  ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  : "google-chrome");
const outputDirectory = path.join(process.cwd(), ".codex-qa");
mkdirSync(outputDirectory, { recursive: true });

const server = spawn(process.execPath, [nextBin, "start", "-H", "127.0.0.1", "-p", String(port)], {
  cwd: process.cwd(),
  stdio: "ignore",
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) throw new Error("Production server exited before capture.");
    try {
      if ((await fetch(origin)).ok) return;
    } catch {
      // Still starting.
    }
    await delay(500);
  }
  throw new Error("Production server did not become ready for capture.");
}

function capture({ name, pathname, width, height }) {
  const output = path.join(outputDirectory, name);
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--run-all-compositor-stages-before-draw",
    `--window-size=${width},${height}`,
    `--screenshot=${output}`,
    `${origin}${pathname}`,
  ];
  return new Promise((resolve, reject) => {
    const browser = spawn(chrome, args, { stdio: "ignore" });
    browser.once("error", reject);
    browser.once("exit", (code) => code === 0 ? resolve(output) : reject(new Error(`Chrome capture exited with ${code}`)));
  });
}

try {
  await waitForServer();
  const outputs = [];
  outputs.push(await capture({ name: "home-mobile.png", pathname: "/", width: 412, height: 1100 }));
  outputs.push(await capture({ name: "download-desktop.png", pathname: "/download", width: 1440, height: 1100 }));
  outputs.push(await capture({ name: "privacy-mobile.png", pathname: "/privacy", width: 412, height: 1100 }));
  console.log(outputs.join("\n"));
} finally {
  server.kill();
}

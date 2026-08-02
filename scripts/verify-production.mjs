import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import process from "node:process";

const port = Number(process.env.TEST_PORT || 3217);
const origin = `http://127.0.0.1:${port}`;
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const logs = [];

const server = spawn(process.execPath, [nextBin, "start", "-H", "127.0.0.1", "-p", String(port)], {
  cwd: process.cwd(),
  env: { ...process.env, NEXT_PUBLIC_SITE_URL: origin },
  stdio: ["ignore", "pipe", "pipe"],
});

server.stdout.on("data", (chunk) => logs.push(chunk.toString()));
server.stderr.on("data", (chunk) => logs.push(chunk.toString()));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchPage(pathname, options) {
  return fetch(`${origin}${pathname}`, { redirect: "manual", ...options });
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Production server exited early.\n${logs.join("")}`);
    try {
      const response = await fetchPage("/");
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await delay(500);
  }
  throw new Error(`Production server did not become ready.\n${logs.join("")}`);
}

async function checkPage(pathname, requiredTexts = []) {
  const response = await fetchPage(pathname);
  assert(response.status === 200, `${pathname} returned ${response.status}`);
  const html = await response.text();
  const searchableText = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
  for (const text of requiredTexts) {
    assert(searchableText.includes(text), `${pathname} is missing expected text: ${text}`);
  }
  assert(!/TODO:\s|مالک سایت باید|باید بعداً اضافه شوند|جزئیات .* هنوز باید تکمیل/.test(html), `${pathname} exposes unfinished copy`);
  assert(/<link rel="canonical"/.test(html), `${pathname} is missing a canonical link`);
  return html;
}

function localPathsFrom(html) {
  const paths = new Set();
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const url = new URL(href, origin);
    paths.add(`${url.pathname}${url.search}`);
  }
  return paths;
}

async function main() {
  await waitForServer();

  const pages = new Map();
  pages.set("/", await checkPage("/", ["با مواد داخل یخچالت، برنامه غذای هفته را بساز", "گروه یخچال"]));
  pages.set("/download", await checkPage("/download", ["دانلود اپلیکیشن یخچال برای اندروید", "مایکت", "کافه‌بازار", "۱.۴.۱"]));
  pages.set("/privacy", await checkPage("/privacy", ["حریم خصوصی", "نحوه ذخیره‌سازی داده‌ها", "روش حذف حساب و داده‌ها"]));
  pages.set("/terms", await checkPage("/terms", ["شرایط استفاده", "جایگزین تشخیص، درمان یا توصیه پزشک و متخصص تغذیه نیستند"]));
  pages.set("/about", await checkPage("/about", ["درباره یخچال", "مأموریت یخچال"]));
  pages.set("/features/meal-planner", await checkPage("/features/meal-planner", ["برنامه‌ریز هفتگی غذا", "مراحل استفاده", "کاربردهای عملی"]));
  pages.set("/calories", await checkPage("/calories", ["همه اقلام مجموعه فعلی", "تاریخ بازبینی منبع ندارند"]));
  pages.set("/articles/healthy-eating-fundamentals", await checkPage("/articles/healthy-eating-fundamentals", ["منابع و تاریخ بررسی", "سازمان جهانی بهداشت"]));

  const home = pages.get("/");
  assert(home.includes('"@type":"MobileApplication"'), "Home is missing MobileApplication JSON-LD");
  assert(!home.includes('"@type":"Offer"'), "Home exposes an unverified Offer in JSON-LD");
  assert(home.includes('data-analytics-event="click_hero_primary_cta"'), "Hero CTA tracking hook is missing");
  const optimizedImagePath = home.match(/src="([^\"]*\/_next\/image\?[^\"]+)"/)?.[1]?.replaceAll("&amp;", "&");
  assert(optimizedImagePath, "Home is missing a Next.js optimized image");
  const optimizedImage = await fetchPage(optimizedImagePath);
  assert(optimizedImage.ok && optimizedImage.headers.get("content-type")?.startsWith("image/"), "Next.js image optimization failed");

  const oldFeature = await fetchPage("/features/weekly-meal-planner");
  assert([307, 308].includes(oldFeature.status), `Legacy feature route returned ${oldFeature.status}`);
  assert(oldFeature.headers.get("location")?.endsWith("/features/meal-planner"), "Legacy feature redirect target is incorrect");

  const missing = await fetchPage("/definitely-missing-yakhchal-page");
  assert(missing.status === 404, `Missing route returned ${missing.status}`);

  const sitemap = await (await fetchPage("/sitemap.xml")).text();
  assert(sitemap.includes("/features/meal-planner"), "Sitemap is missing the canonical meal planner route");
  assert(!sitemap.includes("/features/weekly-meal-planner"), "Sitemap still contains the redirected meal planner route");

  const internalPaths = new Set();
  for (const html of pages.values()) {
    for (const pathname of localPathsFrom(html)) internalPaths.add(pathname);
  }
  for (const pathname of internalPaths) {
    const response = await fetchPage(pathname);
    assert(response.status < 400, `Internal link ${pathname} returned ${response.status}`);
  }

  console.log(`Production verification passed: ${pages.size} core pages and ${internalPaths.size} internal links.`);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  console.error(logs.join(""));
  process.exitCode = 1;
} finally {
  server.kill();
}

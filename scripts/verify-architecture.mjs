import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const allowedClientIslands = new Set([
  "src/components/Navbar.tsx",
  "src/components/LazyBMICalculator.tsx",
  "src/components/BMICalculator.tsx",
  "src/components/CalorieCalculator.tsx",
  "src/components/calorie/CalorieCharts.tsx",
  "src/components/smart-fridge-story/SmartFridgeStoryClient.tsx",
]);

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry);
    const info = await stat(absolute);
    if (info.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

const sourceFiles = (await walk(sourceRoot)).filter((file) => /\.(?:ts|tsx|css)$/.test(file));
const errors = [];

for (const absolute of sourceFiles) {
  const relative = path.relative(root, absolute).replaceAll(path.sep, "/");
  const content = await readFile(absolute, "utf8");

  if (/\b(?:@mui|@emotion|stylis-plugin-rtl)\b/.test(content)) {
    errors.push(`${relative}: heavy UI runtime dependency detected`);
  }
  if (absolute.endsWith(".tsx") && /<img\b/.test(content)) {
    errors.push(`${relative}: raw <img> found; use next/image`);
  }
  if (/^["']use client["'];?/m.test(content) && !allowedClientIslands.has(relative)) {
    errors.push(`${relative}: unexpected client boundary`);
  }
}

const homePage = await readFile(path.join(sourceRoot, "app/page.tsx"), "utf8");
const faqComponent = await readFile(path.join(sourceRoot, "components/FaqSection.tsx"), "utf8");
if (!homePage.includes('from "@/data/faqs"')) errors.push("src/app/page.tsx: FAQ schema must import server-safe data");
if (/^["']use client["'];?/m.test(faqComponent)) errors.push("src/components/FaqSection.tsx: FAQ must remain a Server Component");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Architecture verified: ${sourceFiles.length} source files, ${allowedClientIslands.size} client islands.`);

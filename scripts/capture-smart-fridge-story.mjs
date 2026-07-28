import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const [webSocketUrl, pageUrl, outputDirectory] = process.argv.slice(2);

if (!webSocketUrl || !pageUrl || !outputDirectory) {
  throw new Error(
    "Usage: node scripts/capture-smart-fridge-story.mjs <page-ws-url> <page-url> <output-dir>",
  );
}

await mkdir(outputDirectory, { recursive: true });

let sequence = 0;
const pending = new Map();
const events = [];
const socket = new WebSocket(webSocketUrl);

socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(String(data));
  if (message.id) {
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    if (message.error) request.reject(new Error(JSON.stringify(message.error)));
    else request.resolve(message.result);
    return;
  }
  events.push(message);
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

function send(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true,
  });

  if (result.exceptionDetails) {
    throw new Error(
      result.exceptionDetails.exception?.description ||
        result.exceptionDetails.text ||
        "Runtime evaluation failed",
    );
  }

  return result.result.value;
}

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function setViewport(width, height, mobile = false) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height,
    positionX: 0,
    positionY: 0,
    dontSetVisibleSize: false,
  });
  await send("Emulation.setTouchEmulationEnabled", {
    enabled: mobile,
    maxTouchPoints: mobile ? 5 : 1,
  });
}

async function waitForReady() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const ready = await evaluate(
      `document.readyState === "complete" && !!document.getElementById("workflow")`,
    );
    if (ready) break;
    await wait(100);
  }

  await evaluate(`Promise.race([
    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      ...[...document.querySelectorAll("#workflow img")].map((image) => image.decode?.().catch(() => undefined))
    ]),
    new Promise((resolve) => setTimeout(resolve, 3500))
  ]).then(() => true)`);
  await wait(450);
}

async function screenshot(fileName) {
  const result = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const filePath = path.join(outputDirectory, fileName);
  await writeFile(filePath, Buffer.from(result.data, "base64"));
  return filePath;
}

async function scrollStory(progress) {
  return evaluate(`(async () => {
    const section = document.getElementById("workflow");
    const compact = innerWidth < 900;
    const headerOffset = compact ? 74 : 88;
    const sectionTop = scrollY + section.getBoundingClientRect().top;
    const distance = Math.max(1, section.offsetHeight - innerHeight + headerOffset);
    scrollTo({ top: sectionTop - headerOffset + distance * ${progress}, behavior: "instant" });
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await new Promise((resolve) => setTimeout(resolve, 180));
    const styles = getComputedStyle(section);
    return {
      requestedProgress: ${progress},
      computedProgress: Number(styles.getPropertyValue("--story-progress")),
      activeStage: section.dataset.activeStage,
      doorAngle: styles.getPropertyValue("--door-angle").trim(),
      recipeOpacity: Number(styles.getPropertyValue("--recipe-opacity")),
      supportOpacity: Number(styles.getPropertyValue("--support-opacity")),
      finalOpacity: Number(styles.getPropertyValue("--final-opacity")),
      rectTop: Math.round(section.getBoundingClientRect().top),
      viewport: [innerWidth, innerHeight],
    };
  })()`);
}

async function inspectLayout(label) {
  return evaluate(`(() => {
    const section = document.getElementById("workflow");
    const sectionRect = section.getBoundingClientRect();
    const root = document.documentElement;
    const ingredientNodes = [...section.querySelectorAll("[data-ingredient]")];
    return {
      label: ${JSON.stringify(label)},
      viewport: { width: innerWidth, height: innerHeight },
      page: {
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        horizontalOverflow: Math.max(0, root.scrollWidth - root.clientWidth),
      },
      story: {
        height: Math.round(section.offsetHeight),
        rect: {
          top: Math.round(sectionRect.top),
          bottom: Math.round(sectionRect.bottom),
          width: Math.round(sectionRect.width),
        },
        enhanced: section.dataset.enhanced,
        reducedMotion: section.dataset.reducedMotion,
        activeStage: section.dataset.activeStage,
      },
      ingredients: ingredientNodes.map((node) => {
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        return {
          id: node.dataset.ingredientId,
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          opacity: Number(style.opacity),
        };
      }),
      images: [...section.querySelectorAll("img")].map((image) => ({
        src: image.currentSrc || image.src,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      })),
    };
  })()`);
}

await Promise.all([
  send("Page.enable"),
  send("Runtime.enable"),
  send("Log.enable"),
  send("Network.enable"),
]);

await send("Emulation.setEmulatedMedia", {
  media: "screen",
  features: [
    { name: "prefers-color-scheme", value: "light" },
    { name: "prefers-reduced-motion", value: "no-preference" },
  ],
});
await setViewport(1440, 900);
await send("Page.navigate", { url: pageUrl });
await waitForReady();
await evaluate(
  `document.documentElement.dataset.theme = "light"; document.documentElement.style.colorScheme = "light"; localStorage.setItem("yakhchal:theme", "light"); true`,
);
await evaluate(`scrollTo({ top: 0, behavior: "instant" }); true`);
await wait(180);
const homepageDesktopScreenshot = await screenshot("00-homepage-1440x900.png");

const requestedStages = [
  ["01-initial-ingredients.png", 0.08],
  ["02-ingredients-inside.png", 0.45],
  ["03-recipe-recommendation.png", 0.53],
  ["04-weekly-plan-shopping.png", 0.72],
  ["05-final-closed-door.png", 0.98],
];

const stages = [];
for (const [fileName, progress] of requestedStages) {
  const state = await scrollStory(progress);
  const filePath = await screenshot(fileName);
  stages.push({ ...state, filePath });
}

await evaluate(
  `document.documentElement.dataset.theme = "dark"; document.documentElement.style.colorScheme = "dark"; localStorage.setItem("yakhchal:theme", "dark"); true`,
);
await wait(220);
const darkRecipeState = await scrollStory(0.53);
const darkRecipeScreenshot = await screenshot("06a-recipe-dark-theme.png");
const darkFinalState = await scrollStory(0.98);
const darkFinalScreenshot = await screenshot("06-final-dark-theme.png");

await evaluate(
  `document.documentElement.dataset.theme = "light"; document.documentElement.style.colorScheme = "light"; localStorage.setItem("yakhchal:theme", "light"); true`,
);
await setViewport(390, 844, true);
await evaluate(`scrollTo({ top: 0, behavior: "instant" }); true`);
await wait(180);
const homepageMobileScreenshot = await screenshot("00a-homepage-390x844.png");

const responsiveCases = [
  { width: 360, height: 800, mobile: true, progress: 0.53, name: "07-mobile-360x800-recipe.png" },
  { width: 390, height: 844, mobile: true, progress: 0.72, name: "08-mobile-390x844-plan.png" },
  { width: 390, height: 844, mobile: true, progress: 0.98, name: "08a-mobile-390x844-final.png" },
  { width: 768, height: 1024, mobile: false, progress: 0.45, name: "09-tablet-768x1024-ingredients.png" },
  { width: 1920, height: 1080, mobile: false, progress: 0.98, name: "10-desktop-1920x1080-final.png" },
];

const responsive = [];
for (const testCase of responsiveCases) {
  await setViewport(testCase.width, testCase.height, testCase.mobile);
  await wait(180);
  const state = await scrollStory(testCase.progress);
  const layout = await inspectLayout(testCase.name);
  const filePath = await screenshot(testCase.name);
  responsive.push({ ...testCase, state, layout, filePath });
}

await setViewport(1440, 900);
await scrollStory(0.98);
const reverseState = await scrollStory(0.24);
const reverseScreenshot = await screenshot("11-reverse-scroll.png");

await send("Emulation.setEmulatedMedia", {
  media: "screen",
  features: [
    { name: "prefers-color-scheme", value: "light" },
    { name: "prefers-reduced-motion", value: "reduce" },
  ],
});
await wait(260);
await evaluate(`document.getElementById("workflow").scrollIntoView({ block: "start", behavior: "instant" }); true`);
await wait(220);
const reducedMotionLayout = await inspectLayout("reduced-motion");
const reducedMotionScreenshot = await screenshot("12-reduced-motion.png");

const diagnostics = {
  consoleMessages: events
    .filter((event) => event.method === "Runtime.consoleAPICalled")
    .map((event) => ({
      type: event.params.type,
      text: event.params.args
        .map((argument) => argument.value ?? argument.description ?? "")
        .join(" "),
      url: event.params.stackTrace?.callFrames?.[0]?.url || null,
    })),
  logEntries: events
    .filter((event) => event.method === "Log.entryAdded")
    .map((event) => event.params.entry),
  exceptions: events
    .filter((event) => event.method === "Runtime.exceptionThrown")
    .map((event) => event.params.exceptionDetails),
  failedRequests: events
    .filter((event) => event.method === "Network.loadingFailed")
    .map((event) => ({
      errorText: event.params.errorText,
      type: event.params.type,
      canceled: Boolean(event.params.canceled),
      blockedReason: event.params.blockedReason || null,
    })),
};

diagnostics.hydrationMatches =
  JSON.stringify(diagnostics).match(
    /hydration|hydrated|server rendered|did not match/gi,
  ) || [];

const report = {
  pageUrl,
  capturedAt: new Date().toISOString(),
  homepage: {
    desktopFilePath: homepageDesktopScreenshot,
    mobileFilePath: homepageMobileScreenshot,
  },
  stages,
  darkTheme: {
    recipeState: darkRecipeState,
    recipeFilePath: darkRecipeScreenshot,
    state: darkFinalState,
    filePath: darkFinalScreenshot,
  },
  responsive,
  reverseScroll: {
    state: reverseState,
    filePath: reverseScreenshot,
  },
  reducedMotion: {
    layout: reducedMotionLayout,
    filePath: reducedMotionScreenshot,
  },
  diagnostics,
};

await writeFile(
  path.join(outputDirectory, "visual-qa-report.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
socket.close();

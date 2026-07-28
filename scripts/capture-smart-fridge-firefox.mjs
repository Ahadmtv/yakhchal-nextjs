import { spawn } from "node:child_process";
import { access, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { createServer, createConnection } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";

const pageUrl = process.argv[2] || "http://localhost:4173/";
const outputDirectory = path.resolve(
  process.argv[3] || ".codex-qa/firefox-story",
);
const firefoxExecutable =
  process.env.FIREFOX_PATH ||
  (process.platform === "win32"
    ? "C:\\Program Files\\Mozilla Firefox\\firefox.exe"
    : "firefox");

const checkpoints = [
  { name: "00-initial-p006.png", progress: 0.06, stage: "0" },
  { name: "01-ingredients-p031.png", progress: 0.31, stage: "1" },
  { name: "02-recipe-p040.png", progress: 0.4, stage: "2" },
  { name: "03-plan-p062.png", progress: 0.62, stage: "3" },
  { name: "04-door-mid-p080.png", progress: 0.8, stage: "4" },
  { name: "05-door-near-p084.png", progress: 0.84, stage: "4" },
  { name: "06-final-p091.png", progress: 0.91, stage: "4" },
];

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getFreePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : null;
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
  if (!port) throw new Error("Could not allocate a Firefox debugging port.");
  return port;
}

async function waitForPort(port, timeout = 30_000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const connected = await new Promise((resolve) => {
      const connection = createConnection({ host: "127.0.0.1", port });
      connection.setTimeout(250);
      connection.once("connect", () => {
        connection.destroy();
        resolve(true);
      });
      connection.once("timeout", () => {
        connection.destroy();
        resolve(false);
      });
      connection.once("error", () => resolve(false));
    });
    if (connected) return;
    await wait(100);
  }
  throw new Error(`Firefox did not open remote debugging port ${port}.`);
}

function openWebSocket(url, timeout = 2_000) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    const timer = setTimeout(() => {
      socket.close();
      reject(new Error(`Timed out connecting to ${url}`));
    }, timeout);

    socket.addEventListener(
      "open",
      () => {
        clearTimeout(timer);
        resolve(socket);
      },
      { once: true },
    );
    socket.addEventListener(
      "error",
      () => {
        clearTimeout(timer);
        reject(new Error(`WebSocket connection failed for ${url}`));
      },
      { once: true },
    );
  });
}

async function connectToFirefox(port, launchOutput) {
  const advertisedUrls = launchOutput
    .join("\n")
    .match(/ws:\/\/[^\s]+/g);
  const candidates = [
    ...(advertisedUrls || []).flatMap((url) => [
      url.replace(/[.,]$/, ""),
      `${url.replace(/[.,/]$/, "")}/session`,
    ]),
    `ws://127.0.0.1:${port}/session`,
    `ws://localhost:${port}/session`,
    `ws://127.0.0.1:${port}`,
  ];

  const uniqueCandidates = [...new Set(candidates)];
  const errors = [];
  for (const candidate of uniqueCandidates) {
    try {
      return { socket: await openWebSocket(candidate), url: candidate };
    } catch (error) {
      errors.push(error.message);
    }
  }

  throw new Error(
    `Could not connect to Firefox WebDriver BiDi.\n${errors.join("\n")}`,
  );
}

function createBidiClient(socket) {
  let sequence = 0;
  const pending = new Map();
  const events = [];

  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(String(data));
    if (typeof message.id === "number") {
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id);
      if (message.type === "error" || message.error) {
        request.reject(
          new Error(
            `${request.method} — ${message.error || "WebDriver BiDi error"}: ${
              message.message || JSON.stringify(message)
            }`,
          ),
        );
      } else {
        request.resolve(message.result);
      }
      return;
    }
    events.push(message);
  });

  socket.addEventListener("close", () => {
    for (const request of pending.values()) {
      request.reject(new Error("Firefox closed the WebDriver BiDi socket."));
    }
    pending.clear();
  });

  function send(method, params = {}) {
    const id = ++sequence;
    socket.send(
      JSON.stringify({
        id,
        method,
        params,
      }),
    );
    return new Promise((resolve, reject) => {
      pending.set(id, { method, resolve, reject });
    });
  }

  return { events, send };
}

function remoteValue(result) {
  if (result?.type === "exception") {
    throw new Error(
      result.exceptionDetails?.text ||
        result.exceptionDetails?.exception?.value ||
        "Firefox script evaluation failed.",
    );
  }
  const value = result?.result;
  if (!value) {
    throw new Error(`Firefox returned no remote value: ${JSON.stringify(result)}`);
  }
  if (value.type !== "string") {
    throw new Error(
      `Expected a serialized string, received ${JSON.stringify(value)}`,
    );
  }
  return JSON.parse(value.value);
}

async function terminateProcessTree(child) {
  if (!child || child.exitCode !== null) return;
  child.kill();
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    wait(1_500),
  ]);
  if (child.exitCode !== null) return;

  if (process.platform === "win32") {
    await new Promise((resolve) => {
      const taskkill = spawn(
        "taskkill",
        ["/pid", String(child.pid), "/t", "/f"],
        {
          stdio: "ignore",
          windowsHide: true,
        },
      );
      taskkill.once("exit", resolve);
      taskkill.once("error", resolve);
    });
  } else {
    child.kill("SIGKILL");
  }
}

await mkdir(outputDirectory, { recursive: true });
await access(firefoxExecutable);
const profileDirectory = await mkdtemp(
  path.join(tmpdir(), "codex-smart-fridge-firefox-"),
);
const remoteDebuggingPort = await getFreePort();
const launchOutput = [];
let browser;
let socket;
let client;
let report;
let fatalError;

try {
  browser = spawn(
    firefoxExecutable,
    [
      "--headless",
      "--no-remote",
      "--new-instance",
      "--remote-debugging-port",
      String(remoteDebuggingPort),
      "--profile",
      profileDirectory,
      "--width",
      "1440",
      "--height",
      "900",
      "about:blank",
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    },
  );

  const collectLaunchOutput = (chunk) => {
    launchOutput.push(
      ...String(chunk)
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean),
    );
  };
  browser.stdout.on("data", collectLaunchOutput);
  browser.stderr.on("data", collectLaunchOutput);

  await waitForPort(remoteDebuggingPort);
  const connection = await connectToFirefox(
    remoteDebuggingPort,
    launchOutput,
  );
  socket = connection.socket;
  client = createBidiClient(socket);

  const session = await client.send("session.new", {
    capabilities: {
      alwaysMatch: {
        acceptInsecureCerts: true,
      },
    },
  });

  const tree = await client.send("browsingContext.getTree");
  let context = tree.contexts[0]?.context;
  if (!context) {
    const created = await client.send("browsingContext.create", {
      type: "tab",
    });
    context = created.context;
  }

  try {
    await client.send("session.subscribe", {
      events: ["log.entryAdded", "network.fetchError"],
      contexts: [context],
    });
  } catch {
    await client.send("session.subscribe", {
      events: ["log.entryAdded"],
      contexts: [context],
    });
  }

  await client.send("browsingContext.setViewport", {
    context,
    viewport: { width: 1440, height: 900 },
    devicePixelRatio: 1,
  });
  await client.send("browsingContext.navigate", {
    context,
    url: pageUrl,
    wait: "complete",
  });

  async function evaluateJson(expression) {
    const evaluated = await client.send("script.evaluate", {
      expression: `(async () => JSON.stringify(await (${expression})))()`,
      target: { context },
      awaitPromise: true,
      resultOwnership: "none",
      userActivation: true,
    });
    return remoteValue(evaluated);
  }

  async function waitForReady() {
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      ready = await evaluateJson(
        `document.readyState === "complete" && !!document.getElementById("workflow")`,
      );
      if (ready) break;
      await wait(100);
    }
    if (!ready) throw new Error("#workflow did not become ready in Firefox.");

    await evaluateJson(`(async () => {
      await Promise.race([
        Promise.all([
          document.fonts?.ready ?? Promise.resolve(),
          ...[...document.querySelectorAll("#workflow img")].map(
            (image) => image.decode?.().catch(() => undefined),
          ),
        ]),
        new Promise((resolve) => setTimeout(resolve, 4000)),
      ]);
      return true;
    })()`);
    await wait(450);
  }

  async function captureScreenshot(fileName) {
    const screenshot = await client.send(
      "browsingContext.captureScreenshot",
      {
        context,
        origin: "viewport",
        format: { type: "png" },
      },
    );
    const filePath = path.join(outputDirectory, fileName);
    await writeFile(filePath, Buffer.from(screenshot.data, "base64"));
    return filePath;
  }

  async function scrollStory(progress) {
    return evaluateJson(`(async () => {
      const section = document.getElementById("workflow");
      const headerOffset =
        innerWidth < 700 ? 68 : innerWidth < 900 ? 72 : 82;
      const sectionTop = scrollY + section.getBoundingClientRect().top;
      const distance = Math.max(
        1,
        section.offsetHeight - innerHeight + headerOffset,
      );
      scrollTo({
        top: sectionTop - headerOffset + distance * ${progress},
        behavior: "instant",
      });
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
      await new Promise((resolve) => setTimeout(resolve, 240));

      const hasCssModuleName = (node, name) =>
        [...node.classList].some(
          (token) =>
            token.endsWith("__" + name) ||
            token.includes("_" + name + "__"),
        );
      const nodes = [...section.querySelectorAll("*")];
      const doorFront = nodes.find((node) =>
        hasCssModuleName(node, "doorFront"),
      );
      const doorInner = nodes.find((node) =>
        hasCssModuleName(node, "doorInner"),
      );
      const door =
        nodes.find((node) => hasCssModuleName(node, "door")) ||
        doorFront?.parentElement ||
        null;
      const sectionStyles = getComputedStyle(section);
      const doorStyles = door ? getComputedStyle(door) : null;
      const doorRect = door?.getBoundingClientRect();
      const frontStyles = doorFront ? getComputedStyle(doorFront) : null;
      const innerStyles = doorInner ? getComputedStyle(doorInner) : null;

      return {
        requestedProgress: ${progress},
        computedProgress: Number(
          sectionStyles.getPropertyValue("--story-progress"),
        ),
        activeStage: section.dataset.activeStage,
        variables: {
          doorAngle: sectionStyles.getPropertyValue("--door-angle").trim(),
          doorFrontOpacity: Number(
            sectionStyles.getPropertyValue("--door-front-opacity"),
          ),
          doorInnerOpacity: Number(
            sectionStyles.getPropertyValue("--door-inner-opacity"),
          ),
          recipeOpacity: Number(
            sectionStyles.getPropertyValue("--recipe-opacity"),
          ),
          supportOpacity: Number(
            sectionStyles.getPropertyValue("--support-opacity"),
          ),
          finalOpacity: Number(
            sectionStyles.getPropertyValue("--final-opacity"),
          ),
        },
        door: {
          exists: Boolean(door),
          className: door?.className || null,
          rect: doorRect
            ? {
                x: Math.round(doorRect.x * 10) / 10,
                y: Math.round(doorRect.y * 10) / 10,
                width: Math.round(doorRect.width * 10) / 10,
                height: Math.round(doorRect.height * 10) / 10,
              }
            : null,
          layoutSize: door
            ? { width: door.offsetWidth, height: door.offsetHeight }
            : null,
          transform: doorStyles?.transform || null,
          transformOrigin: doorStyles?.transformOrigin || null,
          transformStyle: doorStyles?.transformStyle || null,
          display: doorStyles?.display || null,
          visibility: doorStyles?.visibility || null,
          opacity: doorStyles ? Number(doorStyles.opacity) : null,
          frontOpacity: frontStyles ? Number(frontStyles.opacity) : null,
          innerOpacity: innerStyles ? Number(innerStyles.opacity) : null,
        },
        viewport: { width: innerWidth, height: innerHeight },
        storyHeight: section.offsetHeight,
        imagesReady: [...section.querySelectorAll("img")].every(
          (image) =>
            image.complete &&
            image.naturalWidth > 0 &&
            image.naturalHeight > 0,
        ),
      };
    })()`);
  }

  await waitForReady();
  const environment = await evaluateJson(`(() => {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
    localStorage.setItem("yakhchal:theme", "light");
    return {
      userAgent: navigator.userAgent,
      viewport: { width: innerWidth, height: innerHeight },
      devicePixelRatio,
      location: location.href,
    };
  })()`);

  const states = [];
  for (const checkpoint of checkpoints) {
    const state = await scrollStory(checkpoint.progress);
    const filePath = await captureScreenshot(checkpoint.name);
    states.push({ ...checkpoint, ...state, filePath });
  }

  await scrollStory(0.91);
  const reverseState = await scrollStory(0.17);
  const reverseFilePath = await captureScreenshot("07-reverse-p017.png");

  const errorLogs = client.events
    .filter(
      (event) =>
        event.method === "log.entryAdded" &&
        event.params?.level === "error",
    )
    .map((event) => event.params);
  const fetchErrors = client.events
    .filter((event) => event.method === "network.fetchError")
    .map((event) => event.params);

  const validationChecks = [];
  const check = (name, passed, detail) => {
    validationChecks.push({ name, passed: Boolean(passed), detail });
  };

  for (const state of states) {
    check(
      `${state.progress}: expected active stage`,
      state.activeStage === state.stage,
      `expected ${state.stage}, received ${state.activeStage}`,
    );
    check(
      `${state.progress}: door is rendered`,
      state.door.exists &&
        state.door.layoutSize?.width > 100 &&
        state.door.layoutSize?.height > 200 &&
        state.door.rect?.height > 200,
      state.door,
    );
    check(
      `${state.progress}: door transform is finite`,
      Boolean(
        state.door.transform &&
          state.door.transform !== "none" &&
          !state.door.transform.includes("NaN"),
      ),
      state.door.transform,
    );
    check(
      `${state.progress}: ingredient images are decoded`,
      state.imagesReady,
      state.imagesReady,
    );
  }

  const recipeState = states.find((state) => state.progress === 0.4);
  const ingredientState = states.find((state) => state.progress === 0.31);
  const planState = states.find((state) => state.progress === 0.62);
  const doorMidState = states.find((state) => state.progress === 0.8);
  const doorNearState = states.find((state) => state.progress === 0.84);
  const finalState = states.find((state) => state.progress === 0.91);
  const angleAt = (state) => Number.parseFloat(state.variables.doorAngle);

  check(
    "no ghost recipe card at p=.31",
    ingredientState?.variables.recipeOpacity === 0,
    ingredientState?.variables.recipeOpacity,
  );
  check(
    "recipe card is fully opaque at p=.40",
    recipeState?.variables.recipeOpacity >= 0.99,
    recipeState?.variables.recipeOpacity,
  );
  check(
    "plan cards are fully opaque at p=.62",
    planState?.variables.supportOpacity >= 0.99,
    planState?.variables.supportOpacity,
  );
  check(
    "door reaches a visible midpoint at p=.80",
    angleAt(doorMidState) > -65 && angleAt(doorMidState) < -40,
    doorMidState?.variables.doorAngle,
  );
  check(
    "door continues smoothly at p=.84",
    angleAt(doorNearState) > -40 && angleAt(doorNearState) < -15,
    doorNearState?.variables.doorAngle,
  );
  check(
    "final card appears fully opaque at p=.84",
    doorNearState?.variables.finalOpacity === 1,
    doorNearState?.variables.finalOpacity,
  );
  check(
    "door is closed and final message is visible at p=.91",
    Math.abs(angleAt(finalState)) < 1 &&
      finalState?.variables.finalOpacity >= 0.99,
    {
      doorAngle: finalState?.variables.doorAngle,
      finalOpacity: finalState?.variables.finalOpacity,
    },
  );
  check(
    "door transform changes at both closing checkpoints",
    new Set([
      doorMidState?.door.transform,
      doorNearState?.door.transform,
      finalState?.door.transform,
    ]).size === 3,
    [
      doorMidState?.door.transform,
      doorNearState?.door.transform,
      finalState?.door.transform,
    ],
  );
  check(
    "reverse scroll reopens the door",
    Number.parseFloat(reverseState.variables.doorAngle) < -100 &&
      reverseState.activeStage === "1",
    {
      doorAngle: reverseState.variables.doorAngle,
      activeStage: reverseState.activeStage,
    },
  );
  check("no Firefox error-level console logs", errorLogs.length === 0, errorLogs);

  const failedChecks = validationChecks.filter((item) => !item.passed);
  report = {
    pageUrl,
    capturedAt: new Date().toISOString(),
    browser: {
      executable: firefoxExecutable,
      bidiUrl: connection.url,
      capabilities: session.capabilities,
      ...environment,
    },
    states,
    reverseScroll: {
      ...reverseState,
      filePath: reverseFilePath,
    },
    diagnostics: {
      errorLogs,
      fetchErrors,
      launchOutput,
    },
    validation: {
      passed: failedChecks.length === 0,
      checks: validationChecks,
      failures: failedChecks,
    },
  };

  await writeFile(
    path.join(outputDirectory, "firefox-visual-qa-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));

  if (failedChecks.length > 0) {
    throw new Error(
      `Firefox visual QA failed ${failedChecks.length} check(s).`,
    );
  }
} catch (error) {
  fatalError = error;
} finally {
  if (client) {
    try {
      await client.send("browser.close");
    } catch {
      // The Firefox process may close the BiDi socket before it responds.
    }
  }
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  await terminateProcessTree(browser);
  await rm(profileDirectory, {
    recursive: true,
    force: true,
    maxRetries: 6,
    retryDelay: 250,
  });
}

if (fatalError) throw fatalError;

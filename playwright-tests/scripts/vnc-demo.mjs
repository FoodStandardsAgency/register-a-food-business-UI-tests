import { chromium } from "@playwright/test";

const timeoutMs = Number.parseInt(process.env.VNC_DEMO_TIMEOUT_MS || "60000", 10);

const browser = await chromium.launch({
  headless: false,
  args: ["--start-maximized"],
});

const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto("https://example.com", { waitUntil: "load" });

// Give you time to see the window in noVNC.
console.log(`VNC demo running for ${timeoutMs}ms...`);
await page.waitForTimeout(timeoutMs);

await browser.close();

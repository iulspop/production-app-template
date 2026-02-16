import { defineConfig, devices } from "@playwright/test";

process.env.TZ = "UTC";

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: "html",
  retries: process.env.CI ? 2 : 1,
  testDir: "./playwright",
  testMatch: "*.e2e.ts",
  use: {
    baseURL:
      process.env.APP_URL ??
      (process.env.CI ? "http://localhost:3000" : "http://localhost:5173"),
    timezoneId: "UTC",
    trace: process.env.CI ? "on-first-retry" : "retain-on-failure",
  },
  webServer: {
    command: process.env.CI
      ? "pnpm run build && pnpm run start"
      : "pnpm run dev",
    env: { NODE_ENV: "test", TZ: "UTC" },
    port: process.env.CI ? 3000 : 5173,
    reuseExistingServer: !process.env.CI,
  },
  workers: 1,
});

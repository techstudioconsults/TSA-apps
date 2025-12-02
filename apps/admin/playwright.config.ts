import { defineConfig } from "@playwright/test";

export default defineConfig({
  // Only run E2E specs; avoid picking up unit tests that use Vitest
  testDir: "./e2e",
  testMatch: ["**/*.spec.ts"],
  // Generate HTML report that can be opened with `playwright show-report`
  reporter: [["html", { open: "never" }]],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env["CI"],
    timeout: 120_000,
  },
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
});

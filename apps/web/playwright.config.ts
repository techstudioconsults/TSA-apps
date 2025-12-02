// import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   // Only run E2E specs, avoid picking up unit tests that use Vitest
//   testDir: './e2e',
//   // Restrict to E2E spec files
//   testMatch: ['**/*.spec.ts'],
//   // Generate HTML report that can be opened with `playwright show-report`
//   reporter: [['html', { open: 'never' }]],
//   webServer: {
//     command: 'pnpm dev',
//     url: 'http://localhost:3000',
//     reuseExistingServer: !process.env['CI'],
//     timeout: 120_000,
//   },
//   use: {
//     baseURL: 'http://localhost:3000',
//     trace: 'on-first-retry',
//   },
// });

import { defineConfig } from "@playwright/test";
import baseConfig from "../../playwright.config.base";

export default defineConfig({
  ...baseConfig,
  testDir: "./__tests__",
  testMatch: ["**/*.spec.ts"],
  use: {
    ...baseConfig.use,
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
  },
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // Exclude Playwright E2E specs from Vitest
    exclude: ["e2e/**", "node_modules/**", ".next/**"],
  },
  // Ensure JSX uses the automatic runtime in Vitest (no need for React import)
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
});

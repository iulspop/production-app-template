import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineVitestConfig } from "vitest/config";

const isTestOrStorybook = process.env.VITEST || process.env.STORYBOOK;

const rootConfig = defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    tailwindcss(),
    !isTestOrStorybook && reactRouter(),
    tsconfigPaths(),
  ],
});

const testConfig = defineVitestConfig({
  test: {
    projects: [
      {
        ...rootConfig,
        test: {
          env: { TZ: "UTC" },
          include: ["app/**/*.test.ts"],
          name: "unit-tests",
        },
      },
      {
        ...rootConfig,
        test: {
          env: { TZ: "UTC" },
          include: ["app/**/*.spec.ts"],
          name: "integration-tests",
        },
      },
      {
        ...rootConfig,
        test: {
          env: { TZ: "UTC" },
          environment: "happy-dom",
          include: ["app/**/*.test.tsx"],
          name: "react-happy-dom-tests",
          setupFiles: ["app/test/setup-browser-test-environment.ts"],
        },
      },
    ],
  },
});

export default defineConfig({ ...rootConfig, ...testConfig });

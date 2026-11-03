import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test-setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@fw": path.resolve(__dirname, "./src"),
      "@demo": path.resolve(__dirname, "./demo"),
    },
  },
});

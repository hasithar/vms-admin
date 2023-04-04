import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths(), eslint()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.js",
    css: true,
    mockReset: true,
  },
});

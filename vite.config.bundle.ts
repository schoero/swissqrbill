import { config, defineConfig } from "@schoero/vite-config";


/** @type {import('vitest/config').UserConfig} */
export default defineConfig({
  ...config,
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/bundle/swissqrbill.ts",
      formats: ["es"]
    },
    minify: false,
    outDir: "lib/bundle",
    target: "es6"
  },
  plugins: [
    ...config.plugins ?? []
  ]
});

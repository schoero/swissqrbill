import { config, defineConfig } from "@schoero/vite-config";


/** @type {import('vitest/config').UserConfig} */
export default defineConfig({
  ...config,
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/svg/swissqrbill.ts",
      fileName: "bundle",
      formats: ["es"]
    },
    minify: true,
    outDir: "lib",
    target: "es6"
  },
  plugins: [
    ...config.plugins ?? []
  ]
});

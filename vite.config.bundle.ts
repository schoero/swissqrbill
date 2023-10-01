import { config, defineConfig } from "@schoero/vite-config";


/** @type {import('vitest/config').UserConfig} */
export default defineConfig({
  ...config,
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/bundle/swissqrbill.ts",
      formats: ["umd"],
      name: "SwissQRBill"
    },
    minify: false,
    outDir: "lib/bundle",
    target: "es6"
  },
  plugins: [
    ...config.plugins ?? []
  ]
});

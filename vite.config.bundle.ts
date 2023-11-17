import { config, defineConfig } from "@schoero/vite-config";

import type { UserConfig } from "vite";


export default defineConfig(<UserConfig>{
  ...config,
  build: {
    emptyOutDir: true,
    lib: {
      entry: "src/bundle/index.ts",
      fileName: () => "swissqrbill.js",
      formats: ["umd"],
      name: "SwissQRBill"
    },
    minify: true,
    outDir: "lib/bundle",
    target: "es6"
  },
  plugins: [
    ...config.plugins ?? []
  ]
});

import { sync } from "glob";
import dts from "vite-plugin-dts";
import noBundlePlugin from "vite-plugin-no-bundle";

import { config, defineConfig } from "@schoero/vite-config";


/** @type {import('vitest/config').UserConfig} */
export default defineConfig({
  ...config,
  build: {
    emptyOutDir: false,
    lib: {
      entry: sync("src/**/*.ts", { ignore: ["src/**/*.test.ts", "test/**", "src/bundle/*"] }),
      formats: ["es", "cjs"]
    },
    minify: false,
    outDir: "lib",
    ssr: true,
    target: "es6"
  },
  plugins: [
    ...config.plugins ?? [],
    noBundlePlugin(),
    dts({
      entryRoot: "./src",
      exclude: ["src/**/*.test.ts", "test/**", "src/bundle/*"],
      pathsToAliases: true
    })
  ]
});

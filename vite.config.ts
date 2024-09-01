import { config, defineConfig } from "@schoero/configs/vite";
import { sync } from "glob";
import dts from "vite-plugin-dts";
import noBundlePlugin from "vite-plugin-no-bundle";

import type { UserConfig } from "vite";


export default defineConfig(<UserConfig>{
  ...config,
  build: {
    emptyOutDir: true,
    lib: {
      entry: sync("src/**/*.ts", { ignore: ["src/**/*.test.ts", "test/**", "src/bundle/*"] }),
      formats: ["es"]
    },
    minify: false,
    outDir: "lib/esm",
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

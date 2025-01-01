import { writeFileSync } from "node:fs";


writeFileSync("lib/cjs/package.json", JSON.stringify({ type: "commonjs" }, null, 2));

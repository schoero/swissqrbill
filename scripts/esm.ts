import { writeFileSync } from "node:fs";


writeFileSync("lib/esm/package.json", JSON.stringify({ type: "module" }, null, 2));

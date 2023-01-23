import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve as resolvePath } from "node:path";

import { SVG } from "swissqrbill:node:svg.js";

import type { Data, SVGOptions } from "swissqrbill:shared:types.js";


const VISUAL = process.env.VISUAL === "true";

export async function svg(data: Data, path: string, options?: SVGOptions) {
  const svg = new SVG(data, options).toString();
  if(VISUAL === true){
    await mkdir(dirname(resolvePath(path)), { recursive: true });
    await writeFile(path, svg);
  }
  return svg;
}

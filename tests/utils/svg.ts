import { writeFile } from "node:fs/promises";

import { SVG } from "swissqrbill:node:svg.js";
import { Data, SVGOptions } from "swissqrbill:shared:types.js";


const VISUAL = process.env.VISUAL === "true";

export async function svg(data: Data, path: string, options?: SVGOptions) {
  const svg = new SVG(data, options).toString();
  if(VISUAL === true){
    await writeFile(path, svg);
  }
  return svg;
}

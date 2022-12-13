import { writeFile } from "fs/promises";

import { SVG } from "swissqrbill:node:svg.js";
import { Data } from "swissqrbill:shared:types.js";


export async function svg(data: Data, path?: string) {
  const svg = new SVG(data).toString();
  if(path !== undefined){
    await writeFile(path, svg);
  }
  return svg;
}

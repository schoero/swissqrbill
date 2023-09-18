import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { SwissQRBill } from "swissqrbill:svg:swissqrbill.js";

import type { Data, SVGOptions } from "swissqrbill:shared:types.js";


export type TestDocumentName = `${string}/${string}.svg`;


const VISUAL_DIR = "tests/output/svg/";
const VISUAL = process.env.VISUAL === "true";

export async function svg(data: Data, testDocumentName: TestDocumentName, options?: SVGOptions) {
  const svg = new SwissQRBill(data, options).toString();

  if(VISUAL === true){
    const path = join(VISUAL_DIR, testDocumentName);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(join(VISUAL_DIR, testDocumentName), svg);
  }

  return svg;
}

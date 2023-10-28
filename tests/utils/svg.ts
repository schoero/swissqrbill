import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import SVG from "svg-engine";

import { SwissQRBill } from "swissqrbill:svg:index";

import type { Data, SVGOptions } from "swissqrbill:types";


export type TestDocumentName = `${string}/${string}.svg`;


const VISUAL_DIR = "tests/output/svg/";
const VISUAL = process.env.VISUAL === "true";

export class TestDocument extends SVG {

  private testDocumentName: TestDocumentName;

  constructor(testDocumentName: TestDocumentName) {
    super();
    this.testDocumentName = testDocumentName;
  }

  public get snapshots(): string[] {

    if(VISUAL === true){
      const path = join(VISUAL_DIR, this.testDocumentName);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(join(VISUAL_DIR, this.testDocumentName), this.outerHTML);
    }

    return [this.outerHTML];

  }

}


export async function svg(data: Data, testDocumentName: TestDocumentName, options?: SVGOptions) {
  const svg = new SwissQRBill(data, options).toString();

  if(VISUAL === true){
    const path = join(VISUAL_DIR, testDocumentName);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(join(VISUAL_DIR, testDocumentName), svg);
  }

  return svg;
}

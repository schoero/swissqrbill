import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { buffer } from "node:stream/consumers";

import PDFDocument from "pdfkit";

import { SwissQRBill } from "swissqrbill:pdf:swissqrbill";

import type { Data, PDFOptions } from "swissqrbill:types";


export type TestDocumentName = `${string}/${string}.pdf`;

const VISUAL_DIR = "tests/output/pdf/";
const VISUAL = process.env.VISUAL === "true";

const ID_REGEX = /2f494420(.*)3e5d0a/i; // /ID [<(.*)>]/i;


export class TestDocument extends PDFDocument {

  constructor(private testDocumentName: TestDocumentName, options?: PDFKit.PDFDocumentOptions) {
    super(options);
    this.info.CreationDate = undefined;
  }

  public override end() {
    super.end();
  }

  public snapshot = new Promise<string>(async resolve => {
    const chunks = await buffer(this);

    const snapshot = chunks
      .toString("hex")
      .replace(ID_REGEX, "");

    if(VISUAL === true){
      const path = join(VISUAL_DIR, this.testDocumentName);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(join(VISUAL_DIR, this.testDocumentName), chunks);
    }

    resolve(snapshot);
  });

}

export async function pdf(data: Data, testDocumentName: TestDocumentName, options?: PDFOptions) {
  const pdf = new TestDocument(testDocumentName, options);
  const qrBill = new SwissQRBill(data, options);
  qrBill.attachTo(pdf);
  pdf.end();
  return pdf.snapshot;
}

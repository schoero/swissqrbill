import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { buffer } from "node:stream/consumers";

import PDFParser from "pdf2json";
import PDFDocument from "pdfkit";

import { SwissQRBill } from "swissqrbill:pdf/swissqrbill.js";

import type { Data, PDFOptions } from "swissqrbill:shared:types.js";


export type TestDocumentName = `${string}/${string}.pdf`;

const VISUAL_DIR = "tests/output/pdf/";
const VISUAL = process.env.VISUAL === "true";


export class TestDocument extends PDFDocument {

  constructor(private testDocumentName: TestDocumentName, options?: PDFKit.PDFDocumentOptions) {
    super(options);
    this.info.CreationDate = undefined;
  }

  public override end() {
    super.end();
  }

  public snapshots = new Promise<string[]>(async resolve => {
    const chunks = await buffer(this);
    const snapshots = await pdfBufferToJson(chunks);

    if(VISUAL === true){
      const path = join(VISUAL_DIR, this.testDocumentName);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(join(VISUAL_DIR, this.testDocumentName), chunks);
    }

    if(typeof snapshots === "object" &&
      snapshots !== null &&
      "Pages" in snapshots &&
      Array.isArray(snapshots.Pages)
    ){
      resolve(snapshots.Pages.map(page => JSON.stringify(page)));
    }
  });

}

export async function pdf(data: Data, testDocumentName: TestDocumentName, options?: PDFOptions) {
  const pdf = new TestDocument(testDocumentName, options);
  const qrBill = new SwissQRBill(data, options);
  qrBill.attachTo(pdf);
  pdf.end();
  return pdf.snapshots;
}


export async function pdfBufferToJson(buffer: Buffer) {
  const parser = new PDFParser();
  parser.parseBuffer(buffer);
  return new Promise((resolve, reject) => {
    parser.on("pdfParser_dataError", reject);
    parser.on("pdfParser_dataReady", resolve);
  });
}

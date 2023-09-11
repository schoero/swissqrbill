import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve as resolvePath } from "node:path";
import { buffer } from "node:stream/consumers";

import PDFParser from "pdf2json";
import PDFDocument from "pdfkit";

import { PDF } from "swissqrbill:node:pdf.js";

import { WritableMemory } from "./writable-memory.js";

import type { Data, PDFOptions } from "swissqrbill:shared:types.js";


const VISUAL_DIR = "tests/output/pdf/";
const VISUAL = process.env.VISUAL === "true";


type TestDocumentName = `${string}/${string}.pdf`;

export function createPDF(data: Data, path: string, options?: PDFOptions): { pdf: PDF; snapshots: Promise<string[]>; } {

  const stream = new WritableMemory();
  const pdf = new PDF(data, stream, { ...options });

  const snapshots = new Promise<string[]>(resolve => {

    pdf.on("finish", async () => {

      const buffer = stream.read();
      const snapshots = await pdfBufferToJson(buffer);

      if(VISUAL === true){
        await mkdir(dirname(resolvePath(VISUAL_DIR)), { recursive: true });
        await writeFile(join(VISUAL_DIR, path), buffer);
      }

      if(typeof snapshots === "object" &&
        snapshots !== null &&
        "Pages" in snapshots &&
        Array.isArray(snapshots.Pages)
      ){
        resolve(snapshots.Pages.map(page => JSON.stringify(page)));
      }

    });

  });

  return {
    pdf,
    snapshots
  };

}


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

export async function pdf(data: Data, path: string, options?: PDFOptions) {
  const { snapshots } = createPDF(data, path, options);
  return snapshots;
}


export async function pdfBufferToJson(buffer: Buffer) {
  const parser = new PDFParser();
  parser.parseBuffer(buffer);
  return new Promise((resolve, reject) => {
    parser.on("pdfParser_dataError", reject);
    parser.on("pdfParser_dataReady", resolve);
  });
}

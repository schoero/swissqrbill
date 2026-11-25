import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { buffer } from "node:stream/consumers";

import PDFDocument from "pdfkit";
import { vi } from "vitest";

import { SwissQRBill } from "swissqrbill:pdf";
import { splitBuffer } from "swissqrbill:tests:utils/buffer.js";

import type { Data, PDFOptions } from "swissqrbill:types";


export type TestDocumentName = `${string}/${string}.pdf`;

const VISUAL_DIR = "tests/output/pdf/";
const VISUAL = process.env.VISUAL === "true";


export class TestDocument extends PDFDocument {

  public snapshots: string[] = [];
  private testDocumentName: TestDocumentName;

  constructor(testDocumentName: TestDocumentName, options?: PDFKit.PDFDocumentOptions) {
    super({ ...options, bufferPages: true, compress: false, size: "A4" });
    this.testDocumentName = testDocumentName;
    this.info.CreationDate = new Date(0);
  }

  public async writeFile() {

    if(this.snapshots.length > 0){
      throw new Error("TestDocument.end() was called multiple times");
    }

    const bufferedPageRange = this.bufferedPageRange();

    for(let pageIndex = bufferedPageRange.start; pageIndex < bufferedPageRange.count; pageIndex++){

      this.switchToPage(pageIndex);

      // @ts-expect-error - Typings are invalid
      const page = await buffer(this.page.content.buffer);
      const lines = splitBuffer(page, Buffer.from("\n", "binary"));
      const content = lines.map(
        line => line.toString("utf-8")
      ).join("\n");

      this.snapshots.push(content);

    }

    if(VISUAL === true){

      super.end();

      const pdf = await buffer(this);

      const path = join(VISUAL_DIR, this.testDocumentName);
      const dir = dirname(path);

      await mkdir(dir, { recursive: true });
      await writeFile(path, pdf);

    }

  }

}

export async function pdf(data: Data, testDocumentName: TestDocumentName, options?: PDFOptions) {
  const pdf = new TestDocument(testDocumentName);
  const qrBill = new SwissQRBill(data, options);
  qrBill.attachTo(pdf);
  await pdf.writeFile();
  return pdf.snapshots;
}

export function trackTextsByPage(pdf: PDFKit.PDFDocument) {
  const textCalls: { page: PDFKit.PDFPage; text: string; }[] = [];
  const text = pdf.text.bind(pdf);
  vi.spyOn(pdf, "text").mockImplementation((...args: Parameters<typeof pdf.text>) => {
    textCalls.push({ page: pdf.page, text: args[0] });
    return text(...args);
  });

  return () => {
    const { count, start } = pdf.bufferedPageRange();
    const pages = Array.from({ length: count }, (_, index) => {
      pdf.switchToPage(start + index);
      return pdf.page;
    });
    return pages.map(page => textCalls.filter(call => call.page === page).map(call => call.text));
  };
}

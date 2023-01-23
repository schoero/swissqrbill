import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve as resolvePath } from "node:path";

import PDFParser from "pdf2json";

import { PDF } from "swissqrbill:node:pdf.js";

import { WritableMemory } from "./writable-memory.js";

import type { Data, PDFOptions } from "swissqrbill:shared:types.js";


const VISUAL = process.env.VISUAL === "true";

export function createPDF(data: Data, path: string, options?: PDFOptions): { pdf: PDF; snapshots: Promise<string[]>; } {

  const stream = new WritableMemory();
  const pdf = new PDF(data, stream, { ...options });

  const snapshots = new Promise<string[]>(resolve => {

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    pdf.on("finish", async () => {

      const buffer = stream.read();
      const snapshots = await pdfBufferToJson(buffer);

      if(VISUAL === true){
        await mkdir(dirname(resolvePath(path)), { recursive: true });
        await writeFile(path, buffer);
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


export async function pdf(data: Data, path: string, options?: PDFOptions) {
  const { snapshots } = createPDF(data, path, options);
  return snapshots;
}


async function pdfBufferToJson(buffer: Buffer) {
  const parser = new PDFParser();
  parser.parseBuffer(buffer);
  return new Promise((resolve, reject) => {
    parser.on("pdfParser_dataError", reject);
    parser.on("pdfParser_dataReady", resolve);
  });
}

import { writeFile } from "node:fs/promises";

import { pdfToPng } from "pdf-to-png-converter";

import { PDF } from "swissqrbill:node:pdf.js";
import { Data, PDFOptions } from "swissqrbill:shared:types.js";

import { WritableMemory } from "./writable-memory.js";


const VISUAL = process.env.VISUAL === "true";

export async function pdf(data: Data, path: string, options?: PDFOptions) {
  const pdfBuffer = await _createPDF(data, path, options);
  const images = await pdfToPng(pdfBuffer, {
    disableFontFace: false,
    useSystemFonts: true,
    viewportScale: 0.2
  });
  return images.map(page => page.content.toString("base64"));
}


async function _createPDF(data: Data, path: string, options?: PDFOptions): Promise<Buffer> {
  const stream = new WritableMemory();
  return new Promise((resolve, reject) => {
    new PDF(data, stream, { ...options }, async () => {
      const buffer = stream.read();
      if(VISUAL === true){
        await writeFile(path, buffer);
      }
      resolve(buffer);
    });
  });
}

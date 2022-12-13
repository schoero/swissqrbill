import { writeFileSync } from "fs";

import { pdfToPng } from "pdf-to-png-converter";

import { PDF } from "swissqrbill:node:pdf.js";
import { Data } from "swissqrbill:shared:types.js";

import { WritableMemory } from "./writable-memory.js";


export async function pdf(data: Data, path?: string) {
  const pdfBuffer = await _createPDF(data, path);
  const images = await pdfToPng(pdfBuffer, {
    disableFontFace: false,
    useSystemFonts: true,
    viewportScale: 0.1
  });
  return images.map(page => page.content.toString("base64"));
}


async function _createPDF(data: Data, path?: string): Promise<Buffer> {
  const stream = new WritableMemory();
  return new Promise((resolve, reject) => {
    new PDF(data, stream, () => {
      const buffer = stream.read();
      if(path !== undefined){
        writeFileSync(path, buffer);
      }
      resolve(buffer);
    });
  });
}
